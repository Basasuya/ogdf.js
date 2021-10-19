import createModule from '../module-helper'
import { PARAMETER_TYPE } from '../../utils/parameter-type'
const NAME = 'HierarchyClusterLayoutModule'

const MODULE_DIRECTORY = {
    OptimalHierarchyClusterLayout: {
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
        weightClusters: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [0, Infinity],
            default: 0.05
        },
        weightSegments: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [0, Infinity],
            default: 2.0
        }
    }
}

const HierarchyClusterLayoutModule = createModule(NAME, MODULE_DIRECTORY)
export default HierarchyClusterLayoutModule
