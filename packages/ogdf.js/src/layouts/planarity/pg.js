import { PARAMETER_TYPE } from '../../utils/parameters'
import createLayout from '../creater'

const NAME = 'PG'
export const OUTER_PARAMETER_DEFINITION = {
    useWorker: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: false
    }
}

export const ORIGIN_PARAMETER_DEFINITION = {
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
    crossMinType: {
        type: PARAMETER_TYPE.MODULE,
        module: 'CrossingMinimization',
        default: 'SubgraphPlanarizer'
    },
    packerType: {
        type: PARAMETER_TYPE.MODULE,
        module: 'CCLayoutPack',
        default: 'TileToRows'
    },
    planarLayouterType: {
        type: PARAMETER_TYPE.MODULE,
        module: 'GridLayoutPlanRep',
        default: 'Mixed'
    }
}

const pg = createLayout(NAME, OUTER_PARAMETER_DEFINITION, ORIGIN_PARAMETER_DEFINITION, {})
export default pg
