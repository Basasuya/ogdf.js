import { PARAMETER_TYPE } from './parameters'

const AcyclicSubgraph = {
    Dfs: {}, GreedyCycleRemoval: {}
}

const Augmentation = {
    DfsMakeBiconnected: {},
    PlanarAugmentation: {},
    PlanarAugmentationFix: {}
}

const CCLayoutPack = {
    TileToRows: {}
}

const CrossingMinimization = {
    SubgraphPlanarizer: {
        globalInternalLibraryLogLevel: {
            type: PARAMETER_TYPE.CATEGORICAL,
            range: ["Minor", "Medium", "Default", "High", "Alarm", "Force"],
            default: "Alarm"
        },
        globalLogLevel: {
            type: PARAMETER_TYPE.CATEGORICAL,
            range: ["Minor", "Medium", "Default", "High", "Alarm", "Force"],
            default: "Alarm"
        },
        globalMinimumLogLevel: {
            type: PARAMETER_TYPE.CATEGORICAL,
            range: ["Minor", "Medium", "Default", "High", "Alarm", "Force"],
            default: "Medium"
        },
        globalStatisticMode: {
            type: PARAMETER_TYPE.BOOL,
            range: [true, false],
            default: false,
        },
        localLogLevel: {
            type: PARAMETER_TYPE.CATEGORICAL,
            range: ["Minor", "Medium", "Default", "High", "Alarm", "Force"],
            default: "Default"
        },
        localLogMode: {
            type: PARAMETER_TYPE.CATEGORICAL,
            range: ["Global", "GlobalLog", "Log", "Statistic"],
            default: "Global"
        },
        maxThreads: {
            type: PARAMETER_TYPE.INT,
            range: [0, Infinity],
            default: 1
        },
        permutations: {
            type: PARAMETER_TYPE.INT,
            range: [0, Infinity],
            default: 1
        },
        timeout: {
            type: PARAMETER_TYPE.BOOL,
            range: [true, false],
            default: true,
        },
        timeLimit: {
            type: PARAMETER_TYPE.INT,
            range: [-Infinity, Infinity],
            default: 1000
            // default: -1 if timeLimit < 0 will be unstoppable
        },
        inserterType: {
            type: PARAMETER_TYPE.MODULE,
            module: "EdgeInsertion",
            default: "VariableEmbedding"
        },
        subgraphType: {
            type: PARAMETER_TYPE.MODULE,
            module: "PlanarSubgraph",
            default: "Fast"
        }
    }
}


const EdgeInsertion = {
    FixedEmbedding: {
        keepEmbedding: {
            type: PARAMETER_TYPE.BOOL,
            range: [true, false],
            default: false,
        },
        percentMostCrossed: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [-Infinity, Infinity],
            default: 25
        },
        removeReinsert: {
            type: PARAMETER_TYPE.CATEGORICAL,
            range: ["None", "Inserted", "MostCrossed", "All", "Incremental", "IncInserted"],
            default: "None"
        },
        timeLimit: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [-Infinity, Infinity],
            default: 1000
            // default: -1 if timeLimit < 0 will be unstoppable
        }
    },
    MultiEdgeApprox: {
        percentMostCrossedFix: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [-Infinity, Infinity],
            default: 25
        },
        percentMostCrossedVar: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [-Infinity, Infinity],
            default: 25
        },
        removeReinsertFix: {
            type: PARAMETER_TYPE.CATEGORICAL,
            range: ["None", "Inserted", "MostCrossed", "All", "Incremental", "IncInserted"],
            default: "None"
        },
        removeReinsertVar: {
            type: PARAMETER_TYPE.CATEGORICAL,
            range: ["None", "Inserted", "MostCrossed", "All", "Incremental", "IncInserted"],
            default: "None"
        },
        statistics: {
            type: PARAMETER_TYPE.BOOL,
            range: [true, false],
            default: false,
        },
        timeLimit: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [-Infinity, Infinity],
            default: 1000
            // default: -1 if timeLimit < 0 will be unstoppable
        }
    },
    VariableEmbedding: {
        percentMostCrossed: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [-Infinity, Infinity],
            default: 25
        },
        removeReinsert: {
            type: PARAMETER_TYPE.CATEGORICAL,
            range: ["None", "Inserted", "MostCrossed", "All", "Incremental", "IncInserted"],
            default: "None"
        },
        timeLimit: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [-Infinity, Infinity],
            default: 1000
            // default: -1 if timeLimit < 0 will be unstoppable
        }
    }
}

const Embedder = {
    MaxFace: {
        timeLimit: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [-Infinity, Infinity],
            default: 1000
            // default: -1 if timeLimit < 0 will be unstoppable
        }
    },
    MinDepth: {
        timeLimit: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [-Infinity, Infinity],
            default: 1000
            // default: -1 if timeLimit < 0 will be unstoppable
        }
    },
    MinDepthPiTa: {
        timeLimit: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [-Infinity, Infinity],
            default: 1000
            // default: -1 if timeLimit < 0 will be unstoppable
        },
        useExtendedDepthDefinition: {
            type: PARAMETER_TYPE.BOOL,
            range: [true, false],
            default: true,
        }
    },
    OptimalFlexDraw: {
        timeLimit: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [-Infinity, Infinity],
            default: 1000
            // default: -1 if timeLimit < 0 will be unstoppable
        }
    },
    Simple: {
        timeLimit: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [-Infinity, Infinity],
            default: 1000
            // default: -1 if timeLimit < 0 will be unstoppable
        }
    }
}

const GridLayoutPlanRep = {
    Mixed: {
        separation: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [0, Infinity],
            default: 20.0
        },
        augmenterType: {
            type: PARAMETER_TYPE.MODULE,
            module: "Augmentation",
            default: "PlanarAugmentation"
        },
        crossingsBeautifierType: {
            type: PARAMETER_TYPE.MODULE,
            module: "MixedModelCrossingsBeautifier",
            default: "MMDummyCrossingsBeautifier"
        },
        embedderType: {
            type: PARAMETER_TYPE.MODULE,
            module: "Embedder",
            default: "Simple"
        },
        shellingOrderType: {
            type: PARAMETER_TYPE.MODULE,
            module: "ShellingOrder",
            default: "Biconnected"
        }
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

const LayeredCrossMin = {
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

const LayoutPlanRep = {
    Ortho: {
        bendBound: {
            type: PARAMETER_TYPE.INT,
            range: [0, Infinity],
            default: 2
        },
        cOverhang: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [0, Infinity],
            default: 0.2
        },
        margin: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [0, Infinity],
            default: 20.0
        },
        progressive: {
            type: PARAMETER_TYPE.BOOL,
            range: [true, false],
            default: true,
        },
        scaling: {
            type: PARAMETER_TYPE.BOOL,
            range: [true, false],
            default: true,
        },
        separation: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [0, Infinity],
            default: 20.0
        }
    }
}

const MixedModelCrossingsBeautifier = {
    MMCBDoubleGrid: {},
    MMCBLocalStretch: {},
    MMDummyCrossingsBeautifier: {}
}

const PlanarSubgraph = {
    Maximum: {
        maxThreads: {
            type: PARAMETER_TYPE.INT,
            range: [0, Infinity],
            default: 1
        },
        timeLimit: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [-Infinity, Infinity],
            default: 1000
            // default: -1 if timeLimit < 0 will be unstoppable
        },
    },
    BoyerMyrvold: {
        maxThreads: {
            type: PARAMETER_TYPE.INT,
            range: [0, Infinity],
            default: 1
        },
        timeLimit: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [-Infinity, Infinity],
            default: 1000
            // default: -1 if timeLimit < 0 will be unstoppable
        },
        runs: {
            type: PARAMETER_TYPE.INT,
            range: [0, Infinity],
            default: 10
        },
        randomness: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [-Infinity, Infinity],
            default: 0
        }
    },
    Cactus: {
        maxThreads: {
            type: PARAMETER_TYPE.INT,
            range: [0, Infinity],
            default: 1
        },
        timeLimit: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [-Infinity, Infinity],
            default: 1000
            // default: -1 if timeLimit < 0 will be unstoppable
        },
    },
    Empty: {
        maxThreads: {
            type: PARAMETER_TYPE.INT,
            range: [0, Infinity],
            default: 1
        },
        timeLimit: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [-Infinity, Infinity],
            default: 1000
            // default: -1 if timeLimit < 0 will be unstoppable
        },
    },
    Fast: {
        maxThreads: {
            type: PARAMETER_TYPE.INT,
            range: [0, Infinity],
            default: 1
        },
        timeLimit: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [-Infinity, Infinity],
            default: 1000
            // default: -1 if timeLimit < 0 will be unstoppable
        },
        runs: {
            type: PARAMETER_TYPE.INT,
            range: [0, Infinity],
            default: 10
        },
    },
    Tree: {
        maxThreads: {
            type: PARAMETER_TYPE.INT,
            range: [0, Infinity],
            default: 1
        },
        timeLimit: {
            type: PARAMETER_TYPE.INT,
            range: [-Infinity, Infinity],
            default: 1000
            // default: -1 if timeLimit < 0 will be unstoppable
        },
    }
}

const Ranking = {
    CoffmanGraham: {
        width: {
            type: PARAMETER_TYPE.INT,
            range: [0, Infinity],
            default: 3
        },
        subgraphType: {
            type: PARAMETER_TYPE.MODULE,
            module: "AcyclicSubgraph",
            default: "Dfs"
        }
    },
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
        },
        subgraphType: {
            type: PARAMETER_TYPE.MODULE,
            module: "AcyclicSubgraph",
            default: "Dfs"
        }
    },
    Optimal: {
        separateMultiEdges: {
            type: PARAMETER_TYPE.BOOL,
            range: [true, false],
            default: true
        },
        subgraphType: {
            type: PARAMETER_TYPE.MODULE,
            module: "AcyclicSubgraph",
            default: "Dfs"
        }
    }
}

const ShellingOrder = {
    Biconnected: {
        baseRatio: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [0, Infinity],
            default: 0.33
        }
    },
    Triconnected: {
        baseRatio: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [0, Infinity],
            default: 0.33
        }
    }
}




const RANGES = {
    AcyclicSubgraph: ["Dfs", "GreedyCycleRemoval"],
    Augmentation: ["DfsMakeBiconnected", "PlanarAugmentation", "PlanarAugmentationFix"],
    CCLayoutPack: ["TileToRows"],
    CrossingMinimization: ["SubgraphPlanarizer"],
    EdgeInsertion: ["FixedEmbedding", "MultiEdgeApprox", "VariableEmbedding"],
    Embedder: ["MaxFace", "MinDepth", "MinDepthPiTa", "OptimalFlexDraw", "Simple"],
    GridLayoutPlanRep: ["Mixed"],
    HierarchyClusterLayout: ["Optimal"],
    HierarchyLayout: ["Fast", "FastSimple", "Optimal"],
    LayeredCrossMin: ["BarycenterHeuristic", "GlobalSifting", "GreedyInsertHeuristic", "GreedySwitchHeuristic", "GridSifting", "MedianHeuristic", "SiftingHeuristic", "SplitHeuristic"],
    LayoutPlanRep: ["Ortho"],
    MixedModelCrossingsBeautifier: ["MMCBDoubleGrid", "MMCBLocalStretch", "MMDummyCrossingsBeautifier"],
    PlanarSubgraph: ["Maximum", "Cactus", "Empty", "Fast", "Tree"],
    Ranking: ["CoffmanGraham", "LongestPath", "Optimal"],
    ShellingOrder: ["Biconnected", "Triconnected"]
}

const OGDF_MODULES = { AcyclicSubgraph, Augmentation, CCLayoutPack, CrossingMinimization, EdgeInsertion, Embedder, GridLayoutPlanRep, HierarchyClusterLayout, HierarchyLayout, LayeredCrossMin, LayoutPlanRep, MixedModelCrossingsBeautifier, PlanarSubgraph, Ranking, ShellingOrder, RANGES }

export default OGDF_MODULES