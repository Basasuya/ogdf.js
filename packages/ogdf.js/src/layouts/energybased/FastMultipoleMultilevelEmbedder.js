import { PARAMETER_TYPE } from '../../utils/parameter-type'

export default {
    maxNumThreads: {
        type: PARAMETER_TYPE.INT,
        range: [0, Infinity],
        default: 1
    },
    multilevelUntilNumNodesAreLess: {
        type: PARAMETER_TYPE.INT,
        range: [0, Infinity],
        default: 10
    }
}
