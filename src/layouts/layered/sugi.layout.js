
OUR_PARAMETERS = {
    useWorker: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: false,
    },
}

ORIGIN_PARAMETERS = {
    alignBaseClasses: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: false,
    },
    alignSiblings: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: false,
    },
    arrangeCCs: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: true,
    },
    fails: {
        type: PARAMETER_TYPE.INT,
        range: [0, Infinity],
        default: 4,
    },
    maxThreads: {
        type: PARAMETER_TYPE.INT,
        range: [0, Infinity],
        default: 1,
    },
    minDistCC: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 20.0,
    },
    pageRatio: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 1.0,
    },
    permuteFirst: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: false,
    },
    runs: {
        type: PARAMETER_TYPE.INT,
        range: [0, Infinity],
        default: 15,
    },
    transpose: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: true,
    },
    clusterLayoutType: {
        type: PARAMETER_TYPE.CATEGORICAL,
        range: OGDF_MODULES.RANGES.HierarchyClusterLayout,
        modules: OGDF_MODULES.HierarchyClusterLayout,
        default: "Optimal",
    },
    crossMinType: {
        type: PARAMETER_TYPE.CATEGORICAL,
        range: OGDF_MODULES.RANGES.CrossingMinimization,
        modules: OGDF_MODULES.CrossingMinimization,
        default: "BarycenterHeuristic",
    },
    layoutType: {
        type: PARAMETER_TYPE.CATEGORICAL,
        range: OGDF_MODULES.RANGES.HierarchyLayout,
        modules: OGDF_MODULES.HierarchyLayout,
        default: "Fast",
    },
    packerType: {
        type: PARAMETER_TYPE.CATEGORICAL,
        range: OGDF_MODULES.RANGES.CCLayoutPack,
        modules: OGDF_MODULES.CCLayoutPack,
        default: "TileToRows",
    },
    rankingType: {
        type: PARAMETER_TYPE.CATEGORICAL,
        range: OGDF_MODULES.RANGES.Ranking,
        modules: OGDF_MODULES.Ranking,
        default: "LongestPath",
    }
}

ENTRY_DEFINITION = "SUGI(int node_num, int link_num, int* source, int* target, bool alignBaseClasses, bool alignSiblings, bool arrangeCCs, int fails, unsigned int maxThreads, double minDistCC, double pageRatio, bool permuteFirst, int runs, bool transpose, int clusterLayoutType, bool fixedLayerDistance, double layerDistance, double nodeDistance, double weightBalancing, double weightClusters, double weightSegments, int crossMinType, int nRepeats, int verticalStepsBound, int layoutType, bool balanced, bool downward, bool leftToRight, int packerType, int rankingType, bool optimizeEdgeLength, bool separateDeg0Layer, bool separateMultiEdges)"