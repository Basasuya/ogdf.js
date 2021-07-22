
OUR_PARAMETERS = {
    useWorker: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: false,
    },
}

ORIGIN_PARAMETERS = {
    bendNormalizationAngle: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [-Infinity, Infinity],
        default: Math.PI,
    },
    desiredMinEdgeLength: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 20.0,
    },
    dummyInsertionThreshold: {
        type: PARAMETER_TYPE.INT,
        range: [0, Infinity],
        default: 5,
    },
    gravitation: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 1.0 / 16.0,
    },
    initDummiesPerEdge: {
        type: PARAMETER_TYPE.INT,
        range: [0, Infinity],
        default: 1,
    },
    initialTemperature: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 10.0,
    },
    maxDisturbance: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 0,
    },
    maxDummiesPerEdge: {
        type: PARAMETER_TYPE.INT,
        range: [0, Infinity],
        default: 3,
    },
    minDistCC: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 30.0,
    },
    minimalTemperature: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 1.0,
    },
    numberOfIterations: {
        type: PARAMETER_TYPE.INT,
        range: [0, Infinity],
        default: 30000,
    },
    oscillationAngle: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: Math.PI / 2.0,
    },
    pageRatio: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 1.0,
    },
    postProcessing: {
        type: PARAMETER_TYPE.CATEGORICAL,
        range: ["None", "KeepMultiEdgeBends", "Complete"],
        default: "Complete",
    },
    randomInitialPlacement: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: true,
    },
    repulsionDistance: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 40.0,
    },
    temperatureDecreaseOffset: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, 1],
        default: 0.0,
    },
}

ENTRY_DEFINITION = "NR(int node_num, int link_num, int* source, int* target, double bendNormalizationAngle, double desiredMinEdgeLength, double dummyInsertionThreshold, double gravitation, int initDummiesPerEdge, double initialTemperature, double maxDisturbance, int maxDummiesPerEdge, double minDistCC, double minimalTemperature, int numberOfIterations, double oscillationAngle, double pageRatio, int postProcessing, bool randomInitialPlacement, double repulsionDistance, double temperatureDecreaseOffset)"