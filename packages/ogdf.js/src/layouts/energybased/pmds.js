import { PARAMETER_TYPE } from '../../utils/parameters'
import createLayout from '../creater'

const NAME = 'PMDS'
const OUR_PARAMETER_DEFINITION = {
    useWorker: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: false
    }
}

const ORIGIN_PARAMETER_DEFINITION = {
    edgeCosts: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 100
    },
    numberOfPivots: {
        type: PARAMETER_TYPE.INT,
        range: [0, Infinity],
        default: 250
    },
    useEdgeCostsAttribute: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: false
    }
}

// PMDS(int node_num, int link_num, int* source, int* target, double* edgesWeight, double edgeCosts , int numberOfPivots , bool useEdgeCostsAttribute)
const ATTRIBUTES_DEFINITION = {
    node: [],
    link: [
        {
            name: 'edgesWeight',
            mapper: (link) => ('weight' in link ? link.weight : 1),
            type: PARAMETER_TYPE.DOUBLE
        }
    ],
    sequence: ['edgesWeight']
}

const pmds = createLayout(
    NAME,
    OUR_PARAMETER_DEFINITION,
    ORIGIN_PARAMETER_DEFINITION,
    ATTRIBUTES_DEFINITION
)
export default pmds
