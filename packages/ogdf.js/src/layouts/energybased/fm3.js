import { PARAMETER_TYPE } from '../../utils/parameters'
import createLayout from '../creater'

const NAME = 'FM3'
const OUR_PARAMETER_DEFINITION = {
    useWorker: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: false
    }
}
// should keep identical to the parameter order in src/entry/main.cpp => function fm3()
const ORIGIN_PARAMETER_DEFINITION = {
    useHighLevelOptions: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: false
    },
    singleLevel: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: false
    },
    pageFormat: {
        type: PARAMETER_TYPE.CATEGORICAL,
        range: ['Portrait', 'Landscape', 'Square'],
        default: 'Square'
    },
    unitEdgeLength: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 20.0
    },
    newInitialPlacement: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: false
    },
    qualityVersusSpeed: {
        type: PARAMETER_TYPE.CATEGORICAL,
        range: ['GorgeousAndEfficient', 'NiceAndIncredibleSpeed', 'BeautifulAndFast'],
        default: 'BeautifulAndFast'
    },
    randSeed: {
        type: PARAMETER_TYPE.INT,
        range: [0, Infinity],
        default: 100
    },
    edgeLengthMeasurement: {
        type: PARAMETER_TYPE.CATEGORICAL,
        range: [
            'Midpoint', // Measure from center point of edge end points.
            'BoundingCircle' // Measure from border of circle s surrounding edge end points.
        ],
        default: 'BoundingCircle'
    },
    allowedPositions: {
        type: PARAMETER_TYPE.CATEGORICAL,
        range: [
            'All', // Every position is allowed.
            'Integer', // Only integer positions are allowed that are in a range depending on the number of nodes and the average ideal edge length.
            'Exponent' // Only integer positions in a range of -2^MaxIntPosExponent to 2^MaxIntPosExponent are alllowed.
        ],
        default: 'Integer'
    },
    maxIntPosExponent: {
        type: PARAMETER_TYPE.INT,
        range: [31, 51],
        default: 40
    },
    pageRatio: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 1.0
    },
    stepsForRotatingComponents: {
        type: PARAMETER_TYPE.INT,
        range: [0, Infinity],
        default: 10
    },
    tipOverCCs: {
        type: PARAMETER_TYPE.CATEGORICAL,
        range: [
            'None', // not allowed at all
            'NoGrowingRow', // only if the height of the packing row does not grow
            'Always' // always allowed
        ],
        default: 'NoGrowingRow'
    },
    minDistCC: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 100
    },
    presortCCs: {
        type: PARAMETER_TYPE.CATEGORICAL,
        range: [
            'None', // Do not presort.
            'DecreasingHeight', // Presort by decreasing height of components.
            'DecreasingWidth' // Presort by decreasing width of components.
        ],
        default: 'DecreasingHeight'
    },
    minGraphSize: {
        type: PARAMETER_TYPE.INT,
        range: [2, Infinity],
        default: 50
    },
    galaxyChoice: {
        type: PARAMETER_TYPE.CATEGORICAL,
        range: [
            'UniformProb', // selecting by uniform random probability
            'NonUniformProbLowerMass', // selecting by non-uniform probability depending on the star masses (prefering nodes with lower star mass)
            'NonUniformProbHigherMass' // as above but prefering nodes with higher star mass
        ],
        default: 'NonUniformProbLowerMass'
    },
    randomTries: {
        type: PARAMETER_TYPE.INT,
        range: [1, Infinity],
        default: 20
    },
    maxIterChange: {
        type: PARAMETER_TYPE.CATEGORICAL,
        range: [
            'Constant', // kept constant at the force calculation step at every level
            'LinearlyDecreasing', // linearly decreasing from MaxIterFactor*FixedIterations to FixedIterations
            'RapidlyDecreasing' // rapdily decreasing from MaxIterFactor*FixedIterations to FixedIterations
        ],
        default: 'LinearlyDecreasing'
    },
    maxIterFactor: {
        type: PARAMETER_TYPE.INT,
        range: [1, Infinity],
        default: 10
    },
    initialPlacementMult: {
        type: PARAMETER_TYPE.CATEGORICAL,
        range: [
            'Simple', // only using information about placement of nodes on higher levels
            'Advanced' // using additional information about the placement of all inter solar system nodes
        ],
        default: 'Advanced'
    },
    forceModel: {
        type: PARAMETER_TYPE.CATEGORICAL,
        range: [
            'FruchtermanReingold', // The force-model by Fruchterman, Reingold.
            'Eades', // The force-model by Eades.
            'New' // The new force-model.
        ],
        default: 'New'
    },
    springStrength: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 1.0
    },
    repForcesStrength: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 1.0
    },
    repulsiveForcesCalculation: {
        type: PARAMETER_TYPE.CATEGORICAL,
        range: [
            'Exact', // Exact calculation (slow).
            'GridApproximation', // Grid approximation (inaccurate).
            'NMM' // Calculation as for new multipole method (fast and accurate).
        ],
        default: 'NMM'
    },
    stopCriterion: {
        type: PARAMETER_TYPE.CATEGORICAL,
        range: [
            'FixedIterations', // Stop if fixedIterations() is reached.
            'Threshold', // Stop if threshold() is reached.
            'FixedIterationsOrThreshold' // Stop if fixedIterations() or threshold() is reached.
        ],
        default: 'FixedIterationsOrThreshold'
    },
    threshold: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 0.01
    },
    fixedIterations: {
        type: PARAMETER_TYPE.INT,
        range: [1, Infinity],
        default: 30
    },
    forceScalingFactor: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 0.05
    },
    coolTemperature: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: false
    },
    coolValue: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, 1],
        default: 0.99
    },
    initialPlacementForces: {
        type: PARAMETER_TYPE.CATEGORICAL,
        range: [
            'UniformGrid', // Uniform placement on a grid.
            'RandomTime', // Random placement (based on current time).
            'RandomRandIterNr', // Random placement (based on randIterNr()).
            'KeepPositions' // No change in placement.
        ],
        default: 'RandomRandIterNr'
    },
    resizeDrawing: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: true
    },
    resizingScalar: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 1
    },
    fineTuningIterations: {
        type: PARAMETER_TYPE.INT,
        range: [0, Infinity],
        default: 20
    },
    fineTuneScalar: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 0.2
    },
    adjustPostRepStrengthDynamically: {
        type: PARAMETER_TYPE.BOOL,
        range: [true, false],
        default: true
    },
    postSpringStrength: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 2.0
    },
    postStrengthOfRepForces: {
        type: PARAMETER_TYPE.DOUBLE,
        range: [0, Infinity],
        default: 0.01
    },
    frGridQuotient: {
        type: PARAMETER_TYPE.INT,
        range: [0, Infinity],
        default: 2
    },
    nmTreeConstruction: {
        type: PARAMETER_TYPE.CATEGORICAL,
        range: [
            'PathByPath', // Path-by-path construction.
            'SubtreeBySubtree' // Subtree-by-subtree construction.
        ],
        default: 'SubtreeBySubtree'
    },
    nmSmallCell: {
        type: PARAMETER_TYPE.CATEGORICAL,
        range: [
            'Iteratively', // Iteratively (in constant time).
            'Aluru' // According to formula by Aluru et al. (in constant time).
        ],
        default: 'Iteratively'
    },
    nmParticlesInLeaves: {
        type: PARAMETER_TYPE.INT,
        range: [1, Infinity],
        default: 25
    },
    nmPrecision: {
        type: PARAMETER_TYPE.INT,
        range: [1, Infinity],
        default: 4
    }
}

const fm3 = createLayout(NAME, OUR_PARAMETER_DEFINITION, ORIGIN_PARAMETER_DEFINITION, {})

export default fm3
