import { PARAMETER_TYPE } from '../../utils/parameters'

export default {
    computeMaxIterations: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: true
    },
    desLength: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [-Infinity, Infinity],
        default: 0.0
    },
    globalIterationFactor: {
        type: PARAMETER_TYPE.INT,
        range: [0, Infinity],
        default: 16
    },
    maxGlobalIterations: {
        type: PARAMETER_TYPE.INT,
        range: [0, Infinity],
        default: 2147483647
    },
    maxLocalIterations: {
        type: PARAMETER_TYPE.INT,
        range: [0, Infinity],
        default: 2147483647
    },
    stopTolerance: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 0.001
    },
    useLayout: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: true
    },
    zeroLength: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [-Infinity, Infinity],
        default: -1.0
    }
}
