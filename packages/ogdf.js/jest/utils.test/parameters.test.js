const parameter = require('../../src/utils/parameters')
const ogdf = require('../../src/index')

test("get default value of dh's origin parameters", () => {
    expect(parameter.getDefaultParameters(ogdf.dh.PARAMETER_DEFINITION)).toEqual({
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

test("get default value of mul's origin parameters", () => {
    expect(parameter.getDefaultParameters(ogdf.mul.PARAMETER_DEFINITION)).toEqual({
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
