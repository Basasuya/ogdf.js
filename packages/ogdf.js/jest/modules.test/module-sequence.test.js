const ogdf = require('../../src/index')

Object.keys(ogdf.Module).forEach((baseModuleName) => {
    if (baseModuleName !== 'CrossingMinimizationModule') return
    describe(`Testing ${baseModuleName}`, () => {
        ogdf.Module[baseModuleName].SubModuleList.forEach((moduleName) => {
            const path = `../../src/module/src/${baseModuleName.replace("Module", "")}.cpp`
            test(`Is the order of ${baseModuleName}.${moduleName}'s parameters correct?`, () => {
                const Module = ogdf.Module[baseModuleName][moduleName]

                const cpp = require(path)
                const reg = new RegExp("EM_PORT_API\\(" + moduleName + "\\s*\\*\\)[\\s|\\r|\\n]*" + baseModuleName + "\_" + moduleName + "\\s*\\((\\s*[A-Za-z0-9\\_\\,\\*]*)*\\)", "g")

                const parameterLine = cpp.match(reg)

                if (!parameterLine) {
                    throw Error(`Cannot find ${baseModuleName + "_" + moduleName} in ${path}`)
                } else {
                    const paramRegStr = /[A-Za-z]+\s*\*?\s*[A-Za-z0-9\_\s]+/
                    const parameters = parameterLine[0]
                        .match(new RegExp(paramRegStr.source + /[\,\)]/.source, 'g'))
                        ?.map((_) => _.match(paramRegStr)[0])
                        ?.map((param) => {
                            let splits = param.replace(/^\s+|\s+$/g, '').split(/(\s+)|(\s*\*\s*)/)
                            const type = splits[0]
                            const name = splits[splits.length - 1]
                            return { type, name }
                        }) || []

                    // console.log(parameters)

                    // first four parameters are N/M/nodeIndexArray/linkIndexArray
                    // lets begin with the fifth parameter
                    // if there are some attributes
                    const jsParameterSequence = Object.keys(Module.PARAMETERS)
                    const cppParameterSequence = parameters
                        .map((_) => _.name)
                    // console.log(jsParameterSequence)
                    // console.log(cppParameterSequence)
                    expect(cppParameterSequence).toEqual(jsParameterSequence)
                }
            })
        })
    })
})

