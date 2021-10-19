import { PARAMETER_TYPE } from '../../utils/parameters'

//double minDistCC, double minDistCircle, double minDistLevel, double minDistSibling, double pageRatio
export default {
    minDistCC: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 20.0
    },
    minDistCircle: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 20.0
    },
    minDistLevel: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 20.0
    },
    minDistSibling: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 10.0
    },
    pageRatio: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 1.0
    }
}
