const ogdf = require('../../src/index')
const { PARAMETER_TYPE } = require('../../src/utils/parameter-type')
const { getParameterEntries } = require('../../src/utils/parameters')
test("Is the order of mul's parameters right", () => {
    const path = '../../src/entry/energybased/mul.cpp'
    let Layout = ogdf.mul

    const cpp = require(path)
    const lines = cpp.split('\n')
    const EM_PORT_API = 'EM_PORT_API(float *) '
    const functionLine = lines
        .filter((line) => line.substring(0, EM_PORT_API.length) == EM_PORT_API)
        .pop()
    if (functionLine) {
        let paramString = functionLine.substring(EM_PORT_API.length).match(/\(.*\)/)[0]
        paramString = paramString.substring(1, paramString.length - 1)

        const parameters = paramString.split(',').map((param) => {
            let [type, name] = param.replace(/^\s+|\s+$/g, '').split(' ')
            return { type, name }
        })

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
        console.log(jsParameterSequence)
        console.log(cppParameterSequence)
        expect(cppParameterSequence).toEqual(jsParameterSequence)
    } else {
        throw Error(`Cannot find ${EM_PORT_API} in ${path}`)
    }
})
