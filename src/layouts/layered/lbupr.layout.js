
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
        range: OGDF_MODULES.RANGES.HierarchyLayout,
        modules: OGDF_MODULES.HierarchyLayout,
        default: "Fast",
    },
    rankingType: {
        type: PARAMETER_TYPE.CATEGORICAL,
        range: OGDF_MODULES.RANGES.Ranking,
        modules: OGDF_MODULES.Ranking,
        default: "Optimal",
    }
}

ENTRY_DEFINITION = "LBUPR(int node_num, int link_num, int* source, int* target, double* nodesX, double* nodesY, double* nodesWidth, double* nodesHeight, int hierarchyLayoutType, bool fixedLayerDistance, double layerDistance, double nodeDistance, bool balanced, bool downward, bool leftToRight, double weightBalancing, double weightSegments, int rankingType, bool alignBaseClasses, bool alignSiblings, bool optimizeEdgeLength, bool separateDeg0Layer, bool separateMultiEdges)"

NODE_ATTRIBUTES = [
    {
        name: "nodesX",
        mapper: node => node.x
    },
    {
        name: "nodesY",
        mapper: node => node.y
    },
    {
        name: "nodesWidth",
        mapper: node => "width" in node ? node.width : 1.
    },
    {
        name: "nodesHeight",
        mapper: node => "height" in node ? node.height : 1.
    }
]