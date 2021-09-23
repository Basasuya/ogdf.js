import { PARAMETER_TYPE } from '../../utils/parameters'

export default {
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
    }
}

