import { PARAMETER_TYPE } from '../../utils/parameters'
import createLayout from '../creater'

const NAME = 'CIRCULAR'
const OUR_PARAMETERS = {
    useWorker: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: false
    }
}

//double minDistCC, double minDistCircle, double minDistLevel, double minDistSibling, double pageRatio
const ORIGIN_PARAMETERS = {
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
    },
}

const circular = createLayout(NAME, OUR_PARAMETERS, ORIGIN_PARAMETERS, {})
export default circular
