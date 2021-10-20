import { PARAMETER_TYPE } from '../../utils/parameter-type'

export default {
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
