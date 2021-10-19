import { PARAMETER_TYPE } from '../../utils/parameters'

export default {
    defaultEdgeLength: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 1.0
    },
    defaultNodeSize: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 1.0
    },
    multipolePrec: {
        type: PARAMETER_TYPE.INT,
        range: [0, Infinity],
        default: 5
    },
    numberOfThreads: {
        type: PARAMETER_TYPE.INT,
        range: [0, Infinity],
        default: 0
    },
    numIterations: {
        type: PARAMETER_TYPE.INT,
        range: [0, Infinity],
        default: 100
    },
    randomize: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: true
    }
}
