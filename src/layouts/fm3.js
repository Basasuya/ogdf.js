import initOGDF from "../entry/rawogdf"
import { createWorker } from "../utils/worker-helper"

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
        // customized parameters,
        useWorker: false,
        // original parameters
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
    const originalParameters = PARAMETER_SEQUENCE.map((paramName) => {
        if (paramName in PARAMETER_MAPPING) {
            return PARAMETER_MAPPING[paramName].indexOf(parameters[paramName])
        } else {
            return parameters[paramName]
        }
    })
    const graphCopy = JSON.parse(JSON.stringify(graph))
    const N = graphCopy.nodes.length
    const M = graphCopy.links.length
    const id2index = {}
    for (let i = 0; i < N; ++i) {
        if (graphCopy.nodes[i]["id"] in id2index) {
            throw Error("Duplicated Node ID")
        } else id2index[graphCopy.nodes[i]["id"]] = i
    }
    const sourceIndexArray = []
    const targetIndexArray = []
    for (let i = 0; i < M; ++i) {
        sourceIndexArray.push(id2index[graphCopy.links[i].source])
        targetIndexArray.push(id2index[graphCopy.links[i].target])
    }
    if (parameters.useWorker) {
        // const initOGDFStr = initOGDF.toString()
        // const arrayBuffer = new Uint16Array(
        //     new ArrayBuffer(
        //         4 + M * 2 + PARAMETER_MAPPING.length + initOGDFStr.length
        //     )
        // )
        // arrayBuffer[0] = N
        // arrayBuffer[1] = M
        // arrayBuffer[2] = PARAMETER_MAPPING.length
        // arrayBuffer[3] = initOGDFStr.length
        // for (let i = 0; i < M; ++i) {
        //     arrayBuffer[4 + i] = sourceIndexArray[i]
        //     arrayBuffer[4 + M + i] = targetIndexArray[i]
        // }
        // for (let i = 0; i < PARAMETER_MAPPING.length; ++i) {
        //     arrayBuffer[4 + M * 2 + i] = originalParameters[i]
        // }
        // for (let i = 0; i < initOGDFStr.length; i++) {
        //     arrayBuffer[4 + M * 2 + PARAMETER_MAPPING.length + i] =
        //         initOGDFStr.charCodeAt(i)
        // }
        const worker = createWorker(function () {
            addEventListener("message", (e) => {
                // const arrayBuffer = e.data
                // const N = arrayBuffer[0]
                // const M = arrayBuffer[1]
                // const PARAMETER_MAPPING_LENGTH = arrayBuffer[2]
                // const initOGDFStr_length = arrayBuffer[3]
                // const sourceIndexArray = []
                // const targetIndexArray = []
                // const originalParameters = []
                // const initOGDFStr = ""
                // for (let i = 0; i < M; ++i) {
                //     sourceIndexArray[i] = arrayBuffer[4 + i]
                //     targetIndexArray[i] = arrayBuffer[4 + M + i]
                // }
                // for (let i = 0; i < PARAMETER_MAPPING_LENGTH; ++i) {
                //     originalParameters[i] = arrayBuffer[4 + M * 2 + i]
                // }
                // for (let i = 0; i < initOGDFStr_length; i++) {
                //     initOGDFStr[i] = String.fromCharCode(
                //         arrayBuffer[4 + M * 2 + PARAMETER_MAPPING_LENGTH + i]
                //     )
                // }
                // console.log(initOGDFStr)

                // this.importScripts(initOGDFStr)
                let {
                    initOGDF,
                    N,
                    M,
                    sourceIndexArray,
                    targetIndexArray,
                    originalParameters,
                } = JSON.parse(e.data)
                eval(`initOGDF = ${initOGDF}`)
                initOGDF().then(function (Module) {
                    let source = Module._malloc(4 * M)
                    let target = Module._malloc(4 * M)
                    for (let i = 0; i < M; ++i) {
                        Module.HEAP32[source / 4 + i] = sourceIndexArray[i]
                        Module.HEAP32[target / 4 + i] = targetIndexArray[i]
                    }
                    const result = Module._FM3(
                        N,
                        M,
                        source,
                        target,
                        ...originalParameters
                    )
                    const nodes = []
                    for (let i = 0; i < N; ++i) {
                        nodes[i] = {}
                        nodes[i]["x"] = Module.HEAPF32[(result >> 2) + i * 2]
                        nodes[i]["y"] =
                            Module.HEAPF32[(result >> 2) + i * 2 + 1]
                    }
                    postMessage(JSON.stringify(nodes))
                    Module._free(source)
                    Module._free(target)
                    Module._free_buf(result)
                })
            })
        })
        worker.postMessage(
            JSON.stringify({
                initOGDF: initOGDF.toString(), // ! Maybe we can put initOGDF out of web worker
                N,
                M,
                sourceIndexArray,
                targetIndexArray,
                originalParameters,
            })
        )
        worker.onmessage = function (e) {
            const nodePositions = JSON.parse(e.data)
            for (let i = 0; i < N; ++i) {
                graphCopy.nodes[i].x = nodePositions[i].x
                graphCopy.nodes[i].y = nodePositions[i].y
            }
            worker.terminate()
            callback(graphCopy)
        }
    } else {
        initOGDF().then(function (Module) {
            let source = Module._malloc(4 * M)
            let target = Module._malloc(4 * M)
            for (let i = 0; i < M; ++i) {
                Module.HEAP32[source / 4 + i] = sourceIndexArray[i]
                Module.HEAP32[target / 4 + i] = targetIndexArray[i]
            }
            const result = Module._FM3(
                N,
                M,
                source,
                target,
                ...originalParameters
            )
            for (let i = 0; i < N; ++i) {
                graphCopy.nodes[i]["x"] = Module.HEAPF32[(result >> 2) + i * 2]
                graphCopy.nodes[i]["y"] =
                    Module.HEAPF32[(result >> 2) + i * 2 + 1]
            }

            callback(graphCopy)

            Module._free(source)
            Module._free(target)
            Module._free_buf(result)
        })
    }
}

export default fm3
