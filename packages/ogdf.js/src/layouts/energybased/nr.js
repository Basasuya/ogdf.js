import { PARAMETER_TYPE } from '../../utils/parameters'
import createLayout from '../creater'

const NAME = 'NR'
export const OUTER_PARAMETER_DEFINITION = {
    useWorker: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: false
    }
}

export const ORIGIN_PARAMETER_DEFINITION = {
    bendNormalizationAngle: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [-Infinity, Infinity],
        default: Math.PI
    },
    desiredMinEdgeLength: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 20.0
    },
    dummyInsertionThreshold: {
        type: PARAMETER_TYPE.INT,
        range: [0, Infinity],
        default: 5
    },
    gravitation: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 1.0 / 16.0
    },
    initDummiesPerEdge: {
        type: PARAMETER_TYPE.INT,
        range: [0, Infinity],
        default: 1
    },
    initialTemperature: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 10.0
    },
    maxDisturbance: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 0
    },
    maxDummiesPerEdge: {
        type: PARAMETER_TYPE.INT,
        range: [0, Infinity],
        default: 3
    },
    minDistCC: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 30.0
    },
    minimalTemperature: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 1.0
    },
    numberOfIterations: {
        type: PARAMETER_TYPE.INT,
        range: [0, Infinity],
        default: 30000
    },
    oscillationAngle: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: Math.PI / 2.0
    },
    pageRatio: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 1.0
    },
    postProcessing: {
        type: PARAMETER_TYPE.CATEGORICAL,
        range: ['None', 'KeepMultiEdgeBends', 'Complete'],
        default: 'Complete'
    },
    randomInitialPlacement: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: true
    },
    repulsionDistance: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 40.0
    },
    temperatureDecreaseOffset: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, 1],
        default: 0.0
    }
}

const nr = createLayout(NAME, OUTER_PARAMETER_DEFINITION, ORIGIN_PARAMETER_DEFINITION, {})
export default nr
