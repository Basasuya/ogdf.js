import { PARAMETER_TYPE } from '../../utils/parameter-type'

export default {
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
