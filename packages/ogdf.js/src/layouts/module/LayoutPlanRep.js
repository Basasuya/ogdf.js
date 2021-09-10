import createModule from "./module-helper";
import { PARAMETER_TYPE } from "../../utils/parameter-type";
const NAME = "LayoutPlanRepModule"

const MODULE_DIRECTORY = {
    OrthoLayout: {
        bendBound: {
            type: PARAMETER_TYPE.INT,
            range: [0, Infinity],
            default: 2
        },
        cOverhang: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [0, Infinity],
            default: 0.2
        },
        margin: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [0, Infinity],
            default: 20.0
        },
        progressive: {
            type: PARAMETER_TYPE.BOOL,
            range: [true, false],
            default: true
        },
        scaling: {
            type: PARAMETER_TYPE.BOOL,
            range: [true, false],
            default: true
        },
        separation: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [0, Infinity],
            default: 20.0
        }
    }
}

const LayoutPlanRepModule = createModule(NAME, MODULE_DIRECTORY)
export default LayoutPlanRepModule