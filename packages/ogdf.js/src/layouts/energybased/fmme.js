import { PARAMETER_TYPE } from '../../utils/parameters'
import createLayout from '../creater'

const NAME = 'FMME'
const OUR_PARAMETER_DEFINITIONS = {
    useWorker: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: false
    }
}

const ORIGIN_PARAMETER_DEFINITIONS = {
    maxNumThreads: {
        type: PARAMETER_TYPE.INT,
        range: [0, Infinity],
        default: 1
    },
    multilevelUntilNumNodesAreLess: {
        type: PARAMETER_TYPE.INT,
        range: [0, Infinity],
        default: 10
    }
}

const fmme = createLayout(NAME, OUR_PARAMETER_DEFINITIONS, ORIGIN_PARAMETER_DEFINITIONS, {})

export default fmme
