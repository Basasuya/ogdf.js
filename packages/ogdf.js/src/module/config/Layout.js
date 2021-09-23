import createModule from "../module-helper";
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
    DavidsonHarelLayout: EnergyBased.dh,
    FMMMLayout: EnergyBased.fm3,
    FastMultipoleEmbedder: EnergyBased.fme,
    FastMultipoleMultilevelEmbedder: EnergyBased.fmme,
    GEMLayout: EnergyBased.gem,
    NodeRespecterLayout: EnergyBased.nr,
    PivotMDS: EnergyBased.pmds,
    SpringEmbedderGridVariant: EnergyBased.segv,
    SpringEmbedderKK: EnergyBased.sekk,
    StressMinimization: EnergyBased.sm,
    TutteLayout: EnergyBased.tut,
    SugiyamaLayout: Layered.sugi,
    PlanarizationGridLayout: Planarity.pg,
    PlanarizationLayout: Planarity.pl
}

const LayoutModule = createModule(NAME, MODULE_DIRECTORY)
export default LayoutModule