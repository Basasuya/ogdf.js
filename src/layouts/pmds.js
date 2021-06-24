import initOGDF from "../entry/rawogdf"

const PARAMETER_SEQUENCE = [
    "edgeCosts",
    "numberOfPivots",
    "useEdgeCostsAttribute",
] // should keep identical to the parameter order in src/entry/main.cpp => function pmds()

function pmds(graph, params, callback) {
    const defaultParams = {
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
    const N = graph.nodes.length
    const M = graph.links.length
    const id2index = {}
    for (let i = 0; i < N; ++i) {
        if (graph.nodes[i]["id"] in id2index) {
            throw Error("Duplicated Node ID")
        } else id2index[graph.nodes[i]["id"]] = i
    }
    initOGDF().then(function (Module) {
        let source = Module._malloc(4 * M)
        let target = Module._malloc(4 * M)
        let edgesWeight = Module._malloc(8 * M) // double type
        for (let i = 0; i < M; ++i) {
            Module.HEAP32[source / 4 + i] = id2index[graph.links[i].source]
            Module.HEAP32[target / 4 + i] = id2index[graph.links[i].target]
            if ("weight" in graph.links[i]) {
                Module.HEAPF64[edgesWeight / 8 + i] = graph.links[i].weight
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
            graph.nodes[i]["x"] = Module.HEAPF32[(result >> 2) + i * 2]
            graph.nodes[i]["y"] = Module.HEAPF32[(result >> 2) + i * 2 + 1]
        }
        callback(graph)

        Module._free(source)
        Module._free(target)
        Module._free_buf(result)
    })
}

export default pmds
