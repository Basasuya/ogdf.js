import createModule from '../module-helper'
import { PARAMETER_TYPE } from '../../utils/parameter-type'
const NAME = 'MultilevelBuilder'

const MODULE_DIRECTORY = {
    EdgeCoverMerger: {
        edgeLengthAdjustment: {
            type: PARAMETER_TYPE.INT,
            range: [0, Infinity],
            default: 0
        },
        factor: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [0, Infinity],
            default: 2.0
        }
    },
    IndependentSetMerger: {
        edgeLengthAdjustment: {
            type: PARAMETER_TYPE.INT,
            range: [0, Infinity],
            default: 0
        },
        searchDepthBase: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [0, Infinity],
            default: 2.0
        }
    },
    LocalBiconnectedMerger: {
        edgeLengthAdjustment: {
            type: PARAMETER_TYPE.INT,
            range: [0, Infinity],
            default: 0
        },
        factor: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [0, Infinity],
            default: 2.0
        }
    },
    MatchingMerger: {
        edgeLengthAdjustment: {
            type: PARAMETER_TYPE.INT,
            range: [0, Infinity],
            default: 0
        },
        selectByNodeMass: {
            type: PARAMETER_TYPE.BOOL,
            range: [true, false],
            default: false
        }
    },
    RandomMerger: {
        edgeLengthAdjustment: {
            type: PARAMETER_TYPE.INT,
            range: [0, Infinity],
            default: 0
        },
        factor: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [0, Infinity],
            default: 2.0
        }
    },
    SolarMerger: {
        edgeLengthAdjustment: {
            type: PARAMETER_TYPE.INT,
            range: [0, Infinity],
            default: 0
        }
    }
}

const MultilevelBuilder = createModule(NAME, MODULE_DIRECTORY)
export default MultilevelBuilder
