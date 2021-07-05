
var OUR_PARAMETERS = {
    useWorker: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: false,
    },
}

var ORIGIN_PARAMETERS = {
    edgeCosts: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 100
    },
    numberOfPivots: {
        type: PARAMETER_TYPE.INT,
        range: [0, Infinity],
        default: 250
    },
    useEdgeCostsAttribute: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: false
    }
}

// should keep identical to the parameter order in src/entry/main.cpp => function pmds()

var layout = {
    ORIGIN_PARAMETERS,
    OUR_PARAMETERS,
    C_DEFINITION: "PMDS(int node_num, int link_num, int* source, int* target, double* edgesWeight, double edgeCosts , int numberOfPivots , bool useEdgeCostsAttribute)",
    LINK_ATTRIBUTES: [
        {
            name: "edgesWeight", mapper: link => "weight" in link ? link.weight : 1
        }
    ]
}
