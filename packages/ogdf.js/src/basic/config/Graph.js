import { PARAMETER_TYPE } from '../../utils/parameters'

class Graph {
    static BaseModuleName = 'Graph'
    static ModuleName = 'BaseGraph'
    constructor(graph) {
        this._sourceIndexArray = []
        this._targetIndexArray = []
        this._orderedAttributes = []

        this._graph = { nodes: [], links: [] }
        this._nodesNum = 0
        this._linksNum = 0
        this.graph(graph)
    }
    malloc(OGDFModule) {
        const N = this._nodesNum
        const M = this._linksNum
        let source = OGDFModule._malloc(4 * M)
        let target = OGDFModule._malloc(4 * M)
        for (let i = 0; i < M; ++i) {
            OGDFModule.HEAP32[source / 4 + i] = this._sourceIndexArray[i]
            OGDFModule.HEAP32[target / 4 + i] = this._targetIndexArray[i]
        }
        const mallocAttributes = this._orderedAttributes.map((attr) => {
            let bytes = 4
            if (attr.type == PARAMETER_TYPE.DOUBLE) {
                bytes = 8
            }
            const malloc = OGDFModule._malloc(bytes * attr.value.length)
            let heap = OGDFModule.HEAP32
            if (attr.type == PARAMETER_TYPE.DOUBLE) {
                heap = OGDFModule.HEAPF64
            }
            for (let i = 0; i < attr.value.length; ++i) {
                heap[malloc / bytes + i] = attr.value[i]
            }
            return malloc
        })
        return [N, M, source, target, ...mallocAttributes]
    }
    json() {
        const N = this._nodesNum
        const M = this._linksNum
        return [N, M, this._sourceIndexArray, this._targetIndexArray, this._orderedAttributes]
    }
    graph(graph) {
        if (graph) {
            this._graph = graph
            this._nodesNum = this._nodesNum
            this._linksNum = this._linksNum
        }
        return JSON.parse(JSON.stringify(this._graph))
    }
}

class BaseGraph extends Graph {
    static ModuleName = 'BaseGraph'
    constructor(graph) {
        super(graph)
    }
    graph(graph) {
        super.graph(graph)
        if (graph) {
            const id2index = {}
            for (let i = 0; i < this._nodesNum; ++i) {
                if (this._graph.nodes[i]['id'] in id2index) {
                    throw Error('Duplicated Node ID') // duplicated node id is not allowed
                } else id2index[this._graph.nodes[i]['id']] = i
            }

            this._sourceIndexArray = []
            this._targetIndexArray = []
            for (let i = 0; i < this._linksNum; ++i) {
                this._sourceIndexArray.push(id2index[this._graph.links[i].source])
                this._targetIndexArray.push(id2index[this._graph.links[i].target])
            }
        }
        return JSON.parse(JSON.stringify(this._graph))
    }
}

class NodeLinkGraph extends Graph {
    static ModuleName = 'NodeLinkGraph'
    constructor(graph) {
        super(graph)
    }
    graph(graph) {
        super.graph(graph)
        if (graph) {
            const id2index = {}
            for (let i = 0; i < this._nodesNum; ++i) {
                if (this._graph.nodes[i]['id'] in id2index) {
                    throw Error('Duplicated Node ID') // duplicated node id is not allowed
                } else id2index[this._graph.nodes[i]['id']] = i
            }

            this._sourceIndexArray = []
            this._targetIndexArray = []
            for (let i = 0; i < this._linksNum; ++i) {
                this._sourceIndexArray.push(id2index[this._graph.links[i].source])
                this._targetIndexArray.push(id2index[this._graph.links[i].target])
            }

            this._nodesXArray = []
            this._nodesYArray = []

            for (let i = 0; i < this._nodesNum; ++i) {
                this._nodesXArray.push(this._graph.nodes[i].x)
                this._nodesYArray.push(this._graph.nodes[i].y)
            }

            this._orderedAttributes = [
                { type: PARAMETER_TYPE.DOUBLE, value: this._nodesXArray },
                { type: PARAMETER_TYPE.DOUBLE, value: this._nodesYArray }
            ]
        }

        return JSON.parse(JSON.stringify(this._graph))
    }
}

class LinkWeightGraph extends Graph {
    static ModuleName = 'LinkWeightGraph'
    constructor(graph) {
        super(graph)
    }
    graph(graph) {
        super.graph(graph)
        if (graph) {
            this._graph = graph

            const id2index = {}
            for (let i = 0; i < this._nodesNum; ++i) {
                if (this._graph.nodes[i]['id'] in id2index) {
                    throw Error('Duplicated Node ID') // duplicated node id is not allowed
                } else id2index[this._graph.nodes[i]['id']] = i
            }

            this._sourceIndexArray = []
            this._targetIndexArray = []
            this._linkWeightArray = []
            for (let i = 0; i < this._linksNum; ++i) {
                this._sourceIndexArray.push(id2index[this._graph.links[i].source])
                this._targetIndexArray.push(id2index[this._graph.links[i].target])
                this._linkWeightArray.push(this._graph.links[i].weight || 1.0)
            }
        }

        this._orderedAttributes = [{ type: PARAMETER_TYPE.DOUBLE, value: this._linkWeightArray }]

        return JSON.parse(JSON.stringify(this._graph))
    }
}

class NodeLinkWeightGraph extends Graph {
    static ModuleName = 'NodeLinkWeightGraph'
    constructor(graph) {
        super(graph)
    }
    graph(graph) {
        super.graph(graph)
        if (graph) {
            this._graph = graph

            const id2index = {}
            for (let i = 0; i < this._nodesNum; ++i) {
                if (this._graph.nodes[i]['id'] in id2index) {
                    throw Error('Duplicated Node ID') // duplicated node id is not allowed
                } else id2index[this._graph.nodes[i]['id']] = i
            }

            this._sourceIndexArray = []
            this._targetIndexArray = []
            this._linkWeightArray = []
            for (let i = 0; i < this._linksNum; ++i) {
                this._sourceIndexArray.push(id2index[this._graph.links[i].source])
                this._targetIndexArray.push(id2index[this._graph.links[i].target])
                this._linkWeightArray.push(this._graph.links[i].weight || 1.0)
            }

            this._nodesXArray = []
            this._nodesYArray = []

            for (let i = 0; i < this._nodesNum; ++i) {
                this._nodesXArray.push(this._graph.nodes[i].x)
                this._nodesYArray.push(this._graph.nodes[i].y)
            }

            this._orderedAttributes = [
                { type: PARAMETER_TYPE.DOUBLE, value: this._nodesXArray },
                { type: PARAMETER_TYPE.DOUBLE, value: this._nodesYArray },
                { type: PARAMETER_TYPE.DOUBLE, value: this._linkWeightArray }
            ]
        }

        return JSON.parse(JSON.stringify(this._graph))
    }
}

class NodeSizeLinkGraph extends Graph {
    static ModuleName = 'NodeSizeLinkGraph'
    constructor(graph) {
        super(graph)
    }
    graph(graph) {
        super.graph(graph)
        if (graph) {
            this._graph = graph

            const id2index = {}
            for (let i = 0; i < this._nodesNum; ++i) {
                if (this._graph.nodes[i]['id'] in id2index) {
                    throw Error('Duplicated Node ID') // duplicated node id is not allowed
                } else id2index[this._graph.nodes[i]['id']] = i
            }

            this._sourceIndexArray = []
            this._targetIndexArray = []
            for (let i = 0; i < this._linksNum; ++i) {
                this._sourceIndexArray.push(id2index[this._graph.links[i].source])
                this._targetIndexArray.push(id2index[this._graph.links[i].target])
            }

            this._nodesXArray = []
            this._nodesYArray = []
            this._nodesWidthArray = []
            this._nodesHeightArray = []

            for (let i = 0; i < this._nodesNum; ++i) {
                this._nodesXArray.push(this._graph.nodes[i].x)
                this._nodesYArray.push(this._graph.nodes[i].y)
                this._nodesWidthArray.push(this._graph.nodes[i].width)
                this._nodesHeightArray.push(this._graph.nodes[i].height)
            }

            this._orderedAttributes = [
                { type: PARAMETER_TYPE.DOUBLE, value: this._nodesXArray },
                { type: PARAMETER_TYPE.DOUBLE, value: this._nodesYArray },
                { type: PARAMETER_TYPE.DOUBLE, value: this._nodesWidthArray },
                { type: PARAMETER_TYPE.DOUBLE, value: this._nodesHeightArray }
            ]
        }

        return JSON.parse(JSON.stringify(this._graph))
    }
}
Graph.BaseGraph = BaseGraph
Graph.NodeLinkGraph = NodeLinkGraph
Graph.LinkWeightGraph = LinkWeightGraph
Graph.NodeLinkWeightGraph = NodeLinkWeightGraph
Graph.NodeSizeLinkGraph = NodeSizeLinkGraph
export default Graph
