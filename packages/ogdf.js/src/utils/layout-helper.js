import { Graph } from "../basic";
import { LayoutModule } from "../module";
import initOGDF from '../entry/rawogdf'

class LayoutRenderer {
    constructor(config) {
        this._parameters = config?.parameters || {}
        this._graph = config?.graph || {}
        this._layout = new (this.constructor.LayoutModule)(this._parameters)
        this._graphAttributes = new (this.constructor.GraphType)(this._graph)
        this._useWorker = config?.useWorker || false
        this._layout.constructor.SEQUENCE.forEach(paramName => {
            this[paramName] = this._layout[paramName]
        })
    }
    useWorker(useWorker) {
        this._useWorker = useWorker
    }
    parameters(parameters) {
        if (parameters) {
            this._parameters = parameters
            this._layout.parameters(this._parameters)
        }
        return this._layout.parameters()
    }
    graph(graph) {
        if (graph) {
            this._graph = graph
            this._graphAttributes = new (LayoutType.GraphType)(this._graph)
        }
        return this._graph
    }
    run() {
        let self = this
        if (this._useWorker) {
            let worker = new Worker("/packages/ogdf.js/worker/layoutWorker.js")
            return new Promise((resolve, reject) => {
                // post data, including functions/parameters/..., into the webworker
                worker.postMessage(
                    JSON.stringify({
                        layoutName: self.constructor.LayoutModule.ModuleName,
                        layoutParams: self._layout.json(),
                        graphType: self.constructor.GraphType.ModuleName,
                        graph: self._graph
                    })
                )
                // onmessage listens the returned value from the webworker, namely, the layout
                worker.onmessage = (e) => {
                    const nodePositions = JSON.parse(e.data)
                    for (let i = 0; i < self._graph.nodes.length; ++i) {
                        this._graph.nodes[i].x = nodePositions[i].x
                        this._graph.nodes[i].y = nodePositions[i].y
                    }
                    worker.terminate()
                    resolve(this._graph)
                }
            })
        }
        else {
            return initOGDF().then(function (Module) {
                const layoutAddr = self._layout.malloc(Module)
                const GA = self._graphAttributes.malloc(Module)
                const functionName = `_${self._graphAttributes.constructor.BaseModuleName}_${self._graphAttributes.constructor.ModuleName}`
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
            })
        }
    }
}

/**
 * 
 * @param {LayoutModule} layoutModule 
 * @param {Graph} graphType
 */
function createLayout(layoutModule, graphType) {
    class Layout extends LayoutRenderer {
        static LayoutModule = layoutModule
        static GraphType = graphType
        static LayoutName = layoutModule.ModuleName
        static PARAMETERS = layoutModule.PARAMETERS
        static PARAMETER_DEFINITION = layoutModule.PARAMETER_DEFINITION
        static SEQUENCE = layoutModule.SEQUENCE
        static DEFAULT_PARAMETERS = layoutModule.DEFAULT_PARAMETERS
    }
    let LayoutProxy = new Proxy(Layout, {
        construct(target, args) {
            return new Proxy(new target(...args), {
                get(target, param) {
                    return target[param]
                },
                set(target, param, value) {
                    target[param] = value
                    if (target._layout.constructor.SEQUENCE.indexOf(param) >= 0)
                        target._layout[param] = value
                    return true
                }
            })
        }
    })
    return LayoutProxy
}
const DavidsonHarelLayout = createLayout(LayoutModule.DavidsonHarelLayout, Graph.BaseGraph)
const FMMMLayout = createLayout(LayoutModule.FMMMLayout, Graph.BaseGraph)
const FastMultipoleEmbedder = createLayout(LayoutModule.FastMultipoleEmbedder, Graph.NodeLinkGraph)
const FastMultipoleMultilevelEmbedder = createLayout(LayoutModule.FastMultipoleMultilevelEmbedder, Graph.BaseGraph)
const GEMLayout = createLayout(LayoutModule.GEMLayout, Graph.NodeLinkGraph)
const NodeRespecterLayout = createLayout(LayoutModule.NodeRespecterLayout, Graph.BaseGraph)
const PivotMDS = createLayout(LayoutModule.PivotMDS, Graph.LinkWeightGraph)
const PlanarizationGridLayout = createLayout(LayoutModule.PlanarizationGridLayout, Graph.BaseGraph)
const PlanarizationLayout = createLayout(LayoutModule.PlanarizationLayout, Graph.BaseGraph)
const SpringEmbedderGridVariant = createLayout(LayoutModule.SpringEmbedderGridVariant, Graph.BaseGraph)
const SpringEmbedderKK = createLayout(LayoutModule.SpringEmbedderKK, Graph.NodeSizeLinkGraph)
const StressMinimization = createLayout(LayoutModule.StressMinimization, Graph.NodeLinkWeightGraph)
const SugiyamaLayout = createLayout(LayoutModule.SugiyamaLayout, Graph.BaseGraph)
const TutteLayout = createLayout(LayoutModule.TutteLayout, Graph.BaseGraph)

export { DavidsonHarelLayout, FMMMLayout, FastMultipoleEmbedder, FastMultipoleMultilevelEmbedder, GEMLayout, NodeRespecterLayout, PivotMDS, PlanarizationGridLayout, PlanarizationLayout, SpringEmbedderGridVariant, SpringEmbedderKK, StressMinimization, SugiyamaLayout, TutteLayout }
