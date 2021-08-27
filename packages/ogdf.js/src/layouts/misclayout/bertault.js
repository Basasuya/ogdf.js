import { PARAMETER_TYPE } from '../../utils/parameters'
import createLayout from '../creater'

const NAME = 'BERTAULT'
const OUR_PARAMETERS = {
    useWorker: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: false
    }
}

const ORIGIN_PARAMETERS = {
    impred: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: false
    }
}

const ATTRIBUTES = {
    node: [
        {
            name: 'nodesX',
            mapper: (node) => ('x' in node ? node.x : 0),
            type: PARAMETER_TYPE.DOUBLE
        },
        {
            name: 'nodesY',
            mapper: (node) => ('y' in node ? node.y : 0),
            type: PARAMETER_TYPE.DOUBLE
        }
    ],
    link: [],
    sequence: ['nodesX', 'nodesY']
}

const bertault = createLayout(NAME, OUR_PARAMETERS, ORIGIN_PARAMETERS, ATTRIBUTES)
export default bertault
