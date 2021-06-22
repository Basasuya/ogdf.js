import initOGDF from "../entry/ogdf"
export default function fm3(graph, params, callback) {
    const defaultParams = {
        useHighLevelOptions: false,
        singleLevel: false,
        pageFormat: "Square",
    }
    const parameters = {
        ...defaultParams,
        ...params,
    }
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
        for (let i = 0; i < M; ++i) {
            Module.HEAP32[source / 4 + i] = id2index[graph.links[i].source]
            Module.HEAP32[target / 4 + i] = id2index[graph.links[i].target]
        }
        const result = Module._FM3(
            N,
            M,
            source,
            target,
            parameters.useHighLevelOptions,
            parameters.singleLevel
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
