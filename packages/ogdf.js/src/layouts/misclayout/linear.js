import { PARAMETER_TYPE } from '../../utils/parameters'
import createLayout from '../creater'

const NAME = 'LINEAR'
const OUR_PARAMETERS = {
    useWorker: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: false
    }
}

const ORIGIN_PARAMETERS = {
    outWidth: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 100
    },
    customOrder: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: false
    }
}

const linear = createLayout(NAME, OUR_PARAMETERS, ORIGIN_PARAMETERS, {})
export default linear
