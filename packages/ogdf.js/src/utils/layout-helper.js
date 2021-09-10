import { Graph } from "../basic";
import { LayoutModule } from "../module";

/**
 * 
 * @param {LayoutModule} layoutModule 
 * @param {Graph} graphModule
 */
function createLayout(layoutModule, graphModule) {
    return { LayoutModule: layoutModule, GraphType: graphModule }
}

class Layout {
    constructor(config) {
        this._parameters = config?.parameters || {}
        this._graph = config?.graph || {}
        if (config?.LayoutType) this.layout(config.LayoutType)
        else this.layout(Layout.FMMMLayout)
    }
    parameters(parameters) {
        this._parameters = parameters
        this._layout.parameters(this._parameters)
    }
    graph(graph) {
        this._graph = graph
    }
    run() {
        return this._GA.run(this._layout)
    }
    layout(LayoutType) {
        // this._layout?.free()
        this._layout = new (LayoutType.LayoutModule)(this._parameters)
        this._GA = new (LayoutType.GraphType)(this._graph)
    }
}
Layout.DavidsonHarelLayout = createLayout(LayoutModule.DavidsonHarelLayout, Graph.BaseGraph)
Layout.FMMMLayout = createLayout(LayoutModule.FMMMLayout, Graph.BaseGraph)
Layout.FastMultipoleEmbedder = createLayout(LayoutModule.FastMultipoleEmbedder, Graph.NodeLinkGraph)
Layout.FastMultipoleMultilevelEmbedder = createLayout(LayoutModule.FastMultipoleMultilevelEmbedder, Graph.BaseGraph)
Layout.GEMLayout = createLayout(LayoutModule.GEMLayout, Graph.NodeLinkGraph)
Layout.NodeRespecterLayout = createLayout(LayoutModule.NodeRespecterLayout, Graph.BaseGraph)
Layout.PivotMDS = createLayout(LayoutModule.PivotMDS, Graph.LinkWeightGraph)
Layout.PlanarizationGridLayout = createLayout(LayoutModule.PlanarizationGridLayout, Graph.BaseGraph)
Layout.PlanarizationLayout = createLayout(LayoutModule.PlanarizationLayout, Graph.BaseGraph)
Layout.SpringEmbedderGridVariant = createLayout(LayoutModule.SpringEmbedderGridVariant, Graph.BaseGraph)
Layout.SpringEmbedderKK = createLayout(LayoutModule.SpringEmbedderKK, Graph.NodeSizeLinkGraph)
Layout.StressMinimization = createLayout(LayoutModule.StressMinimization, Graph.NodeLinkWeightGraph)
Layout.SugiyamaLayout = createLayout(LayoutModule.SugiyamaLayout, Graph.BaseGraph)
Layout.TutteLayout = createLayout(LayoutModule.TutteLayout, Graph.BaseGraph)

export default Layout