
OUR_PARAMETERS = {
    useWorker: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: false,
    },
}


ORIGIN_PARAMETERS = {
    minCliqueSize: {
        type: PARAMETER_TYPE.INT,
        range: [0, Infinity],
        default: 10,
    },
    pageRatio: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 1.0,
    },
    crossMinType: {
        type: PARAMETER_TYPE.MODULE,
        module: "CrossingMinimization",
        default: "SubgraphPlanarizer",
    },
    embedderType: {
        type: PARAMETER_TYPE.MODULE,
        module: "Embedder",
        default: "Simple",
    },
    packerType: {
        type: PARAMETER_TYPE.MODULE,
        module: "CCLayoutPack",
        default: "TileToRows",
    },
    planarLayouterType: {
        type: PARAMETER_TYPE.MODULE,
        module: "LayoutPlanRep",
        default: "Ortho",
    },
}

ENTRY_DEFINITION = "PL(int node_num, int link_num, int* source, int* target, int minCliqueSize, double pageRatio, int crossMinType, int globalInternalLibraryLogLevel, int globalLogLevel, int globalMinimumLogLevel, bool globalStatisticMode, int localLogLevel, int localLogMode, unsigned int maxThreads, int permutations, bool timeout, double timeLimit, int inserterType, bool keepEmbedding, double percentMostCrossed, int removeReinsert, double percentMostCrossedFix, double percentMostCrossedVar, int removeReinsertFix, int removeReinsertVar, bool statistics, int subgraphType, int runs, double randomness, int embedderType, bool useExtendedDepthDefinition, int packerType, int planarLayouterType, int bendBound, double cOverhang, double margin, bool progressive, bool scaling, double separation)"