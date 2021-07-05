
// should keep identical to the parameter order in src/entry/main.cpp => function sm()

var layout = {
    OUR_PARAMETERS: {
        useWorker: {
            type: PARAMETER_TYPE.BOOL,
            range: [true, false],
            default: false,
        },
    },
    ORIGIN_PARAMETERS: {
        terminationCriterion: {
            type: PARAMETER_TYPE.CATEGORICAL,
            range: ["None", "PositionDifference", "Stress"],
            default: "None"
        },
        fixXCoords: {
            type: PARAMETER_TYPE.BOOL,
            range: [true, false],
            default: false
        },
        fixYCoords: {
            type: PARAMETER_TYPE.BOOL,
            range: [true, false],
            default: false
        },
        fixZCoords: {
            type: PARAMETER_TYPE.BOOL,
            range: [true, false],
            default: false
        },
        hasInitialLayout: {
            type: PARAMETER_TYPE.BOOL,
            range: [true, false],
            default: false
        },
        layoutComponentsSeparately: {
            type: PARAMETER_TYPE.BOOL,
            range: [true, false],
            default: false
        },
        edgeCosts: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [0, Infinity],
            default: 100
        },
        numberOfIterations: {
            type: PARAMETER_TYPE.INT,
            range: [0, Infinity],
            default: 200
        },
        useEdgeCostsAttribute: {
            type: PARAMETER_TYPE.BOOL,
            range: [true, false],
            default: false
        }
    },
    C_DEFINITION: "SM(int node_num, int link_num, int* source, int* target, double* edgesWeight, double* nodesX, double* nodesY, int terminationCriterion, bool fixXCoords, bool fixYCoords, bool fixZCoords, bool hasInitialLayout, bool layoutComponentsSeparately, double edgeCosts, int numberOfIterations, bool useEdgeCostsAttribute)",
    LINK_ATTRIBUTES: [
        {
            name: "edgesWeight",
            mapper: link => "weight" in link ? link.weight : 1
        }
    ],
    NODE_ATTRIBUTES: [
        {
            name: "nodesX",
            mapper: node => node.x
        },
        {
            name: "nodesY",
            mapper: node => node.y
        }
    ]
}
