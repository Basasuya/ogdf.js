import { PARAMETER_TYPE } from '../../utils/parameters'
import createLayout from '../creater'

const NAME = 'SEKK'
const OUR_PARAMETERS = {
    useWorker: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: false,
    },
}

const ORIGIN_PARAMETERS = {
    computeMaxIterations: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: true,
    },
    desLength: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [-Infinity, Infinity],
        default: 0.0,
    },
    globalIterationFactor: {
        type: PARAMETER_TYPE.INT,
        range: [0, Infinity],
        default: 16,
    },
    maxGlobalIterations: {
        type: PARAMETER_TYPE.INT,
        range: [0, Infinity],
        default: 2147483647,
    },
    maxLocalIterations: {
        type: PARAMETER_TYPE.INT,
        range: [0, Infinity],
        default: 2147483647,
    },
    stopTolerance: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 0.001,
    },
    useLayout: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: true,
    },
    zeroLength: {
        type: PARAMETER_TYPE.BOOL,
        range: [-Infinity, Infinity],
        default: -1.0,
    },
}

const ATTRIBUTES = {
    node: [
        {
            name: "nodesX",
            mapper: node => node.x,
            type: PARAMETER_TYPE.DOUBLE
        },
        {
            name: "nodesY",
            mapper: node => node.y,
            type: PARAMETER_TYPE.DOUBLE
        },
        {
            name: "nodesWidth",
            mapper: node => "width" in node ? node.width : 1.,
            type: PARAMETER_TYPE.DOUBLE
        },
        {
            name: "nodesHeight",
            mapper: node => "height" in node ? node.height : 1.,
            type: PARAMETER_TYPE.DOUBLE
        }
    ],
    link: [],
    sequence: ['nodesX', "nodesY", "nodesWidth", "nodesHeight"]
}

const sekk = createLayout(NAME, OUR_PARAMETERS, ORIGIN_PARAMETERS, ATTRIBUTES)
export default sekk