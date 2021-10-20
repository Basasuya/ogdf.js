import createModule from '../module-helper'
import EnergyBased from '../../layouts/energybased'
import Layered from '../../layouts/layered'
import Planarity from '../../layouts/planarity'
const NAME = 'LayoutModule'

const MODULE_DIRECTORY = {
    DavidsonHarelLayout: EnergyBased.DavidsonHarelLayout,
    FMMMLayout: EnergyBased.FMMMLayout,
    FastMultipoleEmbedder: EnergyBased.FastMultipoleEmbedder,
    FastMultipoleMultilevelEmbedder: EnergyBased.FastMultipoleMultilevelEmbedder,
    GEMLayout: EnergyBased.GEMLayout,
    NodeRespecterLayout: EnergyBased.NodeRespecterLayout,
    PivotMDS: EnergyBased.PivotMDS,
    SpringEmbedderGridVariant: EnergyBased.SpringEmbedderGridVariant,
    SpringEmbedderKK: EnergyBased.SpringEmbedderKK,
    StressMinimization: EnergyBased.StressMinimization,
    TutteLayout: EnergyBased.TutteLayout,
    SugiyamaLayout: Layered.SugiyamaLayout,
    PlanarizationGridLayout: Planarity.PlanarizationGridLayout,
    PlanarizationLayout: Planarity.PlanarizationLayout
}

const LayoutModule = createModule(NAME, MODULE_DIRECTORY)
export default LayoutModule
