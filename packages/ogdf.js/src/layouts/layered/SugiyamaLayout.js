import { PARAMETER_TYPE } from '../../utils/parameters'
import HierarchyClusterLayoutModule from '../../module/config/HierarchyClusterLayout'
import LayeredCrossMinModule from '../../module/config/LayeredCrossMin'
import HierarchyLayoutModule from '../../module/config/HierarchyLayout'
import CCLayoutPackModule from '../../module/config/CCLayoutPack'
import RankingModule from '../../module/config/Ranking'

export default {
    alignBaseClasses: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: false
    },
    alignSiblings: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: false
    },
    arrangeCCs: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: true
    },
    fails: {
        type: PARAMETER_TYPE.INT,
        range: [0, Infinity],
        default: 4
    },
    maxThreads: {
        type: PARAMETER_TYPE.INT,
        range: [0, Infinity],
        default: 1
    },
    minDistCC: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 20.0
    },
    pageRatio: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 1.0
    },
    permuteFirst: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: false
    },
    runs: {
        type: PARAMETER_TYPE.INT,
        range: [0, Infinity],
        default: 15
    },
    transpose: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: true
    },
    clusterLayout: {
        type: PARAMETER_TYPE.MODULE,
        module: HierarchyClusterLayoutModule,
        default: HierarchyClusterLayoutModule.OptimalHierarchyClusterLayout
    },
    crossMin: {
        type: PARAMETER_TYPE.MODULE,
        module: LayeredCrossMinModule,
        default: LayeredCrossMinModule.BarycenterHeuristic
    },
    layout: {
        type: PARAMETER_TYPE.MODULE,
        module: HierarchyLayoutModule,
        default: HierarchyLayoutModule.FastHierarchyLayout
    },
    packer: {
        type: PARAMETER_TYPE.MODULE,
        module: CCLayoutPackModule,
        default: CCLayoutPackModule.TileToRowsCCPacker
    },
    ranking: {
        type: PARAMETER_TYPE.MODULE,
        module: RankingModule,
        default: RankingModule.LongestPathRanking
    }
}
