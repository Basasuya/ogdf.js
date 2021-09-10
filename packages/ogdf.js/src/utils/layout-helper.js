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

class LayoutRenderer {
    constructor(config) {
        this.parameters = config?.parameters || {}
        this.graph = config?.graph || {}
        if (config?.LayoutType) this.setLayout(config.LayoutType)
        else this.setLayout(Layout.FMMMLayout)
    }
    setParameters(parameters) {
        this.parameters = parameters
        this.layout.parameters(this.parameters)
    }
    setGraph(graph) {
        this.graph = graph
        this.renderer = new (LayoutType.GraphType)(this.graph)
    }
    run() {
        return this.renderer.run(this.layout)
    }
    setLayout(LayoutType) {
        // this._layout?.free()
        this.layout = new (LayoutType.LayoutModule)(this.parameters)
        this.renderer = new (LayoutType.GraphType)(this.graph)
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