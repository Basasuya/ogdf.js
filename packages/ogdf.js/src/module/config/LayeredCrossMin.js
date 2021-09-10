import createModule from "./module-helper";
import { PARAMETER_TYPE } from "../../utils/parameter-type";
const NAME = "LayeredCrossMinModule"

const MODULE_DIRECTORY = {
    BarycenterHeuristic: {},
    GlobalSifting: {
        nRepeats: {
            type: PARAMETER_TYPE.INT,
            range: [0, Infinity],
            default: 10
        }
    },
    GreedyInsertHeuristic: {},
    GreedySwitchHeuristic: {},
    GridSifting: {
        verticalStepsBound: {
            type: PARAMETER_TYPE.INT,
            range: [0, Infinity],
            default: 10
        }
    },
    MedianHeuristic: {},
    SiftingHeuristic: {},
    SplitHeuristic: {}
}

const LayeredCrossMinModule = createModule(NAME, MODULE_DIRECTORY)
export default LayeredCrossMinModule