const ogdf = require('../../src/index')
const { default: tut } = require('../../src/layouts/energybased/tut')
const {
    PARAMETER_TYPE,
    getDefaultParameters,
    getParameterEntries,
    updateParameters
} = require('../../src/utils/parameters')

describe('Testing getDefaultParameters', () => {
    test("Get dh's default parameters", () => {
        expect(getDefaultParameters(ogdf.layouts.energybased.dh.PARAMETER_DEFINITION)).toEqual({
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
        expect(getDefaultParameters(ogdf.layouts.energybased.mul.PARAMETER_DEFINITION)).toEqual({
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
        expect(getDefaultParameters(ogdf.layouts.layered.sugi.PARAMETER_DEFINITION)).toEqual({
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
    const fm3Class = ogdf.layouts.energybased.fm3
    const fm3 = new fm3Class()
    const fm3DefaultParameters = fm3.parameters()
    const expectedFM3Entries = [
        /* #region default [Expected default fm3 parameters] */
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
        /* #endregion */
    ]

    test("Get fm3's default parameter entries", () => {
        const entries = getParameterEntries(
            fm3DefaultParameters,
            fm3Class.ORIGIN_PARAMETER_DEFINITION,
            fm3Class.OUTER_PARAMETER_DEFINITION
        )

        expect(entries).toEqual(expectedFM3Entries)
    })

    test("Get fm3's parameter entries after updateParameters(empty)", () => {
        updateParameters(fm3DefaultParameters, {}, fm3Class.PARAMETER_DEFINITION)

        const entries = getParameterEntries(
            fm3DefaultParameters,
            fm3Class.ORIGIN_PARAMETER_DEFINITION,
            fm3Class.OUTER_PARAMETER_DEFINITION
        )

        expect(entries).toEqual(expectedFM3Entries)
    })

    test("Get fm3's parameter entries after updateParameters", () => {
        const newParameter = {
            singleLevel: true,
            pageFormat: 'Portrait',
            unitEdgeLength: 10,
            fixedIterations: 1
        }

        updateParameters(fm3DefaultParameters, newParameter, fm3Class.PARAMETER_DEFINITION)

        const entries = getParameterEntries(
            fm3DefaultParameters,
            fm3Class.ORIGIN_PARAMETER_DEFINITION,
            fm3Class.OUTER_PARAMETER_DEFINITION
        )

        const newParameterValue = {
            singleLevel: true,
            pageFormat: 0,
            unitEdgeLength: 10,
            fixedIterations: 1
        }
        expectedFM3Entries.forEach((entry) => {
            if (entry.key in newParameterValue) {
                entry.value = newParameterValue[entry.key]
            }
        })

        expect(entries).toEqual(expectedFM3Entries)
    })

    const sugiClass = ogdf.layouts.layered.sugi
    const sugi = new sugiClass()
    const sugiDefaultParameters = sugi.parameters()
    const expectedSugiEntries = [
        /* #region default [Expected default sugiyama parameters] */
        {
            key: 'alignBaseClasses',
            value: false,
            type: PARAMETER_TYPE.BOOL,
            isOriginParameter: true
        },
        {
            key: 'alignSiblings',
            value: false,
            type: PARAMETER_TYPE.BOOL,
            isOriginParameter: true
        },
        {
            key: 'arrangeCCs',
            value: true,
            type: PARAMETER_TYPE.BOOL,
            isOriginParameter: true
        },
        {
            key: 'fails',
            value: 4,
            type: PARAMETER_TYPE.INT,
            isOriginParameter: true
        },
        {
            key: 'maxThreads',
            value: 1,
            type: PARAMETER_TYPE.INT,
            isOriginParameter: true
        },
        {
            key: 'minDistCC',
            value: 20.0,
            type: PARAMETER_TYPE.DOUBLE,
            isOriginParameter: true
        },
        {
            key: 'pageRatio',
            value: 1.0,
            type: PARAMETER_TYPE.DOUBLE,
            isOriginParameter: true
        },
        {
            key: 'permuteFirst',
            value: false,
            type: PARAMETER_TYPE.BOOL,
            isOriginParameter: true
        },
        {
            key: 'runs',
            value: 15,
            type: PARAMETER_TYPE.INT,
            isOriginParameter: true
        },
        {
            key: 'transpose',
            value: true,
            type: PARAMETER_TYPE.BOOL,
            isOriginParameter: true
        },
        {
            key: 'clusterLayoutType',
            value: 0,
            type: PARAMETER_TYPE.MODULE,
            isOriginParameter: true
        },
        {
            key: 'clusterLayoutType_Optimal_fixedLayerDistance',
            value: false,
            type: PARAMETER_TYPE.BOOL,
            isOriginParameter: true
        },
        {
            key: 'clusterLayoutType_Optimal_layerDistance',
            value: 3.0,
            type: PARAMETER_TYPE.DOUBLE,
            isOriginParameter: true
        },
        {
            key: 'clusterLayoutType_Optimal_nodeDistance',
            value: 3.0,
            type: PARAMETER_TYPE.DOUBLE,
            isOriginParameter: true
        },
        {
            key: 'clusterLayoutType_Optimal_weightBalancing',
            value: 0.1,
            type: PARAMETER_TYPE.DOUBLE,
            isOriginParameter: true
        },
        {
            key: 'clusterLayoutType_Optimal_weightClusters',
            value: 0.05,
            type: PARAMETER_TYPE.DOUBLE,
            isOriginParameter: true
        },
        {
            key: 'clusterLayoutType_Optimal_weightSegments',
            value: 2.0,
            type: PARAMETER_TYPE.DOUBLE,
            isOriginParameter: true
        },
        {
            key: 'crossMinType',
            value: 0,
            type: PARAMETER_TYPE.MODULE,
            isOriginParameter: true
        },
        {
            key: 'crossMinType_GlobalSifting_nRepeats',
            value: 10,
            type: PARAMETER_TYPE.INT,
            isOriginParameter: true
        },
        {
            key: 'crossMinType_GridSifting_verticalStepsBound',
            value: 10,
            type: PARAMETER_TYPE.INT,
            isOriginParameter: true
        },
        {
            key: 'layoutType',
            value: 0,
            type: PARAMETER_TYPE.MODULE,
            isOriginParameter: true
        },
        {
            key: 'layoutType_Fast_fixedLayerDistance',
            value: false,
            type: PARAMETER_TYPE.BOOL,
            isOriginParameter: true
        },
        {
            key: 'layoutType_Fast_layerDistance',
            value: 3.0,
            type: PARAMETER_TYPE.DOUBLE,
            isOriginParameter: true
        },
        {
            key: 'layoutType_Fast_nodeDistance',
            value: 3.0,
            type: PARAMETER_TYPE.DOUBLE,
            isOriginParameter: true
        },
        {
            key: 'layoutType_FastSimple_layerDistance',
            value: 75,
            type: PARAMETER_TYPE.DOUBLE,
            isOriginParameter: true
        },
        {
            key: 'layoutType_FastSimple_nodeDistance',
            value: 150,
            type: PARAMETER_TYPE.DOUBLE,
            isOriginParameter: true
        },
        {
            key: 'layoutType_FastSimple_balanced',
            value: true,
            type: PARAMETER_TYPE.BOOL,
            isOriginParameter: true
        },
        {
            key: 'layoutType_FastSimple_downward',
            value: true,
            type: PARAMETER_TYPE.BOOL,
            isOriginParameter: true
        },
        {
            key: 'layoutType_FastSimple_leftToRight',
            value: true,
            type: PARAMETER_TYPE.BOOL,
            isOriginParameter: true
        },

        {
            key: 'layoutType_Optimal_fixedLayerDistance',
            value: false,
            type: PARAMETER_TYPE.BOOL,
            isOriginParameter: true
        },
        {
            key: 'layoutType_Optimal_layerDistance',
            value: 3.0,
            type: PARAMETER_TYPE.DOUBLE,
            isOriginParameter: true
        },
        {
            key: 'layoutType_Optimal_nodeDistance',
            value: 3.0,
            type: PARAMETER_TYPE.DOUBLE,
            isOriginParameter: true
        },
        {
            key: 'layoutType_Optimal_weightBalancing',
            value: 0.1,
            type: PARAMETER_TYPE.DOUBLE,
            isOriginParameter: true
        },
        {
            key: 'layoutType_Optimal_weightSegments',
            value: 2.0,
            type: PARAMETER_TYPE.DOUBLE,
            isOriginParameter: true
        },
        {
            key: 'packerType',
            value: 0,
            type: PARAMETER_TYPE.MODULE,
            isOriginParameter: true
        },
        {
            key: 'rankingType',
            value: 1,
            type: PARAMETER_TYPE.MODULE,
            isOriginParameter: true
        },
        {
            key: 'rankingType_CoffmanGraham_width',
            value: 3,
            type: PARAMETER_TYPE.INT,
            isOriginParameter: true
        },
        {
            key: 'rankingType_CoffmanGraham_subgraphType',
            value: 0,
            type: PARAMETER_TYPE.MODULE,
            isOriginParameter: true
        },
        {
            key: 'rankingType_LongestPath_alignBaseClasses',
            value: false,
            type: PARAMETER_TYPE.BOOL,
            isOriginParameter: true
        },
        {
            key: 'rankingType_LongestPath_alignSiblings',
            value: false,
            type: PARAMETER_TYPE.BOOL,
            isOriginParameter: true
        },
        {
            key: 'rankingType_LongestPath_optimizeEdgeLength',
            value: true,
            type: PARAMETER_TYPE.BOOL,
            isOriginParameter: true
        },
        {
            key: 'rankingType_LongestPath_separateDeg0Layer',
            value: true,
            type: PARAMETER_TYPE.BOOL,
            isOriginParameter: true
        },
        {
            key: 'rankingType_LongestPath_separateMultiEdges',
            value: true,
            type: PARAMETER_TYPE.BOOL,
            isOriginParameter: true
        },
        {
            key: 'rankingType_LongestPath_subgraphType',
            value: 0,
            type: PARAMETER_TYPE.MODULE,
            isOriginParameter: true
        },
        {
            key: 'rankingType_Optimal_separateMultiEdges',
            value: true,
            type: PARAMETER_TYPE.BOOL,
            isOriginParameter: true
        },
        {
            key: 'rankingType_Optimal_subgraphType',
            value: 0,
            type: PARAMETER_TYPE.MODULE,
            isOriginParameter: true
        },
        {
            key: 'useWorker',
            value: false,
            isOriginParameter: false,
            type: PARAMETER_TYPE.BOOL
        }
        /* #endregion */
    ]
    test("Get sugi's default parameter entries", () => {
        const entries = getParameterEntries(
            sugiDefaultParameters,
            sugiClass.ORIGIN_PARAMETER_DEFINITION,
            sugiClass.OUTER_PARAMETER_DEFINITION
        )
        expect(entries).toEqual(expectedSugiEntries)
    })
})
