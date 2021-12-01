import { Graph } from '../basic'
import { LayoutModule } from '../module'
import initOGDF from '../entry/rawogdf'
import { PARAMETER_TYPE } from './parameter-type'
import { createWorker } from './worker-helper'
class LayoutRenderer {
    constructor(config) {
        this._parameters = config?.parameters || {}
        this.graph = config?.graph || {}
        this.layout = new this.constructor.LayoutModule(this._parameters)
        this.graphAttributes = new this.constructor.GraphType(this.graph)
        this.useWorker = config?.useWorker || false
        this.parameters = this.layout
    }
    configs = () => {
        return this.layout.configs()
    }
    run() {
        let self = this
        function createOGDFProcess() {
            function OGDFProcess({
                initOGDF,
                PARAMETER_TYPE,
                layoutParams,
                graphType,
                graphAttributes: [N, M, sourceIndexArray, targetIndexArray, orderedAttributes]
            }) {
                function malloc(Module, staticParams, parameters, PARAMETER_DEFINITION) {
                    let params = Object.keys(parameters).map((name) => {
                        let type = PARAMETER_DEFINITION[name].type
                        if (type === PARAMETER_TYPE.CATEGORICAL) {
                            return PARAMETER_DEFINITION[name].range.indexOf(parameters[name])
                        } else if (type === PARAMETER_TYPE.MODULE) {
                            return malloc(
                                Module,
                                parameters[name].static,
                                parameters[name].parameters,
                                parameters[name].PARAMETER_DEFINITION
                            )
                        } else return parameters[name]
                    })
                    let buffer = Module[
                        `_${staticParams.BaseModuleName}_${staticParams.ModuleName}`
                    ](...params)
                    return buffer
                }
                function callGraph(
                    Module,
                    [N, M, sourceIndexArray, targetIndexArray, orderedAttributes]
                ) {
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
                    return [N, M, source, target, ...mallocAttributes]
                }
                return initOGDF().then(function (Module) {
                    let layoutAddr = malloc(
                        Module,
                        layoutParams.static,
                        layoutParams.parameters,
                        layoutParams.PARAMETER_DEFINITION
                    )
                    let GA = callGraph(Module, [
                        N,
                        M,
                        sourceIndexArray,
                        targetIndexArray,
                        orderedAttributes
                    ])
                    const result = Module[`_Graph_${graphType}`](layoutAddr, ...GA)
                    const nodes = []
                    for (let i = 0; i < N; ++i) {
                        nodes[i] = {}
                        nodes[i]['x'] = Module.HEAPF32[(result >> 2) + i * 2]
                        nodes[i]['y'] = Module.HEAPF32[(result >> 2) + i * 2 + 1]
                    }
                    Module._free_buf(result)
                    return nodes
                })
            }
            if (self.constructor.name == 'DedicatedWorkerGlobalScope') {
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
        if (this.useWorker) {
            let worker = createWorker(createOGDFProcess)
            return new Promise((resolve, reject) => {
                // post data, including functions/parameters/..., into the webworker
                worker.postMessage(
                    JSON.stringify({
                        initOGDF: initOGDF.toString(),
                        PARAMETER_TYPE,
                        layoutParams: self.layout.json(),
                        graphType: self.constructor.GraphType.ModuleName,
                        graphAttributes: self.graphAttributes.json()
                    })
                )
                // onmessage listens the returned value from the webworker, namely, the layout
                worker.onmessage = (e) => {
                    const nodePositions = JSON.parse(e.data)
                    for (let i = 0; i < self.graph.nodes.length; ++i) {
                        this.graph.nodes[i].x = nodePositions[i].x
                        this.graph.nodes[i].y = nodePositions[i].y
                    }
                    worker.terminate()
                    resolve(this.graph)
                }
            })
        } else {
            const OGDFProcess = createOGDFProcess()
            return new Promise((resolve, reject) => {
                OGDFProcess({
                    initOGDF,
                    PARAMETER_TYPE,
                    layoutParams: self.layout.json(),
                    graphType: self.constructor.GraphType.ModuleName,
                    graphAttributes: self.graphAttributes.json()
                }).then((nodes) => {
                    for (let i = 0; i < this.graph.nodes.length; ++i) {
                        this.graph.nodes[i].x = nodes[i].x
                        this.graph.nodes[i].y = nodes[i].y
                    }
                    resolve(this.graph)
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
                    if (param === 'configs') throw Error('Error: configs is readonly.')
                    if (param === 'graph') {
                        if (value && 'nodes' in value && 'links' in value) {
                            this.graph = value
                            this.graphAttributes = new this.constructor.LayoutType.GraphType(
                                this.graph
                            )
                        }
                    }
                    target[param] = value
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
const FastMultipoleMultilevelEmbedder = createLayout(
    LayoutModule.FastMultipoleMultilevelEmbedder,
    Graph.BaseGraph
)
const GEMLayout = createLayout(LayoutModule.GEMLayout, Graph.NodeLinkGraph)
const NodeRespecterLayout = createLayout(LayoutModule.NodeRespecterLayout, Graph.BaseGraph)
const PivotMDS = createLayout(LayoutModule.PivotMDS, Graph.LinkWeightGraph)
const PlanarizationGridLayout = createLayout(LayoutModule.PlanarizationGridLayout, Graph.BaseGraph)
const PlanarizationLayout = createLayout(LayoutModule.PlanarizationLayout, Graph.BaseGraph)
const SpringEmbedderGridVariant = createLayout(
    LayoutModule.SpringEmbedderGridVariant,
    Graph.BaseGraph
)
const SpringEmbedderKK = createLayout(LayoutModule.SpringEmbedderKK, Graph.NodeSizeLinkGraph)
const StressMinimization = createLayout(LayoutModule.StressMinimization, Graph.NodeLinkWeightGraph)
const SugiyamaLayout = createLayout(LayoutModule.SugiyamaLayout, Graph.BaseGraph)
const TutteLayout = createLayout(LayoutModule.TutteLayout, Graph.BaseGraph)

const layouts = {
    energybased: {
        DavidsonHarelLayout,
        FMMMLayout,
        FastMultipoleEmbedder,
        FastMultipoleMultilevelEmbedder,
        GEMLayout,
        NodeRespecterLayout,
        PivotMDS,
        SpringEmbedderGridVariant,
        SpringEmbedderKK,
        StressMinimization,
        TutteLayout
    },
    layered: { SugiyamaLayout },
    misclayout: {},
    planarity: { PlanarizationGridLayout, PlanarizationLayout }
}

const Layout = Object.keys(layouts).reduce((result, categoryName) => {
    Object.keys(layouts[categoryName]).forEach((layoutName) => {
        result[layoutName] = layouts[categoryName][layoutName]
    })
    return result
}, {})

export { layouts, Layout }
