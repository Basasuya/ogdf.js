const ogdf = require('../../src/index')
const { PARAMETER_TYPE } = require('../../src/utils/parameter-type')
const { getParameterEntries } = require('../../src/utils/parameters')

// × Is the order of mul's parameters right (11 ms)
// × Is the order of segv's parameters right (7 ms)
// × Is the order of sugi's parameters right (7 ms)
// × Is the order of pg's parameters right (7 ms)
// × Is the order of pl's parameters right (4 ms)

const layoutNames = Object.keys(ogdf).filter((key) => key !== 'utils')
const categories = {
    energybased: [
        'dh',
        'fm3',
        'fme',
        'fmme',
        'gem',
        'mul',
        'nr',
        'pmds',
        'segv',
        'sekk',
        'sm',
        'tut'
    ],
    layered: ['sugi'],
    planarity: ['pg', 'pl']
}

const testCases = layoutNames.map((layoutName) => {
    const category = Object.keys(categories)
        .filter((categoryName) => categories[categoryName].indexOf(layoutName) >= 0)
        .pop()
    const path = `../../src/entry/${category}/${layoutName}.cpp`
    return { path, layoutName }
})
testCases.forEach(({ path, layoutName }) => {
    test(`Is the order of ${layoutName}'s parameters correct?`, () => {
        let Layout = ogdf[layoutName]

        const cpp = require(path)
        const parameterLine = cpp.match(
            /EM_PORT_API\(float\s*\*\)\s*[A-Za-z0-9\_]+\s*\((\s*[A-Za-z0-9\_\,\*]*)*\)/g
        )
        if (!parameterLine) {
            throw Error(`Cannot find EM_PORT_API in ${path}`)
        } else {
            const paramRegStr = /[A-Za-z]+\s*\*?\s*[A-Za-z0-9\_\s]+/
            const parameters = parameterLine[0]
                .match(new RegExp(paramRegStr.source + /[\,\)]/.source, 'g'))
                .map((_) => _.match(paramRegStr)[0])
                .map((param) => {
                    let splits = param.replace(/^\s+|\s+$/g, '').split(/(\s+)|(\s*\*\s*)/)
                    const type = splits[0]
                    const name = splits[splits.length - 1]
                    return { type, name }
                })

            // console.log(parameters)

            // first four parameters are N/M/nodeIndexArray/linkIndexArray
            // lets begin with the fifth parameter
            // if there are some attributes
            const ATTRIBUTES_DEFINITION = Layout.ATTRIBUTES_DEFINITION
            const attributes = [
                ...(ATTRIBUTES_DEFINITION.node ?? []),
                ...(ATTRIBUTES_DEFINITION.link ?? [])
            ].sort((a, b) => {
                const sequence = ATTRIBUTES_DEFINITION.sequence
                return sequence.indexOf(a.name) - sequence.indexOf(b.name)
            })

            const COMMON_PARAMETERS = ['node_num', 'link_num', '*source', '*target']
            expect(
                parameters
                    .slice(COMMON_PARAMETERS.length, COMMON_PARAMETERS.length + attributes.length)
                    .map(({ name, type }) => ({
                        name: name.replace(/\*/, ''), // int*
                        type: type.replace(/\*/, '') // *edgesWeight
                    }))
            ).toEqual(
                attributes.map((attribute) => ({
                    name: attribute.name,
                    type:
                        attribute.type == PARAMETER_TYPE.CATEGORICAL
                            ? 'int'
                            : attribute.type.toLowerCase()
                }))
            )

            const jsParameterSequence = getParameterEntries(
                {},
                Layout.ORIGIN_PARAMETER_DEFINITION,
                Layout.OUTER_PARAMETER_DEFINITION
            )
                .filter((_) => _.isOriginParameter)
                .map((_) => _.key)
            const cppParameterSequence = parameters
                .slice(COMMON_PARAMETERS.length + attributes.length)
                .map((_) => _.name)
            // console.log(jsParameterSequence)
            // console.log(cppParameterSequence)
            expect(cppParameterSequence).toEqual(jsParameterSequence)
        }
    })
})
