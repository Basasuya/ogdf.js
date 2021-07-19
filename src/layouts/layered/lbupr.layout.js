
OUR_PARAMETERS = {
    useWorker: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: false,
    },
}

ORIGIN_PARAMETERS = {
    hierarchyLayoutType: {
        type: PARAMETER_TYPE.CATEGORICAL,
        range: ["Fast", "FastSimple", "Optimal"],
        modules: OGDF_MODULES.HierarchyLayout,
        default: "Fast",
    },
    rankingType: {
        type: PARAMETER_TYPE.CATEGORICAL,
        range: ["CoffmanGraham", "LongestPath", "Optimal"],
        modules: OGDF_MODULES.Ranking,
        default: "Optimal",
    }
}

ENTRY_DEFINITION = "LBUPR(int node_num, int link_num, int* source, int* target, int hierarchyLayoutType, bool fixedLayerDistance, double layerDistance, double nodeDistance, bool balanced, bool downward, bool leftToRight, double weightBalancing, double weightSegments, int rankingType, bool alignBaseClasses, bool alignSiblings, bool optimizeEdgeLength, bool separateDeg0Layer, bool separateMultiEdges)"