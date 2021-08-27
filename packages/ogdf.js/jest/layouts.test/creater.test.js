const ogdf = require('../../src/index')
const { getDefaultParameters, updateParameters } = require('../../src/utils/parameters')
const miserables = require('../data/miserables.json')

const Layout = ogdf.layouts.layered.sugi
const layout = new Layout()
const defaultParameters = layout.parameters()
const trivialTesterDefinedParameters = {
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
        subgraphType: 'GreedyCycleRemoval',
        module: 'CoffmanGraham'
    },
    useWorker: true
}
const EXPECTED_STATE = {
    THROW: 'THROW',
    EQUAL: 'EQUAL'
}
const wrongTesterDefinedParametersList = [
    {
        in: {
            fails: -1
        },
        out: {
            state: EXPECTED_STATE.THROW,
            expected: {
                arguments: ['fails'],
                return: 4
            }
        }
    },
    {
        in: {
            rankingType: 0
        },
        out: {
            state: EXPECTED_STATE.THROW,
            expected: {
                arguments: ['rankingType'],
                return: defaultParameters.rankingType
            }
        }
    },
    {
        in: {
            rankingType: {
                subgraphType: 1
            }
        },
        out: {
            state: EXPECTED_STATE.THROW,
            expected: {
                arguments: ['rankingType.subgraphType'],
                return: defaultParameters.rankingType.subgraphType
            }
        }
    },
    {
        in: {
            rankingType: { module: 'CoffmanGraham', subgraphType: '' }
        },
        out: {
            state: EXPECTED_STATE.THROW,
            expected: {
                arguments: ['rankingType.subgraphType'],
                return: defaultParameters.rankingType.subgraphType
            }
        }
    },
    {
        in: {
            permuteFirst: null
        },
        out: {
            state: EXPECTED_STATE.THROW,
            expected: {
                arguments: [],
                return: defaultParameters
            }
        }
    },
    {
        in: {
            permuteFirst: undefined
        },
        out: {
            state: EXPECTED_STATE.EQUAL,
            expected: {
                arguments: [],
                return: defaultParameters
            }
        }
    }
]

const graph = miserables
const id2node = graph.nodes.reduce((r, n) => {
    r[n.id] = n
    return r
}, {})
const st2link = graph.links.reduce((r, l) => {
    r[`${l.source}<->${l.target}`] = l
    return r
}, {})

let computedGraph = { nodes: [], links: [] }

describe('Testing layout.run()', () => {
    test('Trivial testing', () => {
        expect(layout.graph()).toEqual({ nodes: [], links: [] })

        expect(isPositionComputed(computedGraph)).toBe(false)

        layout.graph(graph)
        expect(isPositionComputed(computedGraph)).toBe(false)
    })

    test('Using worker', () => {
        layout.parameters({
            useWorker: true
        })

        computedGraph = { nodes: [], links: [] }

        return layout
            .run()
            .then((graph) => {
                computedGraph.nodes = graph.nodes ?? []
                computedGraph.links = graph.links ?? []
            })
            .then(() => {
                expect(isPositionComputed(computedGraph)).toBe(true)
            })
    })

    test('Not using worker', () => {
        return layout
            .run()
            .then((graph) => {
                computedGraph.nodes = graph.nodes ?? []
                computedGraph.links = graph.links ?? []
            })
            .then(() => {
                expect(isPositionComputed(computedGraph)).toBe(true)
            })
    })

    function isPositionComputed(computedGraph) {
        if (!computedGraph) return false
        const nodes = computedGraph.nodes
        const links = computedGraph.links
        if (!nodes || !Array.isArray(nodes) || nodes.length == 0) return false
        if (!links || !Array.isArray(links) || links.length == 0) return false
        return (
            nodes.every((node) => {
                const isNoedinOriginGraph = node.id in id2node
                const isPositionComputed = 'x' in node && 'y' in node
                return isNoedinOriginGraph && isPositionComputed
            }) &&
            links.every((link) => {
                return `${link.source}<->${link.target}` in st2link
            })
        )
    }
})

describe('Testing layout.parameters()', () => {
    //! it is not tested whether parameters are correctly passed into cpp code
    test('Default parameters', () => {
        layout.parameters(defaultParameters)
        expect(layout.parameters()).toEqual(getDefaultParameters(Layout.PARAMETER_DEFINITION))
    })

    test('Trivial changing parameters', () => {
        layout.parameters(defaultParameters)
        expect(layout.parameters(trivialTesterDefinedParameters)).toEqual(
            updateParameters(
                defaultParameters,
                trivialTesterDefinedParameters,
                Layout.PARAMETER_DEFINITION
            )
        )
    })

    describe('Wrongly changing parameters', () => {
        wrongTesterDefinedParametersList.forEach((wrongTesterDefinedParameters, i) => {
            const _ = wrongTesterDefinedParameters
            test(`${i}`, () => {
                layout.parameters(defaultParameters)
                if (_.out.state == EXPECTED_STATE.THROW) {
                    expect(() => {
                        layout.parameters(_.in)
                    }).toThrow()
                } else {
                    layout.parameters(_.in)
                }
                expect(layout.parameters(..._.out.expected.arguments)).toEqual(
                    _.out.expected.return
                )
            })
        })
    })
})
