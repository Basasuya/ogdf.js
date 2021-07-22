
OUR_PARAMETERS = {
    useWorker: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: false,
    },
}

ORIGIN_PARAMETERS = {
    bboxLeft: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 0.0
    },
    bboxTop: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 0.0
    },
    bboxRight: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 250.0
    },
    bboxBottom: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 250.0
    },
}

ENTRY_DEFINITION = "TUT(int node_num, int link_num, int* source, int* target, double bboxLeft, double bboxTop, double bboxRight, double bboxBottom)"