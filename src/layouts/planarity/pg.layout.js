
OUR_PARAMETERS = {
    useWorker: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: false,
    },
}


ORIGIN_PARAMETERS = {
    pageRatio: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 1.0,
    },
    separation: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 20.0,
    },
    crossMinType: {
        type: PARAMETER_TYPE.MODULE,
        module: "CrossingMinimization",
        default: "SubgraphPlanarizer",
    },
    packerType: {
        type: PARAMETER_TYPE.MODULE,
        module: "CCLayoutPack",
        default: "TileToRows",
    },
    planarLayouterType: {
        type: PARAMETER_TYPE.MODULE,
        module: "GridLayoutPlanRep",
        default: "Mixed",
    },
}

ENTRY_DEFINITION = "PG(int node_num, int link_num, int* source, int* target, double pageRatio, double separation, int crossMinType, int globalInternalLibraryLogLevel, int globalLogLevel, int globalMinimumLogLevel, bool globalStatisticMode, int localLogLevel, int localLogMode, unsigned int maxThreads, int permutations, bool timeout, double timeLimit, int inserterType, bool keepEmbedding, double percentMostCrossed, int removeReinsert, double percentMostCrossedFix, double percentMostCrossedVar, int removeReinsertFix, int removeReinsertVar, bool statistics, int subgraphType, int runs, double randomness, int packerType, int planarLayouterType, int augmenterType, int crossingsBeautifierType, int embedderType, bool useExtendedDepthDefinition, int shellingOrderType, double baseRatio)"