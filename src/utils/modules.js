const PARAMETER_TYPE = {
    CATEGORICAL: "CATEGORICAL",
    INT: "INT",
    DOUBLE: "DOUBLE",
    BOOL: "BOOL",
}

const Ranking = {
    CoffmanGraham: {},
    LongestPath: {
        alignBaseClasses: {
            type: PARAMETER_TYPE.BOOL,
            range: [true, false],
            default: false
        },
        alignSiblings: {
            type: PARAMETER_TYPE.BOOL,
            range: [true, false],
            default: false
        },
        optimizeEdgeLength: {
            type: PARAMETER_TYPE.BOOL,
            range: [true, false],
            default: true
        },
        separateDeg0Layer: {
            type: PARAMETER_TYPE.BOOL,
            range: [true, false],
            default: true
        },
        separateMultiEdges: {
            type: PARAMETER_TYPE.BOOL,
            range: [true, false],
            default: true
        }
    },
    Optimal: {
        separateMultiEdges: {
            type: PARAMETER_TYPE.BOOL,
            range: [true, false],
            default: true
        }
    }
}

const CrossingMinimization = {
    BarycenterHeuristic: {},
    GlobalSifting: {
        nRepeats: {
            type: PARAMETER_TYPE.INT,
            range: [0, Infinity],
            default: 10
        }
    },
    GreedyInsertHeuristic: {},
    GreedySwitchHeuristic: {},
    GridSifting: {
        verticalStepsBound: {
            type: PARAMETER_TYPE.INT,
            range: [0, Infinity],
            default: 10
        }
    },
    MedianHeuristic: {},
    SiftingHeuristic: {},
    SplitHeuristic: {}
}

const HierarchyLayout = {
    Fast: {
        fixedLayerDistance: {
            type: PARAMETER_TYPE.BOOL,
            range: [true, false],
            default: false,
        },
        layerDistance: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [0, Infinity],
            default: 3.0,
        },
        nodeDistance: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [0, Infinity],
            default: 3.0
        }
    },
    FastSimple: {
        layerDistance: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [0, Infinity],
            default: 75,
        },
        nodeDistance: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [0, Infinity],
            default: 150
        },
        balanced: {
            type: PARAMETER_TYPE.BOOL,
            range: [true, false],
            default: true,
        },
        downward: {
            type: PARAMETER_TYPE.BOOL,
            range: [true, false],
            default: true,
        },
        leftToRight: {
            type: PARAMETER_TYPE.BOOL,
            range: [true, false],
            default: true,
        }
    },
    Optimal: {
        fixedLayerDistance: {
            type: PARAMETER_TYPE.BOOL,
            range: [true, false],
            default: false,
        },
        layerDistance: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [0, Infinity],
            default: 3.0,
        },
        nodeDistance: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [0, Infinity],
            default: 3.0
        },
        weightBalancing: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [0, Infinity],
            default: 0.1,
        },
        weightSegments: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [0, Infinity],
            default: 2.0,
        },
    }
}

const HierarchyClusterLayout = {
    Optimal: {
        fixedLayerDistance: {
            type: PARAMETER_TYPE.BOOL,
            range: [true, false],
            default: false,
        },
        layerDistance: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [0, Infinity],
            default: 3.0,
        },
        nodeDistance: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [0, Infinity],
            default: 3.0
        },
        weightBalancing: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [0, Infinity],
            default: 0.1,
        },
        weightClusters: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [0, Infinity],
            default: 0.05,
        },
        weightSegments: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [0, Infinity],
            default: 2.0,
        },
    }
}

const CCLayoutPack = {
    TileToRows: {}
}

module.exports = { Ranking, CrossingMinimization, HierarchyLayout, HierarchyClusterLayout, CCLayoutPack }