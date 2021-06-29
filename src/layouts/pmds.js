import initOGDF from "../entry/rawogdf"
import { createWorker } from "../utils/worker-helper"

const PARAMETER_SEQUENCE = [
    "edgeCosts",
    "numberOfPivots",
    "useEdgeCostsAttribute",
] // should keep identical to the parameter order in src/entry/main.cpp => function pmds()

function pmds(graph, params, callback) {
    const defaultParams = {
        // customized parameters,
        useWorker: false,
        // original parameters
        edgeCosts: 100,
        numberOfPivots: 250,
        useEdgeCostsAttribute: false,
    }
    let parameters = {
        ...defaultParams,
        ...params,
    }
    parameters = PARAMETER_SEQUENCE.map((paramName) => {
        return parameters[paramName]
    })
    const graphCopy = JSON.parse(JSON.stringify(graph))
    const N = graphCopy.nodes.length
    const M = graphCopy.links.length
    const id2index = {}
    for (let i = 0; i < N; ++i) {
        if (graphCopy.nodes[i]["id"] in id2index) {
            throw Error("Duplicated Node ID")
        } else id2index[graphCopy.nodes[i]["id"]] = i
    }
    const sourceIndexArray = []
    const targetIndexArray = []
    const edgesWeightArray = []
    for (let i = 0; i < M; ++i) {
        sourceIndexArray.push(id2index[graphCopy.links[i].source])
        targetIndexArray.push(id2index[graphCopy.links[i].target])
        edgesWeightArray.push("weight" in graphCopy.links[i] ? graphCopy.links[i].weight : 1)
    }
    if (parameters.useWorker) {
        const worker = createWorker(function () {
            addEventListener("message", (e) => {
                let {
                    initOGDF,
                    N,
                    M,
                    sourceIndexArray,
                    targetIndexArray,
                    edgesWeightArray,
                    originalParameters,
                } = JSON.parse(e.data)
                eval(`initOGDF = ${initOGDF}`)
                initOGDF().then(function (Module) {
                    let source = Module._malloc(4 * M)
                    let target = Module._malloc(4 * M)
                    let edgesWeight = Module._malloc(8 * M) // double type
                    for (let i = 0; i < M; ++i) {
                        Module.HEAP32[source / 4 + i] = sourceIndexArray[i]
                        Module.HEAP32[target / 4 + i] = targetIndexArray[i]
                        Module.HEAPF64[edgesWeight / 8 + i] = edgesWeightArray[i]
                    }
                    const result = Module._PMDS(
                        N,
                        M,
                        source,
                        target,
                        edgesWeight,
                        ...originalParameters
                    )
                    const nodes = []
                    for (let i = 0; i < N; ++i) {
                        nodes[i] = {}
                        nodes[i]["x"] = Module.HEAPF32[(result >> 2) + i * 2]
                        nodes[i]["y"] =
                            Module.HEAPF32[(result >> 2) + i * 2 + 1]
                    }
                    postMessage(JSON.stringify(nodes))
                    Module._free(source)
                    Module._free(target)
                    Module._free(edgesWeight)
                    Module._free_buf(result)
                })
            })
        })
        worker.postMessage(
            JSON.stringify({
                initOGDF: initOGDF.toString(), // ! Maybe we can put initOGDF out of web worker
                N,
                M,
                sourceIndexArray,
                targetIndexArray,
                edgesWeightArray,
                originalParameters,
            })
        )
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
            let edgesWeight = Module._malloc(8 * M) // double type
            for (let i = 0; i < M; ++i) {
                Module.HEAP32[source / 4 + i] = id2index[graphCopy.links[i].source]
                Module.HEAP32[target / 4 + i] = id2index[graphCopy.links[i].target]
                if ("weight" in graphCopy.links[i]) {
                    Module.HEAPF64[edgesWeight / 8 + i] = graphCopy.links[i].weight
                } else {
                    Module.HEAPF64[edgesWeight / 8 + i] = 1
                }
            }
            const result = Module._PMDS(
                N,
                M,
                source,
                target,
                edgesWeight,
                ...parameters
            )
            for (let i = 0; i < N; ++i) {
                graphCopy.nodes[i]["x"] = Module.HEAPF32[(result >> 2) + i * 2]
                graphCopy.nodes[i]["y"] = Module.HEAPF32[(result >> 2) + i * 2 + 1]
            }
            callback(graphCopy)

            Module._free(source)
            Module._free(target)
            Module._free(edgesWeight)
            Module._free_buf(result)
        })
    }
}

export default pmds
