import { PARAMETER_TYPE } from '../../utils/parameters'
import createLayout from '../creater'

const NAME = 'BALLOON'
const OUR_PARAMETERS = {
    useWorker: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: false
    }
}

const ORIGIN_PARAMETERS = {
    evenAngles: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: false
    }
}

const balloon = createLayout(NAME, OUR_PARAMETERS, ORIGIN_PARAMETERS, {})
export default balloon
