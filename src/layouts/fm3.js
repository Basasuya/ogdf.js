import initOGDF from "../entry/rawogdf"

const PARAMETER_SEQUENCE = [
    "useHighLevelOptions",
    "singleLevel",
    "pageFormat",
    "unitEdgeLength",
    "newInitialPlacement",
    "qualityVersusSpeed",
    "randSeed",
    "edgeLengthMeasurement",
    "allowedPositions",
    "maxIntPosExponent",
    "pageRatio",
    "stepsForRotatingComponents",
    "tipOverCCs",
    "minDistCC",
    "presortCCs",
    "minGraphSize",
    "galaxyChoice",
    "randomTries",
    "maxIterChange",
    "maxIterFactor",
    "initialPlacementMult",
    "forceModel",
    "springStrength",
    "repForcesStrength",
    "repulsiveForcesCalculation",
    "StopCriterion",
    "threshold",
    "fixedIterations",
    "forceScalingFactor",
    "coolTemperature",
    "coolValue",
    "initialPlacementForces",
    "resizeDrawing",
    "resizingScalar",
    "fineTuningIterations",
    "fineTuneScalar",
    "adjustPostRepStrengthDynamically",
    "postSpringStrength",
    "postStrengthOfRepForces",
    "frGridQuotient",
    "nmTreeConstruction",
    "nmSmallCell",
    "nmParticlesInLeaves",
    "nmPrecision",
] // should keep identical to the parameter order in src/entry/main.cpp => function fm3()

// should keep same to: ogdf\include\ogdf\energybased\fmmm\FMMMOptions.h
const PARAMETER_MAPPING = {
    pageFormat: ["Portrait", "Landscape", "Square"],
    qualityVersusSpeed: [
        "GorgeousAndEfficient",
        "NiceAndIncredibleSpeed",
        "BeautifulAndFast",
    ],
    edgeLengthMeasurement: [
        "Midpoint", // Measure from center point of edge end points.
        "BoundingCircle", // Measure from border of circle s surrounding edge end points.
    ],
    allowedPositions: [
        "All", // Every position is allowed.
        "Integer", // Only integer positions are allowed that are in a range depending on the number of nodes and the average ideal edge length.
        "Exponent", // Only integer positions in a range of -2^MaxIntPosExponent to 2^MaxIntPosExponent are alllowed.
    ],
    tipOverCCs: [
        "None", // not allowed at all
        "NoGrowingRow", // only if the height of the packing row does not grow
        "Always", // always allowed
    ],
    presortCCs: [
        "None", // Do not presort.
        "DecreasingHeight", // Presort by decreasing height of components.
        "DecreasingWidth", // Presort by decreasing width of components.
    ],
    galaxyChoice: [
        "UniformProb", // selecting by uniform random probability
        "NonUniformProbLowerMass", // selecting by non-uniform probability depending on the star masses (prefering nodes with lower star mass)
        "NonUniformProbHigherMass", // as above but prefering nodes with higher star mass
    ],
    maxIterChange: [
        "Constant", // kept constant at the force calculation step at every level
        "LinearlyDecreasing", // linearly decreasing from MaxIterFactor*FixedIterations to FixedIterations
        "RapidlyDecreasing", // rapdily decreasing from MaxIterFactor*FixedIterations to FixedIterations
    ],
    initialPlacementMult: [
        "Simple", // only using information about placement of nodes on higher levels
        "Advanced", // using additional information about the placement of all inter solar system nodes
    ],
    forceModel: [
        "FruchtermanReingold", // The force-model by Fruchterman, Reingold.
        "Eades", // The force-model by Eades.
        "New", // The new force-model.
    ],
    repulsiveForcesCalculation: [
        "Exact", // Exact calculation (slow).
        "GridApproximation", // Grid approximation (inaccurate).
        "NMM", // Calculation as for new multipole method (fast and accurate).
    ],
    StopCriterion: [
        "FixedIterations", // Stop if fixedIterations() is reached.
        "Threshold", // Stop if threshold() is reached.
        "FixedIterationsOrThreshold", // Stop if fixedIterations() or threshold() is reached.
    ],
    initialPlacementForces: [
        "UniformGrid", // Uniform placement on a grid.
        "RandomTime", // Random placement (based on current time).
        "RandomRandIterNr", // Random placement (based on randIterNr()).
        "KeepPositions", // No change in placement.
    ],
    nmTreeConstruction: [
        "PathByPath", // Path-by-path construction.
        "SubtreeBySubtree", // Subtree-by-subtree construction.
    ],
    nmSmallCell: [
        "Iteratively", // Iteratively (in constant time).
        "Aluru", // According to formula by Aluru et al. (in constant time).
    ],
}

function fm3(graph, params, callback) {
    const defaultParams = {
        useHighLevelOptions: false,
        singleLevel: false,
        pageFormat: "Square", // "Portrait", "Landscape"
        unitEdgeLength: 20.0,
        newInitialPlacement: false,
        qualityVersusSpeed: "BeautifulAndFast", // "GorgeousAndEfficient" (best quality), "NiceAndIncredibleSpeed" (best speed)
        randSeed: 100,
        edgeLengthMeasurement: "BoundingCircle",
        allowedPositions: "Integer",
        maxIntPosExponent: 40,
        pageRatio: 1.0,
        stepsForRotatingComponents: 10,
        tipOverCCs: "NoGrowingRow",
        minDistCC: 100,
        presortCCs: "DecreasingHeight",
        minGraphSize: 50,
        galaxyChoice: "NonUniformProbLowerMass",
        randomTries: 20,
        maxIterChange: "LinearlyDecreasing",
        maxIterFactor: 10,
        initialPlacementMult: "Advanced",
        forceModel: "New",
        springStrength: 1.0,
        repForcesStrength: 1.0,
        repulsiveForcesCalculation: "NMM",
        StopCriterion: "FixedIterationsOrThreshold",
        threshold: 0.01,
        fixedIterations: 30,
        forceScalingFactor: 0.05,
        coolTemperature: false,
        coolValue: 0.99,
        initialPlacementForces: "RandomRandIterNr",
        resizeDrawing: true,
        resizingScalar: 1,
        fineTuningIterations: 20,
        fineTuneScalar: 0.2,
        adjustPostRepStrengthDynamically: true,
        postSpringStrength: 2.0,
        postStrengthOfRepForces: 0.01,
        frGridQuotient: 2,
        nmTreeConstruction: "SubtreeBySubtree",
        nmSmallCell: "Iteratively",
        nmParticlesInLeaves: 25,
        nmPrecision: 4,
    }
    let parameters = {
        ...defaultParams,
        ...params,
    }
    parameters = PARAMETER_SEQUENCE.map((paramName) => {
        if (paramName in PARAMETER_MAPPING) {
            return PARAMETER_MAPPING[paramName].indexOf(parameters[paramName])
        } else {
            return parameters[paramName]
        }
    })
    console.log(parameters)
    const N = graph.nodes.length
    const M = graph.links.length
    const id2index = {}
    for (let i = 0; i < N; ++i) {
        if (graph.nodes[i]["id"] in id2index) {
            throw Error("Duplicated Node ID")
        } else id2index[graph.nodes[i]["id"]] = i
    }
    initOGDF().then(function (Module) {
        let source = Module._malloc(4 * M)
        let target = Module._malloc(4 * M)
        for (let i = 0; i < M; ++i) {
            Module.HEAP32[source / 4 + i] = id2index[graph.links[i].source]
            Module.HEAP32[target / 4 + i] = id2index[graph.links[i].target]
        }
        const result = Module._FM3(N, M, source, target, ...parameters)
        for (let i = 0; i < N; ++i) {
            graph.nodes[i]["x"] = Module.HEAPF32[(result >> 2) + i * 2]
            graph.nodes[i]["y"] = Module.HEAPF32[(result >> 2) + i * 2 + 1]
        }
        callback(graph)

        Module._free(source)
        Module._free(target)
        Module._free_buf(result)
    })
}

export default fm3
