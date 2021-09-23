import EdgeInsertionModule from "./EdgeInsertion";
import createModule from "../module-helper";
import PlanarSubgraphModule from "./PlanarSubgraph";
import { PARAMETER_TYPE } from "../../utils/parameter-type";

const NAME = "CrossingMinimizationModule"

const MODULE_DIRECTORY = {
    SubgraphPlanarizer: {
        globalInternalLibraryLogLevel: {
            type: PARAMETER_TYPE.CATEGORICAL,
            range: ['Minor', 'Medium', 'Default', 'High', 'Alarm', 'Force'],
            default: 'Alarm'
        },
        globalLogLevel: {
            type: PARAMETER_TYPE.CATEGORICAL,
            range: ['Minor', 'Medium', 'Default', 'High', 'Alarm', 'Force'],
            default: 'Alarm'
        },
        globalMinimumLogLevel: {
            type: PARAMETER_TYPE.CATEGORICAL,
            range: ['Minor', 'Medium', 'Default', 'High', 'Alarm', 'Force'],
            default: 'Medium'
        },
        globalStatisticMode: {
            type: PARAMETER_TYPE.BOOL,
            range: [true, false],
            default: false
        },
        localLogLevel: {
            type: PARAMETER_TYPE.CATEGORICAL,
            range: ['Minor', 'Medium', 'Default', 'High', 'Alarm', 'Force'],
            default: 'Default'
        },
        localLogMode: {
            type: PARAMETER_TYPE.CATEGORICAL,
            range: ['Global', 'GlobalLog', 'Log', 'Statistic'],
            default: 'Global'
        },
        maxThreads: {
            type: PARAMETER_TYPE.INT,
            range: [0, Infinity],
            default: 1
        },
        permutations: {
            type: PARAMETER_TYPE.INT,
            range: [0, Infinity],
            default: 1
        },
        timeout: {
            type: PARAMETER_TYPE.BOOL,
            range: [true, false],
            default: true
        },
        timeLimit: {
            type: PARAMETER_TYPE.INT,
            range: [-Infinity, Infinity],
            default: 1000
            // default: -1 if timeLimit < 0 will be unstoppable
        },
        inserter: {
            type: PARAMETER_TYPE.MODULE,
            module: EdgeInsertionModule,
            default: EdgeInsertionModule.VariableEmbeddingInserter
        },
        subgraph: {
            type: PARAMETER_TYPE.MODULE,
            module: PlanarSubgraphModule,
            default: PlanarSubgraphModule.PlanarSubgraphFast
        }
    }
}

const CrossingMinimizationModule = createModule(NAME, MODULE_DIRECTORY)
export default CrossingMinimizationModule