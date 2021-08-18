import { PARAMETER_TYPE } from '../../utils/parameters'
import createLayout from '../creater'

const NAME = 'MUL'
const OUR_PARAMETER_DEFINITIONS = {
    useWorker: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: false
    }
}

const ORIGIN_PARAMETER_DEFINITIONS = {
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

const pg = createLayout(NAME, OUR_PARAMETER_DEFINITIONS, ORIGIN_PARAMETER_DEFINITIONS, {})
export default pg
