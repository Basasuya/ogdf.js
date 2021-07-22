function getDefaultValueOfParameters(parameters) {
    let result = {}
    Object.keys(parameters).forEach((key) => {
        result[key] = parameters[key].default
        if (parameters[key].type === PARAMETER_TYPE.MODULE) {
            if (!OGDF_MODULES[parameters[key].module] || !OGDF_MODULES.RANGES[parameters[key].module]) {
                throw Error(`OGDFModuleError: Module name ${parameters[key].module} has not been defined, please check OGDF_MODULES.`)
            }
            result = {
                ...result,
                ...getDefaultValueOfParameters(OGDF_MODULES[parameters[key].module][parameters[key].default])
            }
        }
    })
    return result
}

const PARAMETER_TYPE = {
    MODULE: "MODULE",
    CATEGORICAL: "CATEGORICAL",
    INT: "INT",
    DOUBLE: "DOUBLE",
    BOOL: "BOOL",
}

const OGDF_MODULES = require("../src/utils/modules")

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
    const STATIC_PARAMETER = { USE_FUNCTION: "", ORIGIN_PARAMETERS: {}, OUR_PARAMETERS: {} }
    const _GRAPH_ATTRIBUTES = []
    const _ATTRIBUTE_ARRAYS = [] // ordered
    const _PARAMETER_SEQUENCE = [] // ordered
    const _private = {
        _initialize: function () {
            if (!initByName) {
                helper
                    .setGraphAttribute("node_num", graph => graph.nodes.length)
                    .setGraphAttribute("link_num", graph => graph.links.length)
                const lines = [
                    'function(graph){',
                    `                   let GRAPH_ATTRIBUTES = []`
                ]
                for (let index in _GRAPH_ATTRIBUTES) {
                    if (!_GRAPH_ATTRIBUTES[index].setValue)// some attribute array has not been setted yet
                        throw Error(`AttributeNotSettedError: Graph attribute ${_GRAPH_ATTRIBUTES[index].name} of layout ${STATIC_PARAMETER.USE_FUNCTION} has not been setted yet.`)
                    lines.push(`                    GRAPH_ATTRIBUTES[${index}] = (${_GRAPH_ATTRIBUTES[index].setValue})(graph)`)
                }
                lines.push(
                    '                       return GRAPH_ATTRIBUTES',
                    '                   }')
                return lines.join('\r\n')
            }
        },
        _prepare: function () {
            if (!initByName) {
                helper
                    .setLinkAttributeArray("source", link => {
                        const id2index = {}
                        for (let i = 0; i < GRAPH_ATTRIBUTES[0]; ++i) {
                            if (graph.nodes[i]['id'] in id2index) {
                                throw Error('Duplicated Node ID')
                            } else id2index[graph.nodes[i]['id']] = i
                        }
                        return id2index[link.source]
                    })
                    .setLinkAttributeArray("target", link => {
                        const id2index = {}
                        for (let i = 0; i < GRAPH_ATTRIBUTES[0]; ++i) {
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
                    lines.push(`                    ATTRIBUTR_ARRAYS[${index}].value = (${_ATTRIBUTE_ARRAYS[index].setValue})(graph)`)
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
                let isDefined = _PARAMETER_SEQUENCE.map(() => 0)
                function findParams(params) {
                    for (let paramName in params) {
                        let search = _PARAMETER_SEQUENCE.findIndex(element => element === paramName)
                        if (search >= 0) {
                            isDefined[search] = 1
                            STATIC_PARAMETER.ORIGIN_PARAMETERS[paramName] = params[paramName]
                        }
                        else throw Error(`Origin parameter ${paramName} of layout ${STATIC_PARAMETER.USE_FUNCTION} is not defined in ENTRY DEFINITION.`)
                        if (params[paramName].type === PARAMETER_TYPE.MODULE) {
                            if (!OGDF_MODULES[params[paramName].module] || !OGDF_MODULES.RANGES[params[paramName].module]) {
                                throw Error(`OGDFModuleError: Module name ${params[paramName].module} has not been defined, please check OGDF_MODULES.`)
                            }
                            for (let moduleName in OGDF_MODULES[params[paramName].module]) {
                                let ogdfModule = OGDF_MODULES[params[paramName].module][moduleName]
                                findParams(ogdfModule)
                            }
                        }
                    }
                }
                findParams(params)
                isDefined.forEach((value, index) => {
                    if (value === 0)
                        throw Error(`Origin parameter ${_PARAMETER_SEQUENCE[index]} of layout ${STATIC_PARAMETER.USE_FUNCTION} is defined ENTRY DEFINITION but not be found in ORIGIN PARAMETERS.`)
                })
            }
            else STATIC_PARAMETER.ORIGIN_PARAMETERS = params
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
            const initOGDF = require('../../entry/rawogdf')
            const { PARAMETER_TYPE } = require('../../utils/parameters')
            const OGDF_MODULES = require('../../utils/modules')
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
                const originalParameters = ORIGIN_PARAMETER_SEQUENCE.map(() => 0)
                function setParameters(PARAMS) {
                    for(let paramName in PARAMS){
                        if (PARAMS[paramName].type === PARAMETER_TYPE.MODULE) {
                            originalParameters[ORIGIN_PARAMETER_SEQUENCE.indexOf(paramName)] = OGDF_MODULES.RANGES[PARAMS[paramName].module].indexOf(parameters[paramName])
                            if (PARAMS[paramName].module) {
                                let module = OGDF_MODULES[PARAMETERS[paramName].module][parameters[paramName]]
                                setParameters(module)
                            }
                        } else if (PARAMS[paramName].type === PARAMETER_TYPE.CATEGORICAL) {
                            originalParameters[ORIGIN_PARAMETER_SEQUENCE.indexOf(paramName)] = PARAMS[paramName].range.indexOf(parameters[paramName])
                        } else if(PARAMS[paramName]){
                            originalParameters[ORIGIN_PARAMETER_SEQUENCE.indexOf(paramName)] = parameters[paramName]
                        }
                    }
                }
                setParameters(ORIGIN_PARAMETERS)
                const _graph = JSON.parse(JSON.stringify(graph))
                const GRAPH_ATTRIBUTES = (${_private._initialize()})(_graph)
                const indexArrays = (${_private._prepare()})(_graph)
                if (parameters.useWorker) {
                    const workerFunc = function () {
                        addEventListener('message', (e) => {
                            let { initOGDF, GRAPH_ATTRIBUTES, indexArrays, originalParameters } = JSON.parse(e.data)
                            let evalstr = "initOGDF = " + initOGDF
                            eval(evalstr)
                            initOGDF().then(function (md) {
                                Module = md
                                const arrays = (${_private._malloc()})(indexArrays)
                                const result = Module._${STATIC_PARAMETER.USE_FUNCTION.toUpperCase()}(
                                    ...GRAPH_ATTRIBUTES,
                                    ...arrays,
                                    ...originalParameters
                                )
                                const nodes = []
                                for (let i = 0; i < GRAPH_ATTRIBUTES[0]; ++i) {
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
                            GRAPH_ATTRIBUTES,
                            indexArrays,
                            originalParameters
                        })
                    )
                    worker.onmessage = function (e) {
                        const nodePositions = JSON.parse(e.data)
                        for (let i = 0; i < GRAPH_ATTRIBUTES[0]; ++i) {
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
                            ...GRAPH_ATTRIBUTES,
                            ...arrays,
                            ...originalParameters
                        )
                        for (let i = 0; i < GRAPH_ATTRIBUTES[0]; ++i) {
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
                        for (let i = 0; i < GRAPH_ATTRIBUTES[0]; ++i) {
                            nodeAttributeArray.push((${forEachNode})(graph.nodes[i]))
                        }
                        return nodeAttributeArray
                    }`
            return helper
        },
        setLinkAttributeArray(name, forEachLink = (link) => { return link }) {
            let index = _ATTRIBUTE_ARRAYS.findIndex(value => value.name === name)
            if (index < 0) throw Error(`LinkAttributeSettingError: Link Attribute ${name} has not been defined in entry definition, please check  ENTRY_DEFINITION.`)
            _ATTRIBUTE_ARRAYS[index].setValue = `
                    (graph) => {
                        const linkAttributeArray = []
                        for (let i = 0; i < GRAPH_ATTRIBUTES[1]; ++i) {
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
            for (let index in forEachLinkFunctionArray) {
                let eachLink = forEachLinkFunctionArray[index]
                helper.setLinkAttributeArray(eachLink.name, eachLink.mapper)
            }
            return helper
        },
        setGraphAttribute(name, graphFunction = (graph) => { return graph }) {
            let index = _GRAPH_ATTRIBUTES.findIndex(value => value.name === name)
            if (index < 0) throw Error(`GraphAttributeSettingError: Graph Attribute ${name} has not been defined in entry definition, please check ENTRY_DEFINITION.`)
            _GRAPH_ATTRIBUTES[index].setValue = graphFunction.toString()
            return helper
        },
        setGraphAttributes(graphFunctionArray) {
            if (!graphFunctionArray) return helper
            for (let index in graphFunctionArray) {
                let graphFunction = graphFunctionArray[index]
                helper.setGraphAttribute(graphFunction.name, graphFunction.mapper)
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
            const parameterDefinitions = definition.substring(definition.indexOf("(") + 1, definition.indexOf(")")).split(/\s?\,\s?/)
            let isGraphAttributes = true
            parameterDefinitions.forEach((value) => {
                let parts = value.split(/\s/)
                let type = parts.slice(0, -1).join(" ") // eg. "unsigned int param"
                let name = parts[parts.length - 1]
                let starPos = type.indexOf("*")
                if (starPos > 0) {
                    if (isGraphAttributes) isGraphAttributes = false
                    type = ATTRIBUTE_TYPE[type.substring(0, starPos).toUpperCase()]
                    _ATTRIBUTE_ARRAYS.push({ name, type, value: [] })
                }
                else if (isGraphAttributes) {
                    _GRAPH_ATTRIBUTES.push({ name })
                }
                else _PARAMETER_SEQUENCE.push(name)
            })
            return helper
        },
    }
}

module.exports = function (source) {
    let result
    let ENTRY_DEFINITION, LAYOUT_NAME, ATTRIBUTE_ARRAYS, GRAPH_ATTRIBUTES, NODE_ATTRIBUTES, LINK_ATTRIBUTES, ORIGIN_PARAMETERS, OUR_PARAMETERS
    eval(source)
    if (ENTRY_DEFINITION)
        result = createLayout()
            .initByLayoutDefinition(ENTRY_DEFINITION)
            .setGraphAttributes(GRAPH_ATTRIBUTES || [])
            .setNodeAttributeArrays(NODE_ATTRIBUTES || [])
            .setLinkAttributeArrays(LINK_ATTRIBUTES || [])
            .setOriginParameters(ORIGIN_PARAMETERS || {})
            .setOurParameters(OUR_PARAMETERS || {})
            .export()
    else if (LAYOUT_NAME)
        result = createLayout()
            .initByLayoutName(LAYOUT_NAME)
            .setAttributeArrays(ATTRIBUTE_ARRAYS)
            .setOriginParameters(ORIGIN_PARAMETERS || {})
            .setOurParameters(OUR_PARAMETERS || {})
            .export()
    else throw Error(`LayoutNotDefinedError: variable 'layout' in ${this.resourcePath} has not been defined correctly.`)
    return result
}