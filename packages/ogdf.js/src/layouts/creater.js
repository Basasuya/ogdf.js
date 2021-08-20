import initOGDF from '../entry/rawogdf'
import { createWorker } from '../utils/worker-helper'
import {
    getDefaultParameters,
    updateParameters,
    getParameterEntries,
    PARAMETER_TYPE
} from '../utils/parameters'
import { OGDF_MODULES, parameters } from '../utils'

export default function createLayout(
    NAME,
    OUR_PARAMETER_DEFINITION,
    ORIGIN_PARAMETER_DEFINITION,
    ATTRIBUTES_DEFINITION
) {
    // parameters
    const PARAMETER_DEFINITION = {
        ...ORIGIN_PARAMETER_DEFINITION, // parameters defined by ogdf
        ...OUR_PARAMETER_DEFINITION // parameters defined by us, such as useWebWorker, ...
    }

    class Layout {
        constructor({ graph, parameters, callback }) {
            this._sourceIndexArray = []
            this._targetIndexArray = []
            this._orderedAttributes = []

            this.name = NAME
            this._graph = { nodes: [], links: [] }
            this.graph(graph)

            // overwrite default parameters by user defined parameters
            this._parameters = getDefaultParameters(PARAMETER_DEFINITION)
            this.parameters(parameters)

            this._callback = callback
            this.callback(callback)
        }
        run() {
            // ogdf-defined parameters should keep their orders
            const parameterEntries = getParameterEntries(
                this._parameters,
                ORIGIN_PARAMETER_DEFINITION,
                OUR_PARAMETER_DEFINITION
            )
            const originParameterValues = parameterEntries
                .filter((entry) => entry.isOriginParameter)
                .map((entry) => entry.value)

            const N = this._graph.nodes.length
            const M = this._graph.links.length

            function createOGDFProcess() {
                function OGDFProcess(
                    {
                        NAME,
                        PARAMETER_TYPE,
                        initOGDF,
                        N,
                        M,
                        sourceIndexArray,
                        targetIndexArray,
                        orderedAttributes,
                        originParameterValues
                    },
                    callback
                ) {
                    initOGDF().then(function (Module) {
                        let source = Module._malloc(4 * M)
                        let target = Module._malloc(4 * M)
                        for (let i = 0; i < M; ++i) {
                            Module.HEAP32[source / 4 + i] = sourceIndexArray[i]
                            Module.HEAP32[target / 4 + i] = targetIndexArray[i]
                        }
                        const mallocAttributes = orderedAttributes.map((attr) => {
                            let bytes = 4
                            if (attr.type == PARAMETER_TYPE.DOUBLE) {
                                bytes = 8
                            }
                            const malloc = Module._malloc(bytes * attr.value.length)
                            let heap = Module.HEAP32
                            if (attr.type == PARAMETER_TYPE.DOUBLE) {
                                heap = Module.HEAPF64
                            }
                            for (let i = 0; i < attr.value.length; ++i) {
                                heap[malloc / bytes + i] = attr.value[i]
                            }
                            return malloc
                        })
                        const result = Module[`_${NAME}`](
                            N,
                            M,
                            source,
                            target,
                            ...mallocAttributes,
                            ...originParameterValues
                        ) // ! Ensure the order of attributes/parameters
                        const nodes = []
                        for (let i = 0; i < N; ++i) {
                            nodes[i] = {}
                            nodes[i]['x'] = Module.HEAPF32[(result >> 2) + i * 2]
                            nodes[i]['y'] = Module.HEAPF32[(result >> 2) + i * 2 + 1]
                        }
                        Module._free(source)
                        Module._free(target)
                        Module._free_buf(result)
                        callback(nodes)
                    })
                }
                if (this?.constructor.name == 'DedicatedWorkerGlobalScope') {
                    console.log('Webworker is working...')
                    // if it is executed in webworker
                    addEventListener('message', (e) => {
                        let message = JSON.parse(e.data)
                        let initOGDF = message.initOGDF
                        eval(`initOGDF = ${initOGDF}`)
                        message.initOGDF = initOGDF
                        OGDFProcess(message, (nodes) => postMessage(JSON.stringify(nodes)))
                    })
                }
                return OGDFProcess
            }

            if (this._parameters.useWorker) {
                const worker = createWorker(createOGDFProcess)

                // post data, including functions/parameters/..., into the webworker
                worker.postMessage(
                    JSON.stringify({
                        NAME,
                        PARAMETER_TYPE,
                        initOGDF: initOGDF.toString(), // ! Maybe we can put initOGDF out of web worker
                        N,
                        M,
                        sourceIndexArray: this._sourceIndexArray,
                        targetIndexArray: this._targetIndexArray,
                        orderedAttributes: this._orderedAttributes,
                        originParameterValues
                    })
                )

                // onmessage listens the returned value from the webworker, namely, the layout
                worker.onmessage = (e) => {
                    const nodePositions = JSON.parse(e.data)
                    for (let i = 0; i < N; ++i) {
                        this._graph.nodes[i].x = nodePositions[i].x
                        this._graph.nodes[i].y = nodePositions[i].y
                    }
                    worker.terminate()
                    this._callback(this._graph)
                }
            } else {
                const OGDFProcess = createOGDFProcess()
                OGDFProcess(
                    {
                        NAME,
                        PARAMETER_TYPE,
                        initOGDF,
                        N,
                        M,
                        sourceIndexArray: this._sourceIndexArray,
                        targetIndexArray: this._targetIndexArray,
                        orderedAttributes: this._orderedAttributes,
                        originParameterValues
                    },
                    (nodes) => {
                        for (let i = 0; i < N; ++i) {
                            this._graph.nodes[i]['x'] = nodes[i].x
                            this._graph.nodes[i]['y'] = nodes[i].y
                        }
                        this._callback(this._graph)
                    }
                )
            }
        }
        parameters(parameter, value) {
            if (parameter) {
                if (typeof parameter == 'object') {
                    // this.parameters({ useHighLevelOptions: true })
                    updateParameters(this._parameters, parameter, PARAMETER_DEFINITION)
                } else if (typeof parameter == 'string') {
                    // e.g., this.parameters("useHighLevelOptions", true)
                    // e.g., this.parameters("multilevelBuilderType.module", "EdgeCoverMerger")
                    // e.g., this.parameters("multilevelBuilderType.edgeLengthAdjustment")
                    const parameterChain = parameter.split('.')
                    let PD = PARAMETER_DEFINITION
                    let parent = this._parameters
                    for (let i = 0; i < parameterChain.length - 1; i++) {
                        const module = Object.keys(parent)
                            .filter((paramName) => {
                                if (parent[paramName] == parameterChain[i]) {
                                    // it means parent[paramName] is a module
                                    return paramName
                                }
                            })
                            .pop()
                        if (module) {
                            // parent[module] is a module
                            if (!(module in OGDF_MODULES)) {
                                throw Error(
                                    `OGDFModuleError: Module name ${module} has not been defined, please check OGDF_MODULES.`
                                )
                            }
                            PD = OGDF_MODULES[module]
                        }
                        PD = PD[parameterChain[i]]
                        parent = parent[parameterChain[i]]
                        if (!parent || !parent[parameterChain[i + 1]]) {
                            throw Error(
                                `ParameterError: Cannot find parameter ${parameter} in ${this.name}'s parameters`
                            )
                        }
                    }
                    const chainEnd = parameterChain[parameterChain.length - 1]
                    if (value !== undefined) {
                        const newParam = {}
                        newParam[chainEnd] = value
                        updateParameters(parent, newParam, PD)
                    } else {
                        return parent[chainEnd]
                    }
                }
            }
            return JSON.parse(JSON.stringify(this._parameters))
        }
        callback(callback) {
            this._callback = typeof callback == 'function' ? callback : () => {}
        }
        graph(graph) {
            if (graph) {
                this._graph = graph

                const id2index = {}
                for (let i = 0; i < this._graph.nodes.length; ++i) {
                    if (this._graph.nodes[i]['id'] in id2index) {
                        throw Error('Duplicated Node ID') // duplicated node id is not allowed
                    } else id2index[this._graph.nodes[i]['id']] = i
                }

                this._sourceIndexArray = []
                this._targetIndexArray = []
                for (let i = 0; i < this._graph.links.length; ++i) {
                    this._sourceIndexArray.push(id2index[this._graph.links[i].source])
                    this._targetIndexArray.push(id2index[this._graph.links[i].target])
                }

                // sort attributes according to their order (sequence)
                const nodeAttributes = ATTRIBUTES_DEFINITION.node
                const linkAttributes = ATTRIBUTES_DEFINITION.link
                const unorderedAttributes = {}
                nodeAttributes?.forEach((attr) => {
                    unorderedAttributes[attr.name] = {
                        type: attr.type,
                        value: this._graph.nodes.map(attr.mapper)
                    }
                })
                linkAttributes?.forEach((attr) => {
                    unorderedAttributes[attr.name] = {
                        type: attr.type,
                        value: this._graph.links.map(attr.mapper)
                    }
                })
                this._orderedAttributes = []
                ATTRIBUTES_DEFINITION.sequence?.forEach((name) => {
                    this._orderedAttributes.push(unorderedAttributes[name])
                }) // ! Ensure the order of attributes
            }

            return this._graph
        }
    }

    return Layout
}
