function getDefaultValueOfParameters(parameters) {
    const result = {}
    Object.keys(parameters).forEach((key) => {
        result[key] = parameters[key].default
    })
    return result
}

const PARAMETER_TYPE = {
    CATEGORICAL: "CATEGORICAL",
    INT: "INT",
    DOUBLE: "DOUBLE",
    BOOL: "BOOL",
}

const ATTRIBUTE_TYPE = {
    DOUBLE: {
        length: 8,
        heap: "HEAPF64"
    },
    FLOAT: {
        length: 4,
        heap: "HEAPF32"
    },
    INT: {
        length: 4,
        heap: "HEAP32"
    },
    UINT: {
        length: 4,
        heap: "HEAPU32"
    }
}
/**
 * 
 * @returns you should choose a initialize function in `initByLayoutName(name)` or `initByLayoutDefinition(definition)` first
 */
function createLayout() {
    let initByName = false
    const STATIC_PARAMETER = { USE_FUNCTION: "", ORIGIN_PARAMETERS: {}, OUR_PARAMETERS: {}, M: 0, N: 0 }
    const _ATTRIBUTE_ARRAYS = [] // ordered
    const _PARAMETER_SEQUENCE = [] // ordered
    const _private = {
        _prepare: function () {
            if (!initByName) {
                autoHelper.setLinkAttributeArray("source", link => {
                    const id2index = {}
                    for (let i = 0; i < N; ++i) {
                        if (graph.nodes[i]['id'] in id2index) {
                            throw Error('Duplicated Node ID')
                        } else id2index[graph.nodes[i]['id']] = i
                    }
                    return id2index[link.source]
                })
                autoHelper.setLinkAttributeArray("target", link => {
                    const id2index = {}
                    for (let i = 0; i < N; ++i) {
                        if (graph.nodes[i]['id'] in id2index) {
                            throw Error('Duplicated Node ID')
                        } else id2index[graph.nodes[i]['id']] = i
                    }
                    return id2index[link.target]
                })
                const lines = [
                    'function(graph){',
                    `                    let ATTRIBUTR_ARRAYS = ${JSON.stringify(_ATTRIBUTE_ARRAYS)}`
                ]
                for (let index in _ATTRIBUTE_ARRAYS) {
                    if (!_ATTRIBUTE_ARRAYS[index].setValue)// some attribute array has not been setted yet
                        throw Error(`AttributeNotSettedError: Attribute ${_ATTRIBUTE_ARRAYS[index].name} of layout ${STATIC_PARAMETER.USE_FUNCTION} has not been setted yet.`)
                    lines.push(`                    ATTRIBUTR_ARRAYS[${index}].value = (${_ATTRIBUTE_ARRAYS[index].setValue})(_graph)`)
                }
                lines.push(
                    '                       return ATTRIBUTR_ARRAYS',
                    '                   }')
                return lines.join('\r\n')
            }
            else {
                return _ATTRIBUTE_ARRAYS[0]
            }
        },
        _malloc: function () {
            return `
                                    function(arrays){
                                        let mallocs = []
                                        for (let name in arrays) {
                                            const array = arrays[name]
                                            const location = Module._malloc(array.type.length * array.value.length)
                                            for (let i = 0; i < array.value.length; ++i) {
                                                Module[array.type.heap][location / array.type.length + i] = array.value[i]
                                            }
                                            mallocs.push(location)
                                        }
                                        return mallocs
                                    }
            `
        },
        _free: function () {
            return `
                                    function(arrays, buffers) {
                                        for (let array of arrays) {
                                            Module._free(array)
                                        }
                                        for (let buffer of buffers) {
                                            Module._free_buf(buffer)
                                        }
                                    }`
        }
    }
    const helper = {
        setOriginParameters(params = {}) {
            if (!initByName) {
                _PARAMETER_SEQUENCE.map((paramName) => {
                    if (params[paramName]) {
                        STATIC_PARAMETER.ORIGIN_PARAMETERS[paramName] = params[paramName]
                    }
                    else throw Error(`Origin parameter ${paramName} of layout ${STATIC_PARAMETER.USE_FUNCTION} is not defined.`)
                })
            }
            STATIC_PARAMETER.ORIGIN_PARAMETERS = params
            return helper
        },
        setOurParameters(params = {}) {
            STATIC_PARAMETER.OUR_PARAMETERS = params
            return helper
        },
        export() {
            const PARAMETERS = {
                ...STATIC_PARAMETER.OUR_PARAMETERS,
                ...STATIC_PARAMETER.ORIGIN_PARAMETERS,
            }
            const DEFAULTS = getDefaultValueOfParameters(PARAMETERS)
            return `
            const initOGDF = require('../entry/rawogdf')
            const { PARAMETER_TYPE } = require('../utils/parameters')
            const OUR_PARAMETERS = ${JSON.stringify(STATIC_PARAMETER.OUR_PARAMETERS)}
            const ORIGIN_PARAMETERS = ${JSON.stringify(STATIC_PARAMETER.ORIGIN_PARAMETERS)}
            const PARAMETERS = {
                ...OUR_PARAMETERS,
                ...ORIGIN_PARAMETERS,
            }
            function ${STATIC_PARAMETER.USE_FUNCTION.toLowerCase()}(graph, params, callback) {
                const ORIGIN_PARAMETER_SEQUENCE = ${JSON.stringify(_PARAMETER_SEQUENCE)}
                let Module
                const parameters = {
                    ...${JSON.stringify(DEFAULTS)},
                    ...params
                }
                const originalParameters = ORIGIN_PARAMETER_SEQUENCE.map((paramName) => {
                    if (PARAMETERS[paramName].type === PARAMETER_TYPE.CATEGORICAL) {
                        return PARAMETERS[paramName].range.indexOf(parameters[paramName])
                    } else {
                        return parameters[paramName]
                    }
                })
                const _graph = JSON.parse(JSON.stringify(graph))
                const N = _graph.nodes.length
                const M = _graph.links.length
                const indexArrays = (${_private._prepare()})(_graph)
                if (parameters.useWorker) {
                    const workerFunc = function () {
                        addEventListener('message', (e) => {
                            let { initOGDF, N, M, indexArrays, originalParameters } = JSON.parse(e.data)
                            let evalstr = "initOGDF = " + initOGDF
                            eval(evalstr)
                            initOGDF().then(function (md) {
                                Module = md
                                const arrays = (${_private._malloc()})(indexArrays)
                                const result = Module._${STATIC_PARAMETER.USE_FUNCTION.toUpperCase()}(
                                    N,
                                    M,
                                    ...arrays,
                                    ...originalParameters
                                )
                                const nodes = []
                                for (let i = 0; i < N; ++i) {
                                    nodes[i] = {}
                                    nodes[i]['x'] = Module.HEAPF32[(result >> 2) + i * 2]
                                    nodes[i]['y'] = Module.HEAPF32[(result >> 2) + i * 2 + 1]
                                }
                                postMessage(JSON.stringify(nodes))
                                ;(${_private._free()})(arrays, [result])
                            })
                        })
                    }
                    const blob = new Blob(["(" + workerFunc.toString() + ")()"])
                    const url = window.URL.createObjectURL(blob)
                    const worker = new Worker(url)
                    worker.postMessage(
                        JSON.stringify({
                            initOGDF: initOGDF.toString(), // ! Maybe we can put initOGDF out of web worker
                            N,
                            M,
                            indexArrays,
                            originalParameters
                        })
                    )
                    worker.onmessage = function (e) {
                        const nodePositions = JSON.parse(e.data)
                        for (let i = 0; i < N; ++i) {
                            _graph.nodes[i].x = nodePositions[i].x
                            _graph.nodes[i].y = nodePositions[i].y
                        }
                        worker.terminate()
                        callback(_graph)
                    }
                } else {
                    initOGDF().then(function (md) {
                        Module = md
                        const arrays = (${_private._malloc()})(indexArrays)
                        const result = Module._${STATIC_PARAMETER.USE_FUNCTION.toUpperCase()}(
                            N,
                            M,
                            ...arrays,
                            ...originalParameters
                        )
                        for (let i = 0; i < N; ++i) {
                            _graph.nodes[i]['x'] = Module.HEAPF32[(result >> 2) + i * 2]
                            _graph.nodes[i]['y'] = Module.HEAPF32[(result >> 2) + i * 2 + 1]
                        }
                        callback(_graph)
                        ;(${_private._free()})(arrays, [result])
                    })
                }
            }
            ${STATIC_PARAMETER.USE_FUNCTION.toLowerCase()}.parameters = ${JSON.stringify(PARAMETERS)}
            module.exports = ${STATIC_PARAMETER.USE_FUNCTION.toLowerCase()}
            `
        }
    }
    const manualHelper = {
        /**
         * Prepare your graph attribute arrays before using if in need
         */
        setAttributeArrays(mappers = (graph) => { return [] }) {
            _ATTRIBUTE_ARRAYS.push(mappers.toString())
            return manualHelper
        },
        ...helper
    }
    const autoHelper = {
        setNodeAttributeArray(name, forEachNode = (node) => { return node }) {
            let index = _ATTRIBUTE_ARRAYS.findIndex(value => value.name === name)
            if (index < 0) throw Error(`NodeAttributeSettingError: Node Attribute ${name} has not been defined in C definition, please check  C_DEFINITION.`)
            _ATTRIBUTE_ARRAYS[index].setValue = `
                    (graph) => {
                        const nodeAttributeArray = []
                        for (let i = 0; i < N; ++i) {
                            nodeAttributeArray.push((${forEachNode})(graph.nodes[i]))
                        }
                        return nodeAttributeArray
                    }`
            return autoHelper
        },
        setLinkAttributeArray(name, forEachLink = (link) => { return link }) {
            let index = _ATTRIBUTE_ARRAYS.findIndex(value => value.name === name)
            if (index < 0) throw Error(`LinkAttributeSettingError: Link Attribute ${name} has not been defined in C definition, please check  C_DEFINITION.`)
            _ATTRIBUTE_ARRAYS[index].setValue = `
                    (graph) => {
                        const linkAttributeArray = []
                        for (let i = 0; i < M; ++i) {
                            linkAttributeArray.push((${forEachLink})(graph.links[i]))
                        }
                        return linkAttributeArray
                    }`
            return autoHelper
        },
        setNodeAttributeArrays(forEachNodeFunctionArray) {
            if (!forEachNodeFunctionArray) return autoHelper
            for (let index in forEachNodeFunctionArray) {
                let eachNode = forEachNodeFunctionArray[index]
                autoHelper.setNodeAttributeArray(eachNode.name, eachNode.mapper)
            }
            return autoHelper
        },
        setLinkAttributeArrays(forEachLinkFunctionArray) {
            if (!forEachLinkFunctionArray) return autoHelper
            forEachLinkFunctionArray = forEachLinkFunctionArray
            for (let index in forEachLinkFunctionArray) {
                let eachLink = forEachLinkFunctionArray[index]
                autoHelper.setLinkAttributeArray(eachLink.name, eachLink.mapper)
            }
            return autoHelper
        },
        ...helper
    }
    return {
        /**
         * if you choose init by name, please make sure your parameters are all in order
         * @param {*} name 
         * @returns manualHelper
         */
        initByLayoutName(name) {
            initByName = true
            STATIC_PARAMETER.USE_FUNCTION = name.toUpperCase()
            return manualHelper
        },
        /**
         * if you choose init by definition, your parameters is allowed to be unordered
         * example: PMDS(int node_num, int link_num, int* source, int* target, double* edgesWeight, double edgeCosts , int numberOfPivots , bool useEdgeCostsAttribute)
         * @param {string} definition 
         */
        initByLayoutDefinition(definition) {
            initByName = false
            STATIC_PARAMETER.USE_FUNCTION = definition.substring(0, definition.indexOf("("))
            const parameterDefinitions = definition.substring(definition.indexOf("(") + 1, definition.indexOf(")")).split(/\,\s?/)
            const parameterSequence = []
            parameterDefinitions.forEach((value) => {
                let parts = value.split(/\s/)
                let type = parts[0]
                let name = parts[1]
                let starPos = type.indexOf("*")
                if (starPos > 0) {
                    type = ATTRIBUTE_TYPE[type.substring(0, starPos).toUpperCase()]
                    _ATTRIBUTE_ARRAYS.push({ name, type, value: [] })
                }
                else parameterSequence.push(name)
            })
            _PARAMETER_SEQUENCE.push(...parameterSequence.slice(2))
            return autoHelper
        },
    }
}

module.exports = function (source) {
    let layout, result
    eval(source)
    if (layout.C_DEFINITION)
        result = createLayout()
            .initByLayoutDefinition(layout.C_DEFINITION)
            .setNodeAttributeArrays(layout.NODE_ATTRIBUTES)
            .setLinkAttributeArrays(layout.LINK_ATTRIBUTES)
            .setOriginParameters(layout.ORIGIN_PARAMETERS)
            .setOurParameters(layout.OUR_PARAMETERS)
            .export()
    else if (layout.LAYOUT_NAME)
        result = createLayout()
            .initByLayoutName(layout.LAYOUT_NAME)
            .setAttributeArrays(layout.ATTRIBUTE_ARRAYS)
            .setOriginParameters(layout.ORIGIN_PARAMETERS)
            .setOurParameters(layout.OUR_PARAMETERS)
            .export()
    else throw Error(`LayoutNotDefinedError: variable 'layout' in ${this.resourcePath} has not been defined correctly.
    There are two alternative definitions, for example(Recommended):
    layout = {
        [Required]C_DEFINITION: "PMDS(int node_num, int link_num, int* source, int* target, ...)",
        [Optional]NODE_ATTRIBUTES: [
            {name: "nodesX", mapper: node => node.x}, 
            {name: "nodesY", mapper: node => node.y},
            ...
        ],
        [Optional]Link_ATTRIBUTES: [
            {name: "source", mapper: link => link.source},
            {name: "target", mapper: link => link.target},
            ...
        ],
        [Optional]ORIGIN_PARAMETERS: {
            edgeCosts: {
                type: PARAMETER_TYPE.DOUBLE,
                range: [0, Infinity],
                default: 100
            },
            ...
        },
        [Optional]OUR_PARAMETERS: {
            useWorker: {
                type: PARAMETER_TYPE.BOOL,
                range: [true, false],
                default: false
            },
            ...
        }
    }
    Another example(If you want to use this way, make sure your parameters are ordered):
    layout = {
        [Required]LAYOUT_NAME:"PMDS",
        [Optional]ATTRIBUTE_ARRAYS:(graph)=>{
            let sourceIndexArray, targetIndexArray ...
            //TODO
            return [
                {
                    name: "source",
                    type: ATTRIBUTE_TYPE.INT
                    value: sourceIndexArray
                },
                ...
            ]
        },
        [Optional]ORIGIN_PARAMETERS: { ... },
        [Optional]OUR_PARAMETERS: { ... }
    }
    `)
    return result
}