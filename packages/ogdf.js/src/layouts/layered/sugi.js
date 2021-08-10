import { PARAMETER_TYPE } from '../../utils/parameters'
import createLayout from '../creater'

const NAME = 'SUGI'
const OUR_PARAMETERS = {
    useWorker: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: false,
    },
}

const ORIGIN_PARAMETERS = {
    alignBaseClasses: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: false,
    },
    alignSiblings: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: false,
    },
    arrangeCCs: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: true,
    },
    fails: {
        type: PARAMETER_TYPE.INT,
        range: [0, Infinity],
        default: 4,
    },
    maxThreads: {
        type: PARAMETER_TYPE.INT,
        range: [0, Infinity],
        default: 1,
    },
    minDistCC: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 20.0,
    },
    pageRatio: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 1.0,
    },
    permuteFirst: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: false,
    },
    runs: {
        type: PARAMETER_TYPE.INT,
        range: [0, Infinity],
        default: 15,
    },
    transpose: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: true,
    },
    clusterLayoutType: {
        type: PARAMETER_TYPE.MODULE,
        module: "HierarchyClusterLayout",
        default: "Optimal",
    },
    crossMinType: {
        type: PARAMETER_TYPE.MODULE,
        module: "LayeredCrossMin",
        default: "BarycenterHeuristic",
    },
    layoutType: {
        type: PARAMETER_TYPE.MODULE,
        module: "HierarchyLayout",
        default: "Fast",
    },
    packerType: {
        type: PARAMETER_TYPE.MODULE,
        module: "CCLayoutPack",
        default: "TileToRows",
    },
    rankingType: {
        type: PARAMETER_TYPE.MODULE,
        module: "Ranking",
        default: "LongestPath",
    }
}

const sugi = createLayout(NAME, OUR_PARAMETERS, ORIGIN_PARAMETERS, {})
export default sugi