import initOGDF from '../entry/rawogdf'
import { createWorker } from '../utils/worker-helper'
import { getDefaultValueOfParameters, PARAMETER_TYPE } from '../utils/parameters'

export default function createLayout(NAME, OUR_PARAMETERS, ORIGIN_PARAMETERS, ATTRIBUTES) {
    const PARAMETERS = {
        ...ORIGIN_PARAMETERS, // parameters defined by ogdf
        ...OUR_PARAMETERS // parameters defined by us, such as useWebWorker, ...
    }

    const ORIGIN_PARAMETER_SEQUENCE = Object.keys(ORIGIN_PARAMETERS)

    function layout(graph, params, callback) {
        // overwrite default parameters by user defined parameters
        let parameters = {
            ...getDefaultValueOfParameters(PARAMETERS),
            ...params
        }

        // ogdf-defined parameters should keep their orders
        const originalParameters = ORIGIN_PARAMETER_SEQUENCE.map((paramName) => {
            if (PARAMETERS[paramName].type === PARAMETER_TYPE.CATEGORICAL) {
                return PARAMETERS[paramName].range.indexOf(parameters[paramName])
            } else {
                return parameters[paramName]
            }
        })

        const graphCopy = JSON.parse(JSON.stringify(graph)) // ! maybe we dont need to copy it
        const N = graphCopy.nodes.length
        const M = graphCopy.links.length

        const id2index = {}
        for (let i = 0; i < N; ++i) {
            if (graphCopy.nodes[i]['id'] in id2index) {
                throw Error('Duplicated Node ID') // duplicated node id is not allowed
            } else id2index[graphCopy.nodes[i]['id']] = i
        }

        const sourceIndexArray = []
        const targetIndexArray = []
        for (let i = 0; i < M; ++i) {
            sourceIndexArray.push(id2index[graphCopy.links[i].source])
            targetIndexArray.push(id2index[graphCopy.links[i].target])
        }

        // sort attributes according to their order (sequence)
        const nodeAttributes = ATTRIBUTES.node
        const linkAttributes = ATTRIBUTES.link
        const unorderedAttributes = {}
        nodeAttributes?.forEach((attr) => {
            unorderedAttributes[attr.name] = {
                type: attr.type,
                value: graphCopy.nodes.map(attr.mapper)
            }
        })
        linkAttributes?.forEach((attr) => {
            unorderedAttributes[attr.name] = {
                type: attr.type,
                value: graphCopy.links.map(attr.mapper)
            }
        })
        const orderedAttributes = []
        ATTRIBUTES.sequence?.forEach((name) => {
            orderedAttributes.push(unorderedAttributes[name])
        }) // ! Ensure the order of attributes

        if (parameters.useWorker) {
            const worker = createWorker(function () {
                addEventListener('message', (e) => {
                    let message = JSON.parse(e.data)
                    let {
                        NAME,
                        initOGDF,
                        N,
                        M,
                        sourceIndexArray,
                        targetIndexArray,
                        orderedAttributes,
                        originalParameters
                    } = message
                    eval(`initOGDF = ${initOGDF}`)
                    message.initOGDF = initOGDF

                    function ogdfProcess({
                        initOGDF,
                        N,
                        M,
                        sourceIndexArray,
                        targetIndexArray,
                        orderedAttributes,
                        originalParameters
                    }) {
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
                                for (let i = 0; i < N; ++i) {
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
                            postMessage(JSON.stringify(nodes)) // todo
                        })
                    }
                    ogdfProcess(message)
                })
            })

            // post data, including functions/parameters/..., into the webworker
            worker.postMessage(
                JSON.stringify({
                    NAME,
                    initOGDF: initOGDF.toString(), // ! Maybe we can put initOGDF out of web worker
                    N,
                    M,
                    sourceIndexArray,
                    targetIndexArray,
                    orderedAttributes,
                    originalParameters
                })
            )

            // onmessage listens the returned value from the webworker, namely, the layout
            worker.onmessage = function (e) {
                const nodePositions = JSON.parse(e.data)
                for (let i = 0; i < N; ++i) {
                    graphCopy.nodes[i].x = nodePositions[i].x
                    graphCopy.nodes[i].y = nodePositions[i].y
                }
                worker.terminate()
                callback(graphCopy)
            }
        } else {
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
                    for (let i = 0; i < N; ++i) {
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
                for (let i = 0; i < N; ++i) {
                    graphCopy.nodes[i]['x'] = Module.HEAPF32[(result >> 2) + i * 2]
                    graphCopy.nodes[i]['y'] = Module.HEAPF32[(result >> 2) + i * 2 + 1]
                }

                callback(graphCopy)

                Module._free(source)
                Module._free(target)
                Module._free_buf(result)
            })
        }
    }

    layout.parameters = PARAMETERS
    return layout
}
