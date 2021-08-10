import { PARAMETER_TYPE } from '../../utils/parameters'
import createLayout from '../creater'

const NAME = 'SEGV'
const OUR_PARAMETERS = {
    useWorker: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: false,
    },
}

const ORIGIN_PARAMETERS = {
    avgConvergenceFactor: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 0.1,
    },
    forceModel: {
        type: PARAMETER_TYPE.CATEGORICAL,
        range: ["FruchtermanReingold", "FruchtermanReingoldModAttr", "FruchtermanReingoldModRep", "Eades", "Hachul", "Gronemann"],
        default: "FruchtermanReingold",
    },
    forceModelImprove: {
        type: PARAMETER_TYPE.CATEGORICAL,
        range: ["FruchtermanReingold", "FruchtermanReingoldModAttr", "FruchtermanReingoldModRep", "Eades", "Hachul", "Gronemann"],
        default: "FruchtermanReingoldModRep",
    },
    idealEdgeLength: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 20.0 + Math.hypot(20.0, 20.0),
    },
    iterations: {
        type: PARAMETER_TYPE.INT,
        range: [0, Infinity],
        default: 400,
    },
    iterationsImprove: {
        type: PARAMETER_TYPE.INT,
        range: [0, Infinity],
        default: 200,
    },
    maxConvergenceFactor: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 0.2,
    },
    maxThreads: {
        type: PARAMETER_TYPE.INT,
        range: [0, Infinity],
        default: 3,
    },
    minDistCC: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 30.0,
    },
    noise: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: true,
    },
    pageRatio: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 1.0,
    },
    scaleFunctionFactor: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 4.0,
    },
    scaling: {
        type: PARAMETER_TYPE.CATEGORICAL,
        range: ["input", "userBoundingBox", "scaleFunction", "useIdealEdgeLength"],
        default: "scaleFunction",
    },
    userBoundingBoxXmin: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 0.0,
    },
    userBoundingBoxYmin: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 0.0,
    },
    userBoundingBoxXmax: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 100.0,
    },
    userBoundingBoxYmax: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 100.0,
    },
}

const segv = createLayout(NAME, OUR_PARAMETERS, ORIGIN_PARAMETERS, {})
export default segv