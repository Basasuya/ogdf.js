import OGDF_MODULES from "./modules"

export function getDefaultValueOfParameters(parameters) {
    let result = {}
    Object.keys(parameters).forEach((key) => {
        result[key] = parameters[key].default
        if (parameters[key].type === PARAMETER_TYPE.MODULE) {
            if (!OGDF_MODULES[parameters[key].module] || !OGDF_MODULES.RANGES[parameters[key].module]) {
                throw Error(`OGDFModuleError: Module name ${parameters[key].module} has not been defined, please check OGDF_MODULES.`)
            }
            result = {
                ...result,
                ...getDefaultValueOfParameters(OGDF_MODULES[parameters[key].module][parameters[key].default])
            }
        }
    })
    return result
}

export function getOriginParameterSequence(parameters) {
    let sequence = []
    for (let paramName in parameters) {
        sequence.push(paramName)
        if (parameters[paramName].type === PARAMETER_TYPE.MODULE) {
            if (!OGDF_MODULES[parameters[paramName].module] || !OGDF_MODULES.RANGES[parameters[paramName].module]) {
                throw Error(`OGDFModuleError: Module name ${parameters[paramName].module} has not been defined, please check OGDF_MODULES.`)
            }
            for (let moduleName in OGDF_MODULES[parameters[paramName].module]) {
                let ogdfModule = OGDF_MODULES[parameters[paramName].module][moduleName]
                let moduleSequence = getOriginParameterSequence(ogdfModule)
                for (let moduleParamName of moduleSequence) {
                    if (sequence.indexOf(moduleParamName) < 0) // parameter not included
                        sequence.push(moduleParamName)
                }
            }
        }
    }
    return sequence
}

export function getOriginalParameters(parameters, PARAMETERS, SEQUENCE) {
    let originalParameters = []
    for (let paramName in PARAMETERS) {
        if (PARAMETERS[paramName].type === PARAMETER_TYPE.MODULE) {
            originalParameters[SEQUENCE.indexOf(paramName)] = OGDF_MODULES.RANGES[PARAMETERS[paramName].module].indexOf(parameters[paramName])
            if (PARAMETERS[paramName].module) {
                let module = OGDF_MODULES[PARAMETERS[paramName].module][parameters[paramName]]
                getOriginalParameters(parameters, module, SEQUENCE).forEach((value, index) => {
                    if (value !== undefined) originalParameters[index] = value
                })
            }
        } else if (PARAMETERS[paramName].type === PARAMETER_TYPE.CATEGORICAL) {
            originalParameters[SEQUENCE.indexOf(paramName)] = PARAMETERS[paramName].range.indexOf(parameters[paramName])
        } else if (PARAMETERS[paramName]) {
            originalParameters[SEQUENCE.indexOf(paramName)] = parameters[paramName]
        }
    }
    return originalParameters
}

export const PARAMETER_TYPE = {
    MODULE: "MODULE",
    CATEGORICAL: "CATEGORICAL",
    INT: "INT",
    DOUBLE: "DOUBLE",
    BOOL: "BOOL",
}
