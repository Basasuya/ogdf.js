const ogdf = require('../../src/index')
const {
    PARAMETER_TYPE,
    getDefaultParameters,
    getParameterEntries
} = require('../../src/utils/parameters')

describe('Testing getDefaultParameters', () => {
    test("Get dh's default parameters", () => {
        expect(getDefaultParameters(ogdf.dh.PARAMETER_DEFINITION)).toEqual({
            useWorker: false,
            fixSettings: 'none',
            attractionWeight: 1e2,
            iterationNumberAsFactor: false,
            nodeOverlapWeight: 100,
            numberOfIterations: 0,
            planarityWeight: 500,
            preferredEdgeLength: 0,
            preferredEdgeLengthMultiplier: 2,
            repulsionWeight: 1e6,
            speed: 'Medium',
            startTemperature: 500
        })
    })

    test("Get mul's default parameters", () => {
        expect(getDefaultParameters(ogdf.mul.PARAMETER_DEFINITION)).toEqual({
            useWorker: false,
            layoutType: {
                module: 'Layout.SpringEmbedderGridVariant'
            },
            multilevelBuilderType: {
                module: 'MultilevelBuilder.SolarMerger',
                edgeLengthAdjustment: 0
            },
            placerType: {
                module: 'InitialPlacer.BarycenterPlacer',
                randomOffset: true,
                weightedPositionPriority: false
            }
        })
    })

    test("Get sugi's default parameters", () => {
        expect(getDefaultParameters(ogdf.sugi.PARAMETER_DEFINITION)).toEqual({
            useWorker: false,
            alignBaseClasses: false,
            alignSiblings: false,
            arrangeCCs: true,
            fails: 4,
            maxThreads: 1,
            minDistCC: 20.0,
            pageRatio: 1.0,
            permuteFirst: false,
            runs: 15,
            transpose: true,
            clusterLayoutType: {
                module: 'HierarchyClusterLayout.Optimal',
                fixedLayerDistance: false,
                layerDistance: 3.0,
                nodeDistance: 3.0,
                weightBalancing: 0.1,
                weightClusters: 0.05,
                weightSegments: 2.0
            },
            crossMinType: {
                module: 'LayeredCrossMin.BarycenterHeuristic'
            },
            layoutType: {
                module: 'HierarchyLayout.Fast',
                fixedLayerDistance: false,
                layerDistance: 3.0,
                nodeDistance: 3.0
            },
            packerType: {
                module: 'CCLayoutPack.TileToRows'
            },
            rankingType: {
                module: 'Ranking.LongestPath',
                alignBaseClasses: false,
                alignSiblings: false,
                optimizeEdgeLength: true,
                separateDeg0Layer: true,
                separateMultiEdges: true,
                subgraphType: {
                    module: 'AcyclicSubgraph.Dfs'
                }
            }
        })
    })
})

describe('Testing updateParameters & getParameterEntries', () => {
    const fm3 = new ogdf.fm3()
    const fm3DefaultParameters = fm3.parameters()
    test("Get fm3's default parameter entries", () => {
        const entries = getParameterEntries(
            fm3DefaultParameters,
            ogdf.fm3.ORIGIN_PARAMETER_DEFINITION,
            ogdf.fm3.OUTER_PARAMETER_DEFINITION
        )
        const expected = [
            {
                key: 'useHighLevelOptions',
                value: false,
                isOriginParameter: true,
                type: PARAMETER_TYPE.BOOL
            },
            {
                key: 'singleLevel',
                value: false,
                isOriginParameter: true,
                type: PARAMETER_TYPE.BOOL
            },
            {
                key: 'pageFormat',
                value: 2,
                isOriginParameter: true,
                type: PARAMETER_TYPE.CATEGORICAL
            },
            {
                key: 'unitEdgeLength',
                type: PARAMETER_TYPE.DOUBLE,
                value: 20,
                isOriginParameter: true
            },
            {
                key: 'newInitialPlacement',
                value: false,
                isOriginParameter: true,
                type: PARAMETER_TYPE.BOOL
            },
            {
                key: 'qualityVersusSpeed',
                value: 2,
                isOriginParameter: true,
                type: PARAMETER_TYPE.CATEGORICAL
            },
            {
                key: 'randSeed',
                type: PARAMETER_TYPE.INT,
                value: 100,
                isOriginParameter: true
            },
            {
                key: 'edgeLengthMeasurement',
                value: 1,
                isOriginParameter: true,
                type: PARAMETER_TYPE.CATEGORICAL
            },
            {
                key: 'allowedPositions',
                value: 1,
                isOriginParameter: true,
                type: PARAMETER_TYPE.CATEGORICAL
            },
            {
                key: 'maxIntPosExponent',
                type: PARAMETER_TYPE.INT,
                value: 40,
                isOriginParameter: true
            },
            {
                key: 'pageRatio',
                type: PARAMETER_TYPE.DOUBLE,
                value: 1,
                isOriginParameter: true
            },
            {
                key: 'stepsForRotatingComponents',
                type: PARAMETER_TYPE.INT,
                value: 10,
                isOriginParameter: true
            },
            {
                key: 'tipOverCCs',
                value: 1,
                isOriginParameter: true,
                type: PARAMETER_TYPE.CATEGORICAL
            },
            {
                key: 'minDistCC',
                type: PARAMETER_TYPE.DOUBLE,
                value: 100,
                isOriginParameter: true
            },
            {
                key: 'presortCCs',
                value: 1,
                isOriginParameter: true,
                type: PARAMETER_TYPE.CATEGORICAL
            },
            {
                key: 'minGraphSize',
                type: PARAMETER_TYPE.INT,
                value: 50,
                isOriginParameter: true
            },
            {
                key: 'galaxyChoice',
                value: 1,
                isOriginParameter: true,
                type: PARAMETER_TYPE.CATEGORICAL
            },
            {
                key: 'randomTries',
                type: PARAMETER_TYPE.INT,
                value: 20,
                isOriginParameter: true
            },
            {
                key: 'maxIterChange',
                value: 1,
                isOriginParameter: true,
                type: PARAMETER_TYPE.CATEGORICAL
            },
            {
                key: 'maxIterFactor',
                type: PARAMETER_TYPE.INT,
                value: 10,
                isOriginParameter: true
            },
            {
                key: 'initialPlacementMult',
                value: 1,
                isOriginParameter: true,
                type: PARAMETER_TYPE.CATEGORICAL
            },
            {
                key: 'forceModel',
                value: 2,
                isOriginParameter: true,
                type: PARAMETER_TYPE.CATEGORICAL
            },
            {
                key: 'springStrength',
                type: PARAMETER_TYPE.DOUBLE,
                value: 1,
                isOriginParameter: true
            },
            {
                key: 'repForcesStrength',
                type: PARAMETER_TYPE.DOUBLE,
                value: 1,
                isOriginParameter: true
            },
            {
                key: 'repulsiveForcesCalculation',
                value: 2,
                isOriginParameter: true,
                type: PARAMETER_TYPE.CATEGORICAL
            },
            {
                key: 'stopCriterion',
                value: 2,
                isOriginParameter: true,
                type: PARAMETER_TYPE.CATEGORICAL
            },
            {
                key: 'threshold',
                type: PARAMETER_TYPE.DOUBLE,
                value: 0.01,
                isOriginParameter: true
            },
            {
                key: 'fixedIterations',
                value: 30,
                type: PARAMETER_TYPE.INT,
                isOriginParameter: true
            },
            {
                key: 'forceScalingFactor',
                type: PARAMETER_TYPE.DOUBLE,
                value: 0.05,
                isOriginParameter: true
            },
            {
                key: 'coolTemperature',
                value: false,
                isOriginParameter: true,
                type: PARAMETER_TYPE.BOOL
            },
            {
                key: 'coolValue',
                type: PARAMETER_TYPE.DOUBLE,
                value: 0.99,
                isOriginParameter: true
            },
            {
                key: 'initialPlacementForces',
                value: 2,
                isOriginParameter: true,
                type: PARAMETER_TYPE.CATEGORICAL
            },
            {
                key: 'resizeDrawing',
                value: true,
                isOriginParameter: true,
                type: PARAMETER_TYPE.BOOL
            },
            {
                key: 'resizingScalar',
                type: PARAMETER_TYPE.DOUBLE,
                value: 1,
                isOriginParameter: true
            },
            {
                type: PARAMETER_TYPE.INT,
                key: 'fineTuningIterations',
                value: 20,
                isOriginParameter: true
            },
            {
                key: 'fineTuneScalar',
                type: PARAMETER_TYPE.DOUBLE,
                value: 0.2,
                isOriginParameter: true
            },
            {
                key: 'adjustPostRepStrengthDynamically',
                value: true,
                isOriginParameter: true,
                type: PARAMETER_TYPE.BOOL
            },
            {
                key: 'postSpringStrength',
                type: PARAMETER_TYPE.DOUBLE,
                value: 2,
                isOriginParameter: true
            },
            {
                key: 'postStrengthOfRepForces',
                type: PARAMETER_TYPE.DOUBLE,
                value: 0.01,
                isOriginParameter: true
            },
            {
                type: PARAMETER_TYPE.INT,
                key: 'frGridQuotient',
                value: 2,
                isOriginParameter: true
            },
            {
                key: 'nmTreeConstruction',
                value: 1,
                isOriginParameter: true,
                type: PARAMETER_TYPE.CATEGORICAL
            },
            {
                key: 'nmSmallCell',
                value: 0,
                isOriginParameter: true,
                type: PARAMETER_TYPE.CATEGORICAL
            },
            {
                type: PARAMETER_TYPE.INT,
                key: 'nmParticlesInLeaves',
                value: 25,
                isOriginParameter: true
            },
            {
                type: PARAMETER_TYPE.INT,
                key: 'nmPrecision',
                value: 4,
                isOriginParameter: true
            },
            {
                key: 'useWorker',
                value: false,
                isOriginParameter: false,
                type: PARAMETER_TYPE.BOOL
            }
        ]

        expect(entries).toEqual(expected)
    })
    // updateParameters(fm3DefaultParameters, {}, ogdf.fm3.PARAMETER_DEFINITION)
})
