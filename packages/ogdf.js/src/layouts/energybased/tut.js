import { PARAMETER_TYPE } from '../../utils/parameters'
import createLayout from '../creater'

const NAME = 'TUT'
const OUR_PARAMETERS = {
    useWorker: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: false,
    },
}

const ORIGIN_PARAMETERS = {
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

const tut = createLayout(NAME, OUR_PARAMETERS, ORIGIN_PARAMETERS, {})
export default tut