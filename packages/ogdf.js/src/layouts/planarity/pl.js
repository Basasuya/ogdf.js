import { PARAMETER_TYPE } from '../../utils/parameters'
import createLayout from '../creater'

const NAME = 'PL'
export const OUTER_PARAMETER_DEFINITION = {
    useWorker: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: false
    }
}

export const ORIGIN_PARAMETER_DEFINITION = {
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
        module: 'CrossingMinimization',
        default: 'SubgraphPlanarizer'
    },
    embedderType: {
        type: PARAMETER_TYPE.MODULE,
        module: 'Embedder',
        default: 'Simple'
    },
    packerType: {
        type: PARAMETER_TYPE.MODULE,
        module: 'CCLayoutPack',
        default: 'TileToRows'
    },
    planarLayouterType: {
        type: PARAMETER_TYPE.MODULE,
        module: 'LayoutPlanRep',
        default: 'Ortho'
    }
}

const pl = createLayout(NAME, OUTER_PARAMETER_DEFINITION, ORIGIN_PARAMETER_DEFINITION, {})
export default pl
