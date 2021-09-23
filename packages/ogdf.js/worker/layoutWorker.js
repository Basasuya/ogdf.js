importScripts("/packages/ogdf.js/dist/ogdf.js")
importScripts("/packages/ogdf.js/src/entry/rawogdf.js")
function OGDFProcess({ layoutName, layoutParams, graphType, graph }) {
    return initOGDF().then(function (Module) {
        //参数依然存在问题
        let layout = new (ogdf.Module.LayoutModule[layoutName])(layoutParams.parameters)
        let graphAttributes = new (ogdf.Basic.Graph[graphType])(graph)
        let layoutAddr = layout.malloc(Module)
        let GA = graphAttributes.malloc(Module)
        const result = Module[`_${graphAttributes.constructor.BaseModuleName}_${graphAttributes.constructor.ModuleName}`](
            layoutAddr,
            ...GA
        )
        const nodes = []
        for (let i = 0; i < graph.nodes.length; ++i) {
            nodes[i] = {}
            nodes[i]['x'] = Module.HEAPF32[(result >> 2) + i * 2]
            nodes[i]['y'] = Module.HEAPF32[(result >> 2) + i * 2 + 1]
        }
        Module._free_buf(result)
        return nodes
    })
}
if (self.constructor.name == 'DedicatedWorkerGlobalScope') {
    console.log('Webworker is working...')
    // if it is executed in webworker
    addEventListener('message', (e) => {
        let message = JSON.parse(e.data)
        OGDFProcess(message).then((nodes) => postMessage(JSON.stringify(nodes)))
    })
}