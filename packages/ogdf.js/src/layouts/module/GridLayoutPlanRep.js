import createModule from "./module-helper";
import AugmentationModule from './Augmentation'
import MixedModelCrossingsBeautifier from './MixedModelCrossingsBeautifier'
import Embedder from './Embedder'
import ShellingOrderModule from "./ShellingOrder";
import { PARAMETER_TYPE } from "../../utils/parameter-type";

const NAME = "GridLayoutPlanRepModule"

const MODULE_DIRECTORY = {
    MixedModelLayout: {
        separation: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [0, Infinity],
            default: 20.0
        },
        augmenter: {
            type: PARAMETER_TYPE.MODULE,
            module: AugmentationModule,
            default: AugmentationModule.PlanarAugmentation
        },
        crossingsBeautifier: {
            type: PARAMETER_TYPE.MODULE,
            module: MixedModelCrossingsBeautifier,
            default: MixedModelCrossingsBeautifier.MMDummyCrossingsBeautifier
        },
        embedder: {
            type: PARAMETER_TYPE.MODULE,
            module: Embedder,
            default: Embedder.SimpleEmbedder
        },
        shellingOrder: {
            type: PARAMETER_TYPE.MODULE,
            module: ShellingOrderModule,
            default: ShellingOrderModule.BiconnectedShellingOrder
        }
    }
}
const GridLayoutPlanRepModule = createModule(NAME, MODULE_DIRECTORY)
export default GridLayoutPlanRepModule