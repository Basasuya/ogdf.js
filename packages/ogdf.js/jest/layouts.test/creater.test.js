const ogdf = require('../../src/index')
const miserables = require('../data/miserables.json')

const Layout = ogdf.layouts.layered.sugi
const layout = new Layout()
const graph = miserables
const id2node = graph.nodes.reduce((r, n) => {
    r[n.id] = n
    return r
}, {})
const st2link = graph.links.reduce((r, l) => {
    r[`${l.source}<->${l.target}`] = l
    return r
}, {})

test('Trivial testing', async () => {
    expect(typeof layout.callback()).toBe(typeof function () {})
    expect(layout.graph()).toEqual({ nodes: [], links: [] })

    let computedGraph = { nodes: [], links: [] }

    layout.callback((graph) => {
        computedGraph.nodes = graph.nodes ?? []
        computedGraph.links = graph.links ?? []
    })

    expect(doesItWork(computedGraph)).toBe(false)

    layout.graph(graph)
    expect(doesItWork(computedGraph)).toBe(false)

    await layout.run()
    expect(doesItWork(computedGraph)).toBe(true)

    function doesItWork(computedGraph) {
        if (!computedGraph) return false
        const nodes = computedGraph.nodes
        const links = computedGraph.links
        if (!nodes || Array.isArray(nodes) || computedGraph.nodes.length == 0) return false
        if (!links || Array.isArray(links) || computedGraph.links.length == 0) return false
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
