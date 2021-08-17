import initOGDF from '../entry/rawogdf'
import { createWorker } from '../utils/worker-helper'
import {
    getDefaultValueOfParameters,
    getOriginParameterSequence,
    getOriginalParameters,
    PARAMETER_TYPE
} from '../utils/parameters'

export default function createLayout(NAME, OUR_PARAMETERS, ORIGIN_PARAMETERS, ATTRIBUTES) {
    const PARAMETERS = {
        ...ORIGIN_PARAMETERS, // parameters defined by ogdf
        ...OUR_PARAMETERS // parameters defined by us, such as useWebWorker, ...
    }

    const ORIGIN_PARAMETER_SEQUENCE = getOriginParameterSequence(ORIGIN_PARAMETERS)

    class Layout {
        constructor({ graph, parameters, callback }) {
            this._sourceIndexArray = []
            this._targetIndexArray = []
            this._orderedAttributes = []

            this.name = NAME
            this._graph = { nodes: [], links: [] }
            this.graph(graph)

            // overwrite default parameters by user defined parameters
            this._parameters = {
                ...getDefaultValueOfParameters(PARAMETERS)
            }
            this.parameters(parameters)

            this._callback = callback
            this.callback(callback)
        }
        run() {
            // ogdf-defined parameters should keep their orders
            const originalParameters = getOriginalParameters(
                this._parameters,
                ORIGIN_PARAMETERS,
                ORIGIN_PARAMETER_SEQUENCE
            )
            console.log(originalParameters)

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
                        originalParameters
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
                            ...originalParameters
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
                        originalParameters
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
                        originalParameters
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
                    this._parameters = {
                        ...this._parameters,
                        ...parameter
                    }
                } else if (typeof parameter == 'string') {
                    if (value !== undefined) {
                        // this.parameters("useHighLevelOptions", true )
                        this._parameters[parameter] = value
                    } else {
                        // this.parameters("useHighLevelOptions")
                        return this._parameters[parameter]
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
                const nodeAttributes = ATTRIBUTES.node
                const linkAttributes = ATTRIBUTES.link
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
                ATTRIBUTES.sequence?.forEach((name) => {
                    this._orderedAttributes.push(unorderedAttributes[name])
                }) // ! Ensure the order of attributes
            }

            return this._graph
        }
    }

    return Layout
}
