import { Graph } from "../basic";
import { LayoutModule } from "../module";
import initOGDF from '../entry/rawogdf'
import { createWorker } from './worker-helper'

class LayoutRenderer {
    constructor(config) {
        this._parameters = config?.parameters || {}
        this._graph = config?.graph || {}
        this._useWorker = false
        if (config?.Layout) this.layout(config.Layout)
        else this.layout()
    }
    useWorker(useWorker) {
        this._useWorker = useWorker
    }
    parameters(parameters) {
        if (parameters) {
            this._parameters = parameters
            this._layout.parameters(this._parameters)
        }
        return this._parameters
    }
    graph(graph) {
        if (graph) {
            this._graph = graph
            this._graphAttributes = new (LayoutType.GraphType)(this._graph)
        }
        return this._graph
    }
    run() {
        function createOGDFProcess() {
            function OGDFProcess({
                Module,
                functionName,
                layoutAddr,
                GA
            }) {
                const result = Module[functionName](
                    layoutAddr,
                    ...GA
                ) // ! Ensure the order of attributes/parameters
                const nodes = []
                for (let i = 0; i < N; ++i) {
                    nodes[i] = {}
                    nodes[i]['x'] = Module.HEAPF32[(result >> 2) + i * 2]
                    nodes[i]['y'] = Module.HEAPF32[(result >> 2) + i * 2 + 1]
                }
                Module._free_buf(result)
                return nodes
            }
            if (this?.constructor.name == 'DedicatedWorkerGlobalScope') {
                console.log('Webworker is working...')
                // if it is executed in webworker
                addEventListener('message', (e) => {
                    let message = JSON.parse(e.data)
                    let initOGDF = message.initOGDF
                    eval(`initOGDF = ${initOGDF}`)
                    message.initOGDF = initOGDF
                    OGDFProcess(message).then((nodes) => postMessage(JSON.stringify(nodes)))
                })
            }
            return OGDFProcess
        }
        let self = this
        return initOGDF().then(function (Module) {
            const layoutAddr = self._layout.malloc(Module)
            const GA = self._graphAttributes.malloc(Module)
            const functionName = `_${self._graphAttributes.constructor.BaseModuleName}_${self._graphAttributes.constructor.ModuleName}`
            if (self._useWorker && typeof Worker !== 'undefined') {
                const worker = createWorker(createOGDFProcess)

                return new Promise((resolve, reject) => {
                    // post data, including functions/parameters/..., into the webworker
                    worker.postMessage(
                        JSON.stringify({
                            Module: Module.toString(),
                            functionName,
                            layoutAddr,
                            GA
                        })
                    )
                    // onmessage listens the returned value from the webworker, namely, the layout
                    worker.onmessage = (e) => {
                        const nodePositions = JSON.parse(e.data)
                        for (let i = 0; i < N; ++i) {
                            self._graph.nodes[i].x = nodePositions[i].x
                            self._graph.nodes[i].y = nodePositions[i].y
                        }
                        worker.terminate()
                        resolve(self._graph)
                    }
                })
            } else {
                // const OGDFProcess = createOGDFProcess()
                // return new Promise((resolve, reject) => {
                //     OGDFProcess({
                //         initOGDF,
                //         functionName,
                //         layoutAddr,
                //         GA
                //     }).then((nodes) => {
                //         for (let i = 0; i < N; ++i) {
                //             self._graph.nodes[i].x = nodes[i].x
                //             self._graph.nodes[i].y = nodes[i].y
                //         }
                //         resolve(self._graph)
                //     })
                // })
                const result = Module[functionName](
                    layoutAddr,
                    ...GA
                ) // ! Ensure the order of attributes/parameters
                const nodes = []
                for (let i = 0; i < self._graph.nodes.length; ++i) {
                    nodes[i] = {}
                    nodes[i]['x'] = Module.HEAPF32[(result >> 2) + i * 2]
                    nodes[i]['y'] = Module.HEAPF32[(result >> 2) + i * 2 + 1]
                }
                Module._free_buf(result)
                return new Promise((resolve, reject) => {
                    for (let i = 0; i < self._graph.nodes.length; ++i) {
                        self._graph.nodes[i].x = nodes[i].x
                        self._graph.nodes[i].y = nodes[i].y
                    }
                    resolve(self._graph)
                })
            }
        })
    }
    layout(layout) {
        // this._layout?.free()
        if (layout) {
            this._layout = new (layout.LayoutModule)(this._parameters)
            this._graphAttributes = new (layout.GraphType)(this._graph)
        }
        else {
            this._layout = new (this.constructor.LayoutModule)(this._parameters)
            this._graphAttributes = new (this.constructor.GraphType)(this._graph)
        }
    }
}

/**
 * 
 * @param {LayoutModule} layoutModule 
 * @param {Graph} graphType
 */
function createLayout(layoutModule, graphType) {
    return class extends LayoutRenderer {
        static LayoutModule = layoutModule
        static GraphType = graphType
    }
}
LayoutRenderer.DavidsonHarelLayout = createLayout(LayoutModule.DavidsonHarelLayout, Graph.BaseGraph)
LayoutRenderer.FMMMLayout = createLayout(LayoutModule.FMMMLayout, Graph.BaseGraph)
LayoutRenderer.FastMultipoleEmbedder = createLayout(LayoutModule.FastMultipoleEmbedder, Graph.NodeLinkGraph)
LayoutRenderer.FastMultipoleMultilevelEmbedder = createLayout(LayoutModule.FastMultipoleMultilevelEmbedder, Graph.BaseGraph)
LayoutRenderer.GEMLayout = createLayout(LayoutModule.GEMLayout, Graph.NodeLinkGraph)
LayoutRenderer.NodeRespecterLayout = createLayout(LayoutModule.NodeRespecterLayout, Graph.BaseGraph)
LayoutRenderer.PivotMDS = createLayout(LayoutModule.PivotMDS, Graph.LinkWeightGraph)
LayoutRenderer.PlanarizationGridLayout = createLayout(LayoutModule.PlanarizationGridLayout, Graph.BaseGraph)
LayoutRenderer.PlanarizationLayout = createLayout(LayoutModule.PlanarizationLayout, Graph.BaseGraph)
LayoutRenderer.SpringEmbedderGridVariant = createLayout(LayoutModule.SpringEmbedderGridVariant, Graph.BaseGraph)
LayoutRenderer.SpringEmbedderKK = createLayout(LayoutModule.SpringEmbedderKK, Graph.NodeSizeLinkGraph)
LayoutRenderer.StressMinimization = createLayout(LayoutModule.StressMinimization, Graph.NodeLinkWeightGraph)
LayoutRenderer.SugiyamaLayout = createLayout(LayoutModule.SugiyamaLayout, Graph.BaseGraph)
LayoutRenderer.TutteLayout = createLayout(LayoutModule.TutteLayout, Graph.BaseGraph)

export default LayoutRenderer