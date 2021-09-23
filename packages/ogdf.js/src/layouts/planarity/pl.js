import { PARAMETER_TYPE } from '../../utils/parameters'
import CrossingMinimizationModule from '../../module/config/CrossingMinimization'
import CCLayoutPackModule from '../../module/config/CCLayoutPack'
import LayoutPlanRepModule from '../../module/config/LayoutPlanRep'
import EmbedderModule from '../../module/config/Embedder'

export default {
    minCliqueSize: {
        type: PARAMETER_TYPE.INT,
        range: [0, Infinity],
        default: 10
    },
    pageRatio: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 1.0
    },
    crossMinType: {
        type: PARAMETER_TYPE.MODULE,
        module: CrossingMinimizationModule,
        default: CrossingMinimizationModule.SubgraphPlanarizer
    },
    embedderType: {
        type: PARAMETER_TYPE.MODULE,
        module: EmbedderModule,
        default: EmbedderModule.SimpleEmbedder
    },
    packerType: {
        type: PARAMETER_TYPE.MODULE,
        module: CCLayoutPackModule,
        default: CCLayoutPackModule.TileToRowsCCPacker
    },
    planarLayouterType: {
        type: PARAMETER_TYPE.MODULE,
        module: LayoutPlanRepModule,
        default: LayoutPlanRepModule.OrthoLayout
    }
}

