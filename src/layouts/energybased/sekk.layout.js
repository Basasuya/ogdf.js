
OUR_PARAMETERS = {
    useWorker: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: false,
    },
}

ORIGIN_PARAMETERS = {
    computeMaxIterations: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: true,
    },
    desLength: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [-Infinity, Infinity],
        default: 0.0,
    },
    globalIterationFactor: {
        type: PARAMETER_TYPE.INT,
        range: [0, Infinity],
        default: 16,
    },
    maxGlobalIterations: {
        type: PARAMETER_TYPE.INT,
        range: [0, Infinity],
        default: 2147483647,
    },
    maxLocalIterations: {
        type: PARAMETER_TYPE.INT,
        range: [0, Infinity],
        default: 2147483647,
    },
    stopTolerance: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 0.001,
    },
    useLayout: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: true,
    },
    zeroLength: {
        type: PARAMETER_TYPE.BOOL,
        range: [-Infinity, Infinity],
        default: -1.0,
    },
}

ENTRY_DEFINITION = "SEKK(int node_num, int link_num, int* source, int* target, double* nodesX, double* nodesY, double* nodesWidth, double* nodesHeight, bool computeMaxIterations, double desLength, int globalIterationFactor, int maxGlobalIterations, int maxLocalIterations, double stopTolerance, bool useLayout, double zeroLength)"

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