import { PARAMETER_TYPE } from '../../utils/parameters'
import createLayout from '../creater'

const NAME = 'GEM'
const OUR_PARAMETER_DEFINITIONS = {
    useWorker: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: false
    }
}

const ORIGIN_PARAMETER_DEFINITIONS = {
    attractionFormula: {
        type: PARAMETER_TYPE.INT,
        range: [0, Infinity],
        default: 1
    },
    desiredLength: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 5
    },
    gravitationalConstant: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 1 / 16
    },
    initialTemperature: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 10
    },
    maximalDisturbance: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 0
    },
    minDistCC: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 20
    },
    minimalTemperature: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 0.005
    },
    numberOfRounds: {
        type: PARAMETER_TYPE.INT,
        range: [0, Infinity],
        default: 20000
    },
    oscillationAngle: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: Math.PI / 2
    },
    oscillationSensitivity: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 0.3
    },
    pageRatio: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 1
    },
    rotationAngle: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: Math.PI / 3
    },
    rotationSensitivity: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 0.001
    }
}

// double* nodesX, double* nodesY
const ATTRIBUTES_DEFINITIONS = {
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

const gem = createLayout(
    NAME,
    OUR_PARAMETER_DEFINITIONS,
    ORIGIN_PARAMETER_DEFINITIONS,
    ATTRIBUTES_DEFINITIONS
)
export default gem
