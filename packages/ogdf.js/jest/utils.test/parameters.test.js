const ogdf = require('../../src/index')
const { OGDF_MODULES } = require('../../src/utils')
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
                module: 'SpringEmbedderGridVariant'
            },
            multilevelBuilderType: {
                module: 'SolarMerger',
                edgeLengthAdjustment: 0
            },
            placerType: {
                module: 'BarycenterPlacer',
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
                module: 'Optimal',
                fixedLayerDistance: false,
                layerDistance: 3.0,
                nodeDistance: 3.0,
                weightBalancing: 0.1,
                weightClusters: 0.05,
                weightSegments: 2.0
            },
            crossMinType: {
                module: 'BarycenterHeuristic'
            },
            layoutType: {
                module: 'Fast',
                fixedLayerDistance: false,
                layerDistance: 3.0,
                nodeDistance: 3.0
            },
            packerType: {
                module: 'TileToRows'
            },
            rankingType: {
                module: 'LongestPath',
                alignBaseClasses: false,
                alignSiblings: false,
                optimizeEdgeLength: true,
                separateDeg0Layer: true,
                separateMultiEdges: true,
                subgraphType: {
                    module: 'Dfs'
                }
            }
        })
    })
})

describe('Testing updateParameters & getParameterEntries', () => {
    const fm3Class = ogdf.layouts.energybased.fm3
    const fm3 = new fm3Class()
    const fm3DefaultParameters = fm3.parameters()
    let fm3Parameters = fm3DefaultParameters
    const expectedFM3Entries = [
        /* #maptz-fold-region default [Expected default fm3 parameters] */
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
        /* #end-maptz-fold-region */
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
        fm3Parameters = updateParameters(fm3Parameters, {}, fm3Class.PARAMETER_DEFINITION)

        const entries = getParameterEntries(
            fm3Parameters,
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

        fm3Parameters = updateParameters(fm3Parameters, newParameter, fm3Class.PARAMETER_DEFINITION)

        const entries = getParameterEntries(
            fm3Parameters,
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
    let sugiParameters = sugiDefaultParameters
    const expectedSugiEntries = [
        /* #maptz-fold-region default [Expected default sugiyama parameters] */
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
        /* #end-maptz-fold-region */
    ]
    test("Get sugi's default parameter entries", () => {
        const entries = getParameterEntries(
            sugiParameters,
            sugiClass.ORIGIN_PARAMETER_DEFINITION,
            sugiClass.OUTER_PARAMETER_DEFINITION
        )
        expect(entries).toEqual(expectedSugiEntries)
    })

    test("Get sugi's parameter entries after update", () => {
        const newParameters = {
            alignBaseClasses: true,
            fails: 3,
            minDistCC: 10.5,
            clusterLayoutType: {
                fixedLayerDistance: true,
                layerDistance: 10.5
            },
            crossMinType: {
                module: 'GlobalSifting',
                nRepeats: 20
            },
            layoutType: {
                layerDistance: 3,
                nodeDistance: 3,
                balanced: false,
                module: 'FastSimple'
            },
            rankingType: {
                subgraphType: {
                    module: 'GreedyCycleRemoval'
                },
                module: 'CoffmanGraham'
            },
            useWorker: true
        }
        sugiParameters = updateParameters(
            sugiParameters,
            newParameters,
            sugiClass.PARAMETER_DEFINITION
        )
        const expectedParameters = {
            ...sugiDefaultParameters,
            ...{
                ...newParameters,
                clusterLayoutType: {
                    ...sugiDefaultParameters.clusterLayoutType,
                    ...newParameters.clusterLayoutType
                },
                crossMinType: newParameters.crossMinType,
                layoutType: {
                    ...newParameters.layoutType,
                    downward: true,
                    leftToRight: true
                },
                rankingType: {
                    ...newParameters.rankingType,
                    width: 3
                }
            }
        }

        expect(sugiParameters).toEqual(expectedParameters)

        const entries = getParameterEntries(
            sugiParameters,
            sugiClass.ORIGIN_PARAMETER_DEFINITION,
            sugiClass.OUTER_PARAMETER_DEFINITION
        )

        const newParameterValues = {
            /* #maptz-fold-region default */
            alignBaseClasses: expectedParameters.alignBaseClasses,
            fails: expectedParameters.fails,
            minDistCC: expectedParameters.minDistCC,
            clusterLayoutType_Optimal_fixedLayerDistance:
                expectedParameters.clusterLayoutType.fixedLayerDistance,
            clusterLayoutType_Optimal_layerDistance:
                expectedParameters.clusterLayoutType.layerDistance,
            crossMinType: OGDF_MODULES.RANGES[
                sugiClass.PARAMETER_DEFINITION.crossMinType.module
            ].indexOf(expectedParameters.crossMinType.module),
            crossMinType_GlobalSifting_nRepeats: expectedParameters.crossMinType.nRepeats,
            layoutType: OGDF_MODULES.RANGES[
                sugiClass.PARAMETER_DEFINITION.layoutType.module
            ].indexOf(expectedParameters.layoutType.module),
            layoutType_FastSimple_layerDistance: expectedParameters.layoutType.layerDistance,
            layoutType_FastSimple_nodeDistance: expectedParameters.layoutType.nodeDistance,
            layoutType_FastSimple_balanced: expectedParameters.layoutType.balanced,
            rankingType: OGDF_MODULES.RANGES[
                sugiClass.PARAMETER_DEFINITION.rankingType.module
            ].indexOf(expectedParameters.rankingType.module),
            rankingType_CoffmanGraham_subgraphType: OGDF_MODULES.RANGES[
                OGDF_MODULES[sugiClass.PARAMETER_DEFINITION.rankingType.module].CoffmanGraham
                    .subgraphType.module
            ].indexOf(expectedParameters.rankingType.subgraphType.module),
            useWorker: expectedParameters.useWorker
            /* #end-maptz-fold-region*/
        }
        expectedSugiEntries.forEach((entry) => {
            if (entry.key in newParameterValues) {
                entry.value = newParameterValues[entry.key]
            }
        })
        expect(entries).toEqual(expectedSugiEntries)
    })

    test('Update empty parameter', () => {
        const result1 = updateParameters({}, {}, sugiClass.PARAMETER_DEFINITION)
        expect(result1).toEqual(sugiDefaultParameters)

        const result2 = updateParameters(undefined, undefined, sugiClass.PARAMETER_DEFINITION)
        expect(result1).toEqual(sugiDefaultParameters)

        const result3 = updateParameters(
            {},
            {
                rankingType: {
                    subgraphType: 'GreedyCycleRemoval',
                    module: 'CoffmanGraham'
                }
            },
            sugiClass.PARAMETER_DEFINITION
        )

        expect(result3).toEqual({
            ...sugiDefaultParameters,
            rankingType: {
                module: 'CoffmanGraham',
                subgraphType: {
                    module: 'GreedyCycleRemoval'
                },
                width: 3
            }
        })
    })

    test("Get sugi's parameter entries after update wrong parameter", () => {
        expect(() => {
            updateParameters(sugiDefaultParameters, {}, undefined)
        }).toThrow()

        expect(updateParameters(sugiDefaultParameters, {}, {})).toEqual({})

        expect(updateParameters({}, { x: 2 }, sugiClass.PARAMETER_DEFINITION)).toEqual(
            sugiDefaultParameters
        )

        expect(updateParameters({ x: 2 }, {}, sugiClass.PARAMETER_DEFINITION)).toEqual(
            sugiDefaultParameters
        )

        expect(() => {
            updateParameters({}, { fails: -1 }, sugiClass.PARAMETER_DEFINITION)
        }).toThrow()

        expect(() => {
            updateParameters({}, { clusterLayoutType: 0 }, pgClass.PARAMETER_DEFINITION)
        }).toThrow()

        expect(() => {
            updateParameters(
                {},
                { clusterLayoutType: { module: '' } },
                pgClass.PARAMETER_DEFINITION
            )
        }).toThrow()

        expect(() => {
            updateParameters(
                {},
                { rankingType: { module: 'CoffmanGraham', subgraphType: '' } },
                pgClass.PARAMETER_DEFINITION
            )
        }).toThrow()

        expect(() => {
            updateParameters(
                {},
                { rankingType: { module: '', subgraphType: 'GreedyCycleRemoval' } },
                pgClass.PARAMETER_DEFINITION
            )
        }).toThrow()

        expect(() => {
            updateParameters({}, { permuteFirst: 0 }, sugiClass.PARAMETER_DEFINITION)
        }).toThrow()

        expect(() => {
            updateParameters({}, { permuteFirst: null }, sugiClass.PARAMETER_DEFINITION)
        }).toThrow()

        expect(
            updateParameters(
                {},
                { permuteFirst: undefined } /* undefined parameters will be ignored*/,
                sugiClass.PARAMETER_DEFINITION
            )
        ).toEqual(sugiDefaultParameters)
    })
    /* #end-maptz-fold-region */
})
