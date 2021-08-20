import OGDF_MODULES from './modules'
import { PARAMETER_TYPE } from './parameter-type'

function getDefaultParameters(PARAMETER_DEFINITION, moduleName = null) {
    let result = {}
    let PD = PARAMETER_DEFINITION
    Object.keys(PD).forEach((key) => {
        const defaultValue = PD[key].default
        result[key] = defaultValue
        if (PD[key].type === PARAMETER_TYPE.MODULE) {
            const module = PD[key].module
            const moduleChoice = PD[key].default
            if (!OGDF_MODULES[module] || !OGDF_MODULES.RANGES[module]) {
                throw Error(
                    `OGDFModuleError: Module name ${module} has not been defined, please check OGDF_MODULES.`
                )
            }
            result[key] = getDefaultParameters(OGDF_MODULES[module][moduleChoice], moduleChoice)
        }
    })
    if (moduleName) {
        result.module = moduleName
    }
    return result
}

function updateParameters(oldParameters, newParameters, PARAMETER_DEFINITION) {
    Object.keys(newParameters).forEach((paramName) => {
        if (paramName in oldParameters) {
            const newValue = newParameters[paramName]
            const oldValue = oldParameters[paramName]
            oldParameters[paramName] = newValue
            if (PARAMETER_DEFINITION[paramName].type == PARAMETER_TYPE.MODULE) {
                const module = PARAMETER_DEFINITION[paramName].module
                if (typeof newValue == 'string' && newValue in OGDF_MODULES[module]) {
                    const moduleChoice = newValue
                    // only gives a module name, we should generate all parameters by default
                    oldParameters[paramName] = getDefaultParameters(
                        OGDF_MODULES[module][moduleChoice],
                        moduleChoice
                    )
                } else {
                    const moduleChoice = newValue.module
                    if (moduleChoice && moduleChoice in OGDF_MODULES[module]) {
                        if (moduleChoice !== oldValue.module) {
                            oldParameters[paramName] = {}
                        }
                        updateParameters(oldParameters[paramName], newValue, OGDF_MODULES[module])
                    } else {
                        throw Error(
                            `OGDFModuleError: Module ${module} cannot be set to ${newValue.module}.`
                        )
                    }
                }
            }
        }
    })
}

/**
 *
 * @param {*} parameter
 * @param {*} ORIGIN_PARAMETER_DEFINITION
 * @param {*} OUR_PARAMETER_DEFINITION
 * @returns [{key, value, isOriginParameter}, ...], the order follows the deep first traversal of {...ORIGIN_PARAMETER_DEFINITION, ...OUR_PARAMETER_DEFINITION};
 * !The order of origin parameters should keep same to their order in cpp code
 */
function getParameterEntries(parameters, ORIGIN_PARAMETER_DEFINITION, OUR_PARAMETER_DEFINITION) {
    let entries = []
    const PD = {
        ...ORIGIN_PARAMETER_DEFINITION,
        ...OUR_PARAMETER_DEFINITION
    }
    const ORIPD = ORIGIN_PARAMETER_DEFINITION
    const OURPD = OUR_PARAMETER_DEFINITION
    Object.keys(ORIPD).forEach((paramName) => {
        iteration(paramName, /*isOriginParameter*/ true)
    })
    Object.keys(OURPD).forEach((paramName) => {
        iteration(paramName, /*isOriginParameter*/ false)
    })

    function iteration(paramName, isOriginParameter) {
        if (PD[paramName].type === PARAMETER_TYPE.MODULE) {
            const module = PD[paramName].module
            if (!OGDF_MODULES[module] || !OGDF_MODULES.RANGES[module]) {
                throw Error(
                    `OGDFModuleError: Module name ${parameters[paramName].module} has not been defined, please check OGDF_MODULES.`
                )
            }

            const moduleParameters = parameters[paramName]
            const subEntries = getParameterEntries(
                moduleParameters,
                OGDF_MODULES[module][moduleParameters.module],
                {}
            )
            subEntries.forEach((subEntry) => {
                if (subEntry[0] == 'module') {
                    entries.push({
                        key: paramName,
                        value: moduleParameters.module,
                        isOriginParameter: false
                    })
                } else {
                    entries.push(subEntry)
                }
            })
        } else {
            entries.push({
                key: paramName,
                value: parameters[paramName],
                isOriginParameter
            })
        }
    }
    return entries
}

export { PARAMETER_TYPE, getDefaultParameters, updateParameters, getParameterEntries }
