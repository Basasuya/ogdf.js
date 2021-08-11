import { PARAMETER_TYPE } from '../../utils/parameters'
import createLayout from '../creater'

const NAME = 'FMME'
const OUR_PARAMETERS = {
    useWorker: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: false
    }
}

const ORIGIN_PARAMETERS = {
    maxNumThreads: {
        type: PARAMETER_TYPE.INT,
        range: [0, Infinity],
        default: 1
    },
    multilevelUntilNumNodesAreLess: {
        type: PARAMETER_TYPE.INT,
        range: [0, Infinity],
        default: 10
    },
}

const fmme = createLayout(NAME, OUR_PARAMETERS, ORIGIN_PARAMETERS, {})

export default fmme
