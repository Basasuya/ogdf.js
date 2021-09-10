import createModule from "./module-helper";
import { PARAMETER_TYPE } from "../../utils/parameter-type";
const NAME = "InitialPlacer"

const MODULE_DIRECTORY = {
    BarycenterPlacer: {
        randomOffset: {
            type: PARAMETER_TYPE.BOOL,
            range: [true, false],
            default: true
        },
        weightedPositionPriority: {
            type: PARAMETER_TYPE.BOOL,
            range: [true, false],
            default: false
        }
    },
    CirclePlacer: {
        circleSize: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [0, Infinity],
            default: 0.0
        },
        nodeSelection: {
            type: PARAMETER_TYPE.CATEGORICAL,
            range: ['New', 'Old', 'All'],
            default: 'New'
        },
        radiusFixed: {
            type: PARAMETER_TYPE.BOOL,
            range: [true, false],
            default: false
        },
        randomOffset: {
            type: PARAMETER_TYPE.BOOL,
            range: [true, false],
            default: true
        }
    },
    MedianPlacer: {
        randomOffset: {
            type: PARAMETER_TYPE.BOOL,
            range: [true, false],
            default: true
        }
    },
    RandomPlacer: {
        randomOffset: {
            type: PARAMETER_TYPE.BOOL,
            range: [true, false],
            default: true
        },
        circleSize: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [0, Infinity],
            default: 0.0
        }
    },
    SolarPlacer: {
        randomOffset: {
            type: PARAMETER_TYPE.BOOL,
            range: [true, false],
            default: true
        }
    },
    ZeroPlacer: {
        randomRange: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [0, Infinity],
            default: 1.0
        },
        randomOffset: {
            type: PARAMETER_TYPE.BOOL,
            range: [true, false],
            default: true
        }
    }
}

const InitialPlacer = createModule(NAME, MODULE_DIRECTORY)
export default InitialPlacer