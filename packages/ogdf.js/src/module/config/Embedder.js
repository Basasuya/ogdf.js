import createModule from "./module-helper";
import { PARAMETER_TYPE } from "../../utils/parameter-type";
const NAME = "EmbedderModule"

const MODULE_DIRECTORY = {
    EmbedderMaxFace: {
        timeLimit: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [-Infinity, Infinity],
            default: 1000
            // default: -1 if timeLimit < 0 will be unstoppable
        }
    },
    EmbedderMinDepth: {
        timeLimit: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [-Infinity, Infinity],
            default: 1000
            // default: -1 if timeLimit < 0 will be unstoppable
        }
    },
    EmbedderMinDepthPiTa: {
        timeLimit: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [-Infinity, Infinity],
            default: 1000
            // default: -1 if timeLimit < 0 will be unstoppable
        },
        useExtendedDepthDefinition: {
            type: PARAMETER_TYPE.BOOL,
            range: [true, false],
            default: true
        }
    },
    EmbedderOptimalFlexDraw: {
        timeLimit: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [-Infinity, Infinity],
            default: 1000
            // default: -1 if timeLimit < 0 will be unstoppable
        }
    },
    SimpleEmbedder: {
        timeLimit: {
            type: PARAMETER_TYPE.DOUBLE,
            range: [-Infinity, Infinity],
            default: 1000
            // default: -1 if timeLimit < 0 will be unstoppable
        }
    }
}

const EmbedderModule = createModule(NAME, MODULE_DIRECTORY)
export default EmbedderModule