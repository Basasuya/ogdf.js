import createModule from "./module-helper";
import EnergyBased from "../../layouts/energybased"
import Layered from "../../layouts/layered"
import Planarity from "../../layouts/planarity"
import CrossingMinimizationModule from "./CrossingMinimization"
import EmbedderModule from "./Embedder"
import CCLayoutPackModule from "./CCLayoutPack"
import LayoutPlanRepModule from "./LayoutPlanRep"
import GridLayoutPlanRepModule from "./GridLayoutPlanRep"
import HierarchyClusterLayoutModule from "./HierarchyClusterLayout"
import LayeredCrossMinModule from "./LayeredCrossMin"
import HierarchyLayoutModule from "./HierarchyLayout"
import RankingModule from "./Ranking"
import { PARAMETER_TYPE } from "../../utils/parameter-type";
const NAME = "LayoutModule"

const MODULE_DIRECTORY = {
    DavidsonHarelLayout: EnergyBased.dh.ORIGIN_PARAMETER_DEFINITION,
    FMMMLayout: EnergyBased.fm3.ORIGIN_PARAMETER_DEFINITION,
    FastMultipoleEmbedder: EnergyBased.fme.ORIGIN_PARAMETER_DEFINITION,
    FastMultipoleMultilevelEmbedder: EnergyBased.fmme.ORIGIN_PARAMETER_DEFINITION,
    GEMLayout: EnergyBased.gem.ORIGIN_PARAMETER_DEFINITION,
    NodeRespecterLayout: EnergyBased.nr.ORIGIN_PARAMETER_DEFINITION,
    PivotMDS: EnergyBased.pmds.ORIGIN_PARAMETER_DEFINITION,
    SpringEmbedderGridVariant: EnergyBased.segv.ORIGIN_PARAMETER_DEFINITION,
    SpringEmbedderKK: EnergyBased.sekk.ORIGIN_PARAMETER_DEFINITION,
    StressMinimization: EnergyBased.sm.ORIGIN_PARAMETER_DEFINITION,
    TutteLayout: EnergyBased.tut.ORIGIN_PARAMETER_DEFINITION,
    SugiyamaLayout: {
        ...Layered.sugi.ORIGIN_PARAMETER_DEFINITION,
        ...{
            clusterLayoutType: {
                type: PARAMETER_TYPE.MODULE,
                module: HierarchyClusterLayoutModule,
                default: HierarchyClusterLayoutModule.OptimalHierarchyClusterLayout
            },
            crossMinType: {
                type: PARAMETER_TYPE.MODULE,
                module: LayeredCrossMinModule,
                default: LayeredCrossMinModule.BarycenterHeuristic
            },
            layoutType: {
                type: PARAMETER_TYPE.MODULE,
                module: HierarchyLayoutModule,
                default: HierarchyLayoutModule.FastHierarchyLayout
            },
            packerType: {
                type: PARAMETER_TYPE.MODULE,
                module: CCLayoutPackModule,
                default: CCLayoutPackModule.TileToRowsCCPacker
            },
            rankingType: {
                type: PARAMETER_TYPE.MODULE,
                module: RankingModule,
                default: RankingModule.LongestPathRanking
            }
        }
    },
    PlanarizationGridLayout: {
        ...Planarity.pg.ORIGIN_PARAMETER_DEFINITION,
        ...{
            crossMinType: {
                type: PARAMETER_TYPE.MODULE,
                module: CrossingMinimizationModule,
                default: CrossingMinimizationModule.SubgraphPlanarizer
            },
            packerType: {
                type: PARAMETER_TYPE.MODULE,
                module: CCLayoutPackModule,
                default: CCLayoutPackModule.TileToRowsCCPacker
            },
            planarLayouterType: {
                type: PARAMETER_TYPE.MODULE,
                module: GridLayoutPlanRepModule,
                default: GridLayoutPlanRepModule.MixedModelLayout
            }
        }
    },
    PlanarizationLayout: {
        ...Planarity.pl.ORIGIN_PARAMETER_DEFINITION,
        ...{
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
    }
}

const LayoutModule = createModule(NAME, MODULE_DIRECTORY)
export default LayoutModule