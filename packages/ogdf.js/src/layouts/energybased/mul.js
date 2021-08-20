import { PARAMETER_TYPE } from '../../utils/parameters'
import createLayout from '../creater'

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
        module: 'Layout',
        default: 'SpringEmbedderGridVariant'
    },
    multilevelBuilderType: {
        type: PARAMETER_TYPE.MODULE,
        module: 'MultilevelBuilder',
        default: 'SolarMerger'
    },
    placerType: {
        type: PARAMETER_TYPE.MODULE,
        module: 'InitialPlacer',
        default: 'BarycenterPlacer'
    }
}

const pg = createLayout(NAME, OUTER_PARAMETER_DEFINITION, ORIGIN_PARAMETER_DEFINITION, {})
export default pg
