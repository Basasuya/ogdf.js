import createModule from '../module-helper'
import AcyclicSubgraphModule from './AcyclicSubgraph'
import { PARAMETER_TYPE } from '../../utils/parameter-type'
const NAME = 'RankingModule'

const MODULE_DIRECTORY = {
    CoffmanGrahamRanking: {
        width: {
            type: PARAMETER_TYPE.INT,
            range: [0, Infinity],
            default: 3
        },
        subgraphType: {
            type: PARAMETER_TYPE.MODULE,
            module: AcyclicSubgraphModule,
            default: AcyclicSubgraphModule.DfsAcyclicSubgraph
        }
    },
    LongestPathRanking: {
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
        optimizeEdgeLength: {
            type: PARAMETER_TYPE.BOOL,
            range: [true, false],
            default: true
        },
        separateDeg0Layer: {
            type: PARAMETER_TYPE.BOOL,
            range: [true, false],
            default: true
        },
        separateMultiEdges: {
            type: PARAMETER_TYPE.BOOL,
            range: [true, false],
            default: true
        },
        subgraphType: {
            type: PARAMETER_TYPE.MODULE,
            module: AcyclicSubgraphModule,
            default: AcyclicSubgraphModule.DfsAcyclicSubgraph
        }
    },
    OptimalRanking: {
        separateMultiEdges: {
            type: PARAMETER_TYPE.BOOL,
            range: [true, false],
            default: true
        },
        subgraphType: {
            type: PARAMETER_TYPE.MODULE,
            module: AcyclicSubgraphModule,
            default: AcyclicSubgraphModule.DfsAcyclicSubgraph
        }
    }
}

const RankingModule = createModule(NAME, MODULE_DIRECTORY)
export default RankingModule
