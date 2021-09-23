import createModule from "../module-helper";
import { PARAMETER_TYPE } from "../../utils/parameter-type";

const NAME = "EdgeInsertionModule"

const MODULE_DIRECTORY = {
    FixedEmbeddingInserter: {
        keepEmbedding: {
            type: PARAMETER_TYPE.BOOL,
            range: [true, false],
            default: false
        },
        percentMostCrossed: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [-Infinity, Infinity],
            default: 25
        },
        removeReinsert: {
            type: PARAMETER_TYPE.CATEGORICAL,
            range: ['None', 'Inserted', 'MostCrossed', 'All', 'Incremental', 'IncInserted'],
            default: 'None'
        },
        timeLimit: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [-Infinity, Infinity],
            default: 1000
            // default: -1 if timeLimit < 0 will be unstoppable
        }
    },
    MultiEdgeApproxInserter: {
        percentMostCrossedFix: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [-Infinity, Infinity],
            default: 25
        },
        percentMostCrossedVar: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [-Infinity, Infinity],
            default: 25
        },
        removeReinsertFix: {
            type: PARAMETER_TYPE.CATEGORICAL,
            range: ['None', 'Inserted', 'MostCrossed', 'All', 'Incremental', 'IncInserted'],
            default: 'None'
        },
        removeReinsertVar: {
            type: PARAMETER_TYPE.CATEGORICAL,
            range: ['None', 'Inserted', 'MostCrossed', 'All', 'Incremental', 'IncInserted'],
            default: 'None'
        },
        statistics: {
            type: PARAMETER_TYPE.BOOL,
            range: [true, false],
            default: false
        },
        timeLimit: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [-Infinity, Infinity],
            default: 1000
            // default: -1 if timeLimit < 0 will be unstoppable
        }
    },
    VariableEmbeddingInserter: {
        percentMostCrossed: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [-Infinity, Infinity],
            default: 25
        },
        removeReinsert: {
            type: PARAMETER_TYPE.CATEGORICAL,
            range: ['None', 'Inserted', 'MostCrossed', 'All', 'Incremental', 'IncInserted'],
            default: 'None'
        },
        timeLimit: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [-Infinity, Infinity],
            default: 1000
            // default: -1 if timeLimit < 0 will be unstoppable
        }
    }
}

const EdgeInsertionModule = createModule(NAME, MODULE_DIRECTORY)
export default EdgeInsertionModule