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

const PARAMETER_MAPPING = {
    pageFormat: {
        Square: 0,
        Portrait: 1,
        Landscape: 2,
    },
    qualityVersusSpeed: {
        BeautifulAndFast: 0,
        GorgeousAndEfficient: 1,
        NiceAndIncredibleSpeed: 2,
    },
}

function fm3(graph, params, callback) {
    const defaultParams = {
        useHighLevelOptions: false,
        singleLevel: false,
        pageFormat: "Square", // "Portrait", "Landscape"
        unitEdgeLength: 20.0,
        newInitialPlacement: false,
        qualityVersusSpeed: "BeautifulAndFast", // "GorgeousAndEfficient" (best quality), "NiceAndIncredibleSpeed" (best speed)
        randSeed: 0,
        edgeLengthMeasurement: 0,
        allowedPositions: 0,
        maxIntPosExponent: 0,
        pageRatio: 0,
        stepsForRotatingComponents: 0,
        tipOverCCs: 0,
        minDistCC: 0,
        presortCCs: 0,
        minGraphSize: 0,
        galaxyChoice: 0,
        randomTries: 0,
        maxIterChange: 0,
        maxIterFactor: 0,
        initialPlacementMult: 0,
        forceModel: 0,
        springStrength: 0,
        repForcesStrength: 0,
        repulsiveForcesCalculation: 0,
        StopCriterion: 0,
        threshold: 0,
        fixedIterations: 0,
        forceScalingFactor: 0,
        coolTemperature: 0,
        coolValue: 0,
        initialPlacementForces: 0,
        resizeDrawing: 0,
        resizingScalar: 0,
        fineTuningIterations: 0,
        fineTuneScalar: 0,
        adjustPostRepStrengthDynamically: 0,
        postSpringStrength: 0,
        postStrengthOfRepForces: 0,
        frGridQuotient: 0,
        nmTreeConstruction: 0,
        nmSmallCell: 0,
        nmParticlesInLeaves: 0,
        nmPrecision: 0,
    }
    let parameters = {
        ...defaultParams,
        ...params,
    }
    parameters = PARAMETER_SEQUENCE.map((paramName) => {
        if (paramName in PARAMETER_MAPPING) {
            return PARAMETER_MAPPING[paramName][parameters[paramName]]
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
