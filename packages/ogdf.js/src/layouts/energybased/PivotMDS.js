import { PARAMETER_TYPE } from '../../utils/parameter-type'

export default {
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
