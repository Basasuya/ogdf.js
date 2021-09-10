import createModule from "./module-helper";
import { PARAMETER_TYPE } from "../../utils/parameter-type";
const NAME = "PlanarSubgraphModule"

const MODULE_DIRECTORY = {
    MaximumPlanarSubgraph: {
        maxThreads: {
            type: PARAMETER_TYPE.INT,
            range: [0, Infinity],
            default: 1
        },
        timeLimit: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [-Infinity, Infinity],
            default: 1000
            // default: -1 if timeLimit < 0 will be unstoppable
        }
    },
    PlanarSubgraphBoyerMyrvold: {
        maxThreads: {
            type: PARAMETER_TYPE.INT,
            range: [0, Infinity],
            default: 1
        },
        timeLimit: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [-Infinity, Infinity],
            default: 1000
            // default: -1 if timeLimit < 0 will be unstoppable
        },
        runs: {
            type: PARAMETER_TYPE.INT,
            range: [0, Infinity],
            default: 10
        },
        randomness: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [-Infinity, Infinity],
            default: 0
        }
    },
    PlanarSubgraphCactus: {
        maxThreads: {
            type: PARAMETER_TYPE.INT,
            range: [0, Infinity],
            default: 1
        },
        timeLimit: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [-Infinity, Infinity],
            default: 1000
            // default: -1 if timeLimit < 0 will be unstoppable
        }
    },
    PlanarSubgraphEmpty: {
        maxThreads: {
            type: PARAMETER_TYPE.INT,
            range: [0, Infinity],
            default: 1
        },
        timeLimit: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [-Infinity, Infinity],
            default: 1000
            // default: -1 if timeLimit < 0 will be unstoppable
        }
    },
    PlanarSubgraphFast: {
        maxThreads: {
            type: PARAMETER_TYPE.INT,
            range: [0, Infinity],
            default: 1
        },
        timeLimit: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [-Infinity, Infinity],
            default: 1000
            // default: -1 if timeLimit < 0 will be unstoppable
        },
        runs: {
            type: PARAMETER_TYPE.INT,
            range: [0, Infinity],
            default: 10
        }
    },
    PlanarSubgraphTree: {
        maxThreads: {
            type: PARAMETER_TYPE.INT,
            range: [0, Infinity],
            default: 1
        },
        timeLimit: {
            type: PARAMETER_TYPE.INT,
            range: [-Infinity, Infinity],
            default: 1000
            // default: -1 if timeLimit < 0 will be unstoppable
        }
    }
}

const PlanarSubgraphModule = createModule(NAME, MODULE_DIRECTORY)
export default PlanarSubgraphModule