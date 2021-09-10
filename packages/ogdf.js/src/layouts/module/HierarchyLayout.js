import createModule from "./module-helper";
import { PARAMETER_TYPE } from "../../utils/parameter-type";
const NAME = "HierarchyLayoutModule"

const MODULE_DIRECTORY = {
    FastHierarchyLayout: {
        fixedLayerDistance: {
            type: PARAMETER_TYPE.BOOL,
            range: [true, false],
            default: false
        },
        layerDistance: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [0, Infinity],
            default: 3.0
        },
        nodeDistance: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [0, Infinity],
            default: 3.0
        }
    },
    FastSimpleHierarchyLayout: {
        layerDistance: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [0, Infinity],
            default: 75
        },
        nodeDistance: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [0, Infinity],
            default: 150
        },
        balanced: {
            type: PARAMETER_TYPE.BOOL,
            range: [true, false],
            default: true
        },
        downward: {
            type: PARAMETER_TYPE.BOOL,
            range: [true, false],
            default: true
        },
        leftToRight: {
            type: PARAMETER_TYPE.BOOL,
            range: [true, false],
            default: true
        }
    },
    OptimalHierarchyLayout: {
        fixedLayerDistance: {
            type: PARAMETER_TYPE.BOOL,
            range: [true, false],
            default: false
        },
        layerDistance: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [0, Infinity],
            default: 3.0
        },
        nodeDistance: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [0, Infinity],
            default: 3.0
        },
        weightBalancing: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [0, Infinity],
            default: 0.1
        },
        weightSegments: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [0, Infinity],
            default: 2.0
        }
    }
}

const HierarchyLayoutModule = createModule(NAME, MODULE_DIRECTORY)
export default HierarchyLayoutModule