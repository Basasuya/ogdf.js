import { PARAMETER_TYPE } from '../../utils/parameters'
import LayoutModule from '../../module/config/Layout'
import MultilevelBuilder from '../../module/config/MultilevelBuilder'
import InitialPlacer from '../../module/config/InitialPlacer'

const NAME = 'MUL'
export const OUTER_PARAMETER_DEFINITION = {
    useWorker: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: false
    }
}

export const ORIGIN_PARAMETER_DEFINITION = {
    layoutType: {
        type: PARAMETER_TYPE.MODULE,
        module: LayoutModule,
        default: LayoutModule.SpringEmbedderGridVariant
    },
    multilevelBuilderType: {
        type: PARAMETER_TYPE.MODULE,
        module: MultilevelBuilder,
        default: MultilevelBuilder.SolarMerger
    },
    placerType: {
        type: PARAMETER_TYPE.MODULE,
        module: InitialPlacer,
        default: InitialPlacer.BarycenterPlacer
    }
}

const pg = createLayout(NAME, OUTER_PARAMETER_DEFINITION, ORIGIN_PARAMETER_DEFINITION, {})
export default pg
