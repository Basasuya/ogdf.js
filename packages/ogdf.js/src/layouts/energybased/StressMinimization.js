import { PARAMETER_TYPE } from '../../utils/parameter-type'

export default {
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
