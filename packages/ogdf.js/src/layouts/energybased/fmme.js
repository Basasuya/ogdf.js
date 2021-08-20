import { PARAMETER_TYPE } from '../../utils/parameters'
import createLayout from '../creater'

const NAME = 'FMME'
const OUR_PARAMETER_DEFINITION = {
    useWorker: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: false
    }
}

const ORIGIN_PARAMETER_DEFINITION = {
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

const fmme = createLayout(NAME, OUR_PARAMETER_DEFINITION, ORIGIN_PARAMETER_DEFINITION, {})

export default fmme
