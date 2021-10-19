import { PARAMETER_TYPE } from '../../utils/parameters'
import CrossingMinimizationModule from '../../module/config/CrossingMinimization'
import CCLayoutPackModule from '../../module/config/CCLayoutPack'
import GridLayoutPlanRepModule from '../../module/config/GridLayoutPlanRep'

export default {
    pageRatio: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 1.0
    },
    separation: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 20.0
    },
    crossMin: {
        type: PARAMETER_TYPE.MODULE,
        module: CrossingMinimizationModule,
        default: CrossingMinimizationModule.SubgraphPlanarizer
    },
    packer: {
        type: PARAMETER_TYPE.MODULE,
        module: CCLayoutPackModule,
        default: CCLayoutPackModule.TileToRowsCCPacker
    },
    planarLayouter: {
        type: PARAMETER_TYPE.MODULE,
        module: GridLayoutPlanRepModule,
        default: GridLayoutPlanRepModule.MixedModelLayout
    }
}
