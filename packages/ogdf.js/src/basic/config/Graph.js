import initOGDF from '../../entry/rawogdf'
import { createWorker } from '../../utils/worker-helper'
import {
    getDefaultParameters,
    updateParameters,
    getParameterEntries,
    PARAMETER_TYPE
} from '../../utils/parameters'

class Graph {
    constructor(graph) {

        this._ModuleName = "Graph"
        this._BaseModuleName = "Graph"
        this._useWorker = false

        this._sourceIndexArray = []
        this._targetIndexArray = []
        this._orderedAttributes = []

        this._graph = { nodes: [], links: [] }
        this.graph(graph)
    }
    useWorker(useWorker) {
        this._useWorker = useWorker
    }
    run(layout) {

        const N = this._graph.nodes.length
        const M = this._graph.links.length

        let self = this
        function createOGDFProcess() {
            function OGDFProcess({
                initOGDF,
                N,
                M,
                sourceIndexArray,
                targetIndexArray,
                orderedAttributes,
            }) {
                return initOGDF().then(function (Module) {
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
                    const layoutAddr = layout.malloc(Module)
                    const result = Module[`_${self._BaseModuleName}_${self._ModuleName}`](
                        layoutAddr,
                        N,
                        M,
                        source,
                        target,
                        ...mallocAttributes
                    ) // ! Ensure the order of attributes/parameters
                    const nodes = []
                    for (let i = 0; i < N; ++i) {
                        nodes[i] = {}
                        nodes[i]['x'] = Module.HEAPF32[(result >> 2) + i * 2]
                        nodes[i]['y'] = Module.HEAPF32[(result >> 2) + i * 2 + 1]
                    }
                    Module._free(source)
                    Module._free(target)
                    Module._free_buf(result)
                    return nodes
                })
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

        if (this._useWorker && typeof Worker !== 'undefined') {
            const worker = createWorker(createOGDFProcess)

            return new Promise((resolve, reject) => {
                // post data, including functions/parameters/..., into the webworker
                worker.postMessage(
                    JSON.stringify({
                        initOGDF: initOGDF.toString(),
                        N,
                        M,
                        sourceIndexArray: this._sourceIndexArray,
                        targetIndexArray: this._targetIndexArray,
                        orderedAttributes: this._orderedAttributes,
                    })
                )
                // onmessage listens the returned value from the webworker, namely, the layout
                worker.onmessage = (e) => {
                    const nodePositions = JSON.parse(e.data)
                    for (let i = 0; i < N; ++i) {
                        this._graph.nodes[i].x = nodePositions[i].x
                        this._graph.nodes[i].y = nodePositions[i].y
                    }
                    worker.terminate()
                    resolve(this._graph)
                }
            })
        } else {
            const OGDFProcess = createOGDFProcess()
            return new Promise((resolve, reject) => {
                OGDFProcess({
                    initOGDF,
                    N,
                    M,
                    sourceIndexArray: this._sourceIndexArray,
                    targetIndexArray: this._targetIndexArray,
                    orderedAttributes: this._orderedAttributes
                }).then((nodes) => {
                    for (let i = 0; i < N; ++i) {
                        this._graph.nodes[i].x = nodes[i].x
                        this._graph.nodes[i].y = nodes[i].y
                    }
                    resolve(this._graph)
                })
            })
        }
    }
    graph(graph) {
        if (graph) {
            this._graph = graph

            const id2index = {}
            for (let i = 0; i < this._graph.nodes.length; ++i) {
                if (this._graph.nodes[i]['id'] in id2index) {
                    throw Error('Duplicated Node ID') // duplicated node id is not allowed
                } else id2index[this._graph.nodes[i]['id']] = i
            }

            this._sourceIndexArray = []
            this._targetIndexArray = []
            for (let i = 0; i < this._graph.links.length; ++i) {
                this._sourceIndexArray.push(id2index[this._graph.links[i].source])
                this._targetIndexArray.push(id2index[this._graph.links[i].target])
            }
        }

        return JSON.parse(JSON.stringify(this._graph))
    }
}

class BaseGraph extends Graph {
    constructor(graph) {
        super(graph)
        this._ModuleName = "BaseGraph"
    }
    graph(graph) {
        if (graph) {
            this._graph = graph

            const id2index = {}
            for (let i = 0; i < this._graph.nodes.length; ++i) {
                if (this._graph.nodes[i]['id'] in id2index) {
                    throw Error('Duplicated Node ID') // duplicated node id is not allowed
                } else id2index[this._graph.nodes[i]['id']] = i
            }

            this._sourceIndexArray = []
            this._targetIndexArray = []
            for (let i = 0; i < this._graph.links.length; ++i) {
                this._sourceIndexArray.push(id2index[this._graph.links[i].source])
                this._targetIndexArray.push(id2index[this._graph.links[i].target])
            }
        }

        return JSON.parse(JSON.stringify(this._graph))
    }
}

class NodeLinkGraph extends Graph {
    constructor(graph) {
        super(graph)
        this._ModuleName = "NodeLinkGraph"
    }
    graph(graph) {
        if (graph) {
            this._graph = graph

            const id2index = {}
            for (let i = 0; i < this._graph.nodes.length; ++i) {
                if (this._graph.nodes[i]['id'] in id2index) {
                    throw Error('Duplicated Node ID') // duplicated node id is not allowed
                } else id2index[this._graph.nodes[i]['id']] = i
            }

            this._sourceIndexArray = []
            this._targetIndexArray = []
            for (let i = 0; i < this._graph.links.length; ++i) {
                this._sourceIndexArray.push(id2index[this._graph.links[i].source])
                this._targetIndexArray.push(id2index[this._graph.links[i].target])
            }

            this._nodesXArray = []
            this._nodesYArray = []

            for (let i = 0; i < this._graph.nodes.length; ++i) {
                this._nodesXArray.push(this._graph.nodes[i].x)
                this._nodesYArray.push(this._graph.nodes[i].y)
            }

            this._orderedAttributes = [
                { type: PARAMETER_TYPE.DOUBLE, value: this._nodesXArray },
                { type: PARAMETER_TYPE.DOUBLE, value: this._nodesYArray },
            ]
        }

        return JSON.parse(JSON.stringify(this._graph))
    }
}

class LinkWeightGraph extends Graph {
    constructor(graph) {
        super(graph)
        this._ModuleName = "LinkWeightGraph"
    }
    graph(graph) {
        if (graph) {
            this._graph = graph

            const id2index = {}
            for (let i = 0; i < this._graph.nodes.length; ++i) {
                if (this._graph.nodes[i]['id'] in id2index) {
                    throw Error('Duplicated Node ID') // duplicated node id is not allowed
                } else id2index[this._graph.nodes[i]['id']] = i
            }

            this._sourceIndexArray = []
            this._targetIndexArray = []
            this._linkWeightArray = []
            for (let i = 0; i < this._graph.links.length; ++i) {
                this._sourceIndexArray.push(id2index[this._graph.links[i].source])
                this._targetIndexArray.push(id2index[this._graph.links[i].target])
                this._linkWeightArray.push(this._graph.links[i].weight || 1.0)
            }
        }

        this._orderedAttributes = [
            { type: PARAMETER_TYPE.DOUBLE, value: this._linkWeightArray }
        ]

        return JSON.parse(JSON.stringify(this._graph))
    }
}

class NodeLinkWeightGraph extends Graph {
    constructor(graph) {
        super(graph)
        this._ModuleName = "NodeLinkWeightGraph"
    }
    graph(graph) {
        if (graph) {
            this._graph = graph

            const id2index = {}
            for (let i = 0; i < this._graph.nodes.length; ++i) {
                if (this._graph.nodes[i]['id'] in id2index) {
                    throw Error('Duplicated Node ID') // duplicated node id is not allowed
                } else id2index[this._graph.nodes[i]['id']] = i
            }

            this._sourceIndexArray = []
            this._targetIndexArray = []
            this._linkWeightArray = []
            for (let i = 0; i < this._graph.links.length; ++i) {
                this._sourceIndexArray.push(id2index[this._graph.links[i].source])
                this._targetIndexArray.push(id2index[this._graph.links[i].target])
                this._linkWeightArray.push(this._graph.links[i].weight || 1.0)
            }

            this._nodesXArray = []
            this._nodesYArray = []

            for (let i = 0; i < this._graph.nodes.length; ++i) {
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
    constructor(graph) {
        super(graph)
        this._ModuleName = "NodeSizeLinkGraph"
    }
    graph(graph) {
        if (graph) {
            this._graph = graph

            const id2index = {}
            for (let i = 0; i < this._graph.nodes.length; ++i) {
                if (this._graph.nodes[i]['id'] in id2index) {
                    throw Error('Duplicated Node ID') // duplicated node id is not allowed
                } else id2index[this._graph.nodes[i]['id']] = i
            }

            this._sourceIndexArray = []
            this._targetIndexArray = []
            for (let i = 0; i < this._graph.links.length; ++i) {
                this._sourceIndexArray.push(id2index[this._graph.links[i].source])
                this._targetIndexArray.push(id2index[this._graph.links[i].target])
            }

            this._nodesXArray = []
            this._nodesYArray = []
            this._nodesWidthArray = []
            this._nodesHeightArray = []

            for (let i = 0; i < this._graph.nodes.length; ++i) {
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