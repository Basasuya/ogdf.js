const { getOptions } = require('loader-utils');
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
    let _createReactDOM = false
    const STATIC_PARAMETER = { USE_FUNCTION: "", ORIGIN_PARAMETERS: {}, OUR_PARAMETERS: {}, M: 0, N: 0 }
    const _ATTRIBUTE_ARRAYS = [] // ordered
    const _PARAMETER_SEQUENCE = [] // ordered
    const _private = {
        _prepare: function () {
            if (!initByName) {
                helper.setLinkAttributeArray("source", link => {
                    const id2index = {}
                    for (let i = 0; i < N; ++i) {
                        if (graph.nodes[i]['id'] in id2index) {
                            throw Error('Duplicated Node ID')
                        } else id2index[graph.nodes[i]['id']] = i
                    }
                    return id2index[link.source]
                })
                helper.setLinkAttributeArray("target", link => {
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
        setCreateReactDOM(createReactDOM = false) {
            _createReactDOM = createReactDOM
            return helper
        },
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
            let code = `
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
            `
            if (_createReactDOM) code += `
            const Switcher = require('../../loader/components/switcher.jsx').default
            const Toggle = require('../../loader/components/toggle.jsx').default
            const Transformator = require('../../loader/components/transformator.jsx').default
            ${STATIC_PARAMETER.USE_FUNCTION.toLowerCase()}.render = function(element, params, callback){
                const setters = []
                const parameters = {
                    ...${JSON.stringify(DEFAULTS)},
                    ...params
                }
                for(let name in PARAMETERS){
                    let setter;
                    if(PARAMETERS[name].type === PARAMETER_TYPE.BOOL){
                        setter = <Toggle key = {name} name = {name} value = {parameters[name]} params = {params} onChange = {callback}></Toggle>
                    }
                    else if(PARAMETERS[name].type === PARAMETER_TYPE.CATEGORICAL){
                        setter = <Switcher key = {name} name = {name} value = {parameters[name]} range = {PARAMETERS[name].range} params = {params} onChange = {callback}></Switcher>
                    }
                    else{
                        setter = <Transformator key = {name} name = {name} value = {parameters[name]} params = {params} onChange = {callback}></Transformator>
                    }
                    setters.push(setter)
                }
                const paramSetter = <div>{setters}</div>
                ReactDOM.render(
                    paramSetter,
                    element
                )
            }
            `
            code += `export default ${STATIC_PARAMETER.USE_FUNCTION.toLowerCase()}`
            return code
        },
        /**
         * Prepare your graph attribute arrays before using if in need
         */
        setAttributeArrays(mappers = (graph) => { return [] }) {
            _ATTRIBUTE_ARRAYS.push(mappers.toString())
            return helper
        },
        setNodeAttributeArray(name, forEachNode = (node) => { return node }) {
            let index = _ATTRIBUTE_ARRAYS.findIndex(value => value.name === name)
            if (index < 0) throw Error(`NodeAttributeSettingError: Node Attribute ${name} has not been defined in entry definition, please check  ENTRY_DEFINITION.`)
            _ATTRIBUTE_ARRAYS[index].setValue = `
                    (graph) => {
                        const nodeAttributeArray = []
                        for (let i = 0; i < N; ++i) {
                            nodeAttributeArray.push((${forEachNode})(graph.nodes[i]))
                        }
                        return nodeAttributeArray
                    }`
            return helper
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
            return helper
        },
        setNodeAttributeArrays(forEachNodeFunctionArray) {
            if (!forEachNodeFunctionArray) return helper
            for (let index in forEachNodeFunctionArray) {
                let eachNode = forEachNodeFunctionArray[index]
                helper.setNodeAttributeArray(eachNode.name, eachNode.mapper)
            }
            return helper
        },
        setLinkAttributeArrays(forEachLinkFunctionArray) {
            if (!forEachLinkFunctionArray) return helper
            forEachLinkFunctionArray = forEachLinkFunctionArray
            for (let index in forEachLinkFunctionArray) {
                let eachLink = forEachLinkFunctionArray[index]
                helper.setLinkAttributeArray(eachLink.name, eachLink.mapper)
            }
            return helper
        }
    }
    return {
        /**
         * if you choose init by name, please make sure your parameters are all in order
         * @param {*} name 
         * @returns helper
         */
        initByLayoutName(name) {
            initByName = true
            STATIC_PARAMETER.USE_FUNCTION = name.toUpperCase()
            return helper
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
            return helper
        },
    }
}

module.exports = function (source) {
    let result
    const options = getOptions(this) || {}
    let ENTRY_DEFINITION, LAYOUT_NAME, ATTRIBUTE_ARRAYS, NODE_ATTRIBUTES, LINK_ATTRIBUTES, ORIGIN_PARAMETERS, OUR_PARAMETERS
    eval(source)
    if (ENTRY_DEFINITION)
        result = createLayout()
            .initByLayoutDefinition(ENTRY_DEFINITION)
            .setNodeAttributeArrays(NODE_ATTRIBUTES || [])
            .setLinkAttributeArrays(LINK_ATTRIBUTES || [])
            .setOriginParameters(ORIGIN_PARAMETERS || {})
            .setOurParameters(OUR_PARAMETERS || {})
            .setCreateReactDOM(options.createReactDOM)
            .export()
    else if (LAYOUT_NAME)
        result = createLayout()
            .initByLayoutName(LAYOUT_NAME)
            .setAttributeArrays(ATTRIBUTE_ARRAYS)
            .setOriginParameters(ORIGIN_PARAMETERS || {})
            .setOurParameters(OUR_PARAMETERS || {})
            .setCreateReactDOM(options.createReactDOM)
            .export()
    else throw Error(`LayoutNotDefinedError: variable 'layout' in ${this.resourcePath} has not been defined correctly.
    There are two alternative definitions, for example(Recommended):
    [Required]C_DEFINITION = "PMDS(int node_num, int link_num, int* source, int* target, ...)",
    [Optional]NODE_ATTRIBUTES = [
        {name: "nodesX", mapper: node => node.x}, 
        {name: "nodesY", mapper: node => node.y},
        ...
    ],
    [Optional]Link_ATTRIBUTES = [
        {name: "source", mapper: link => link.source},
        {name: "target", mapper: link => link.target},
        ...
    ],
    [Optional]ORIGIN_PARAMETERS = {
        edgeCosts: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [0, Infinity],
            default: 100
        },
        ...
    },
    [Optional]OUR_PARAMETERS = {
        useWorker: {
            type: PARAMETER_TYPE.BOOL,
            range: [true, false],
            default: false
        },
        ...
    }
    Another example(If you want to use this way, make sure your parameters should be ordered):
    [Required]LAYOUT_NAME = "PMDS",
    [Optional]ATTRIBUTE_ARRAYS = (graph)=>{
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
    [Optional]ORIGIN_PARAMETERS = { ... },
    [Optional]OUR_PARAMETERS = { ... }
    `)
    return result
}