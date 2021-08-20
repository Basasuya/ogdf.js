import { PARAMETER_TYPE } from '../../utils/parameters'
import createLayout from '../creater'

const NAME = 'SM'

const OUR_PARAMETER_DEFINITION = {
    useWorker: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: false
    }
}

const ORIGIN_PARAMETER_DEFINITION = {
    terminationCriterion: {
        type: PARAMETER_TYPE.CATEGORICAL,
        range: ['None', 'PositionDifference', 'Stress'],
        default: 'None'
    },
    fixXCoords: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: false
    },
    fixYCoords: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: false
    },
    fixZCoords: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: false
    },
    hasInitialLayout: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: false
    },
    layoutComponentsSeparately: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: false
    },
    edgeCosts: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 100
    },
    numberOfIterations: {
        type: PARAMETER_TYPE.INT,
        range: [0, Infinity],
        default: 200
    },
    useEdgeCostsAttribute: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: false
    }
}

// double* edgesWeight, double* nodesX, double* nodesY,
const ATTRIBUTES_DEFINITION = {
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
    link: [
        {
            name: 'edgesWeight',
            mapper: (link) => ('weight' in link ? link.weight : 1),
            type: PARAMETER_TYPE.DOUBLE
        }
    ],
    sequence: ['edgesWeight', 'nodesX', 'nodesY']
    // sequence: ['nodesX', 'nodesY']
}

const sm = createLayout(
    NAME,
    OUR_PARAMETER_DEFINITION,
    ORIGIN_PARAMETER_DEFINITION,
    ATTRIBUTES_DEFINITION
)
export default sm
