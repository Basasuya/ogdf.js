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
    oldParameters = JSON.parse(JSON.stringify(oldParameters))
    newParameters = JSON.parse(JSON.stringify(newParameters))
    const resultParameters = {}
    Object.keys(PARAMETER_DEFINITION).forEach((paramName) => {
        if (PARAMETER_DEFINITION[paramName].type !== PARAMETER_TYPE.MODULE) {
            let value = PARAMETER_DEFINITION[paramName].default
            if (paramName in newParameters) value = newParameters[paramName]
            else if (paramName in oldParameters) value = oldParameters[paramName]
            resultParameters[paramName] = value
        } else {
            const module = PARAMETER_DEFINITION[paramName].module
            let moduleChoice = PARAMETER_DEFINITION[paramName].default
            // let moduleParameters = getDefaultParameters(
            //     OGDF_MODULES[module][moduleChoice],
            //     moduleChoice
            // )

            // let parametersUsed2Updt = undefined // parameters used to update
            // if (paramName in newParameters) {
            //     parametersUsed2Updt = newParameters
            // } else if (paramName in oldParameters) {
            //     parametersUsed2Updt = oldParameters
            // }

            // if (parametersUsed2Updt) {
            //     const _moduleChoice = moduleChoice
            //     const modParamUsed2Updt = parametersUsed2Updt[paramName] // module parameter used to update
            //     if (typeof modParamUsed2Updt == 'string') {
            //         moduleChoice = modParamUsed2Updt
            //         modParamUsed2Updt = {}
            //     } else if (modParamUsed2Updt.module) {
            //         moduleChoice = modParamUsed2Updt.module
            //     }

            //     if (!(moduleChoice in OGDF_MODULES[module])) {
            //         throw Error(
            //             `OGDFModuleError: Module ${module} cannot be set to ${newValue.module}.`
            //         )
            //     }

            //     if (moduleChoice !== _moduleChoice) {
            //         moduleParameters = getDefaultParameters(
            //             OGDF_MODULES[module][moduleChoice],
            //             moduleChoice
            //         )
            //     }
            //     moduleParameters = {
            //         ...moduleParameters,
            //         ...modParamUsed2Updt
            //     }
            // }

            function prepareModuleParameters(parameters, moduleChoice) {
                if (typeof parameters == 'string') {
                    moduleChoice = parameters
                    parameters = {}
                } else if (parameters.module) {
                    moduleChoice = parameters.module
                }

                if (!(moduleChoice in OGDF_MODULES[module])) {
                    throw Error(
                        `OGDFModuleError: Module ${module} cannot be set to ${newValue.module}.`
                    )
                }

                let moduleParameters = getDefaultParameters(
                    OGDF_MODULES[module][moduleChoice],
                    moduleChoice
                )
                moduleParameters = {
                    ...moduleParameters,
                    ...parameters
                }
                return moduleParameters
            }

            let newModuleParameters = {}
            let oldModuleParameters = {}
            if (paramName in oldParameters) {
                oldModuleParameters = prepareModuleParameters(
                    oldParameters[paramName],
                    moduleChoice
                )
                moduleChoice = oldModuleParameters.module
            }
            if (paramName in newParameters) {
                newModuleParameters = prepareModuleParameters(
                    newParameters[paramName],
                    moduleChoice
                )
                moduleChoice = newModuleParameters.module
            }

            resultParameters[paramName] = updateParameters(
                oldModuleParameters,
                newModuleParameters,
                OGDF_MODULES[module][moduleChoice]
            )
            resultParameters[paramName].module = moduleChoice
        }
    })

    return resultParameters
}

/**
 *
 * @param {*} parameter
 * @param {*} ORIGIN_PARAMETER_DEFINITION
 * @param {*} OUTER_PARAMETER_DEFINITION
 * @returns [{key, value, isOriginParameter}, ...], the order follows the deep first traversal of {...ORIGIN_PARAMETER_DEFINITION, ...OUTER_PARAMETER_DEFINITION};
 * !The order of origin parameters should keep same to their order in cpp code
 */
function getParameterEntries(parameters, ORIGIN_PARAMETER_DEFINITION, OUTER_PARAMETER_DEFINITION) {
    let entries = []
    const PD = {
        ...ORIGIN_PARAMETER_DEFINITION,
        ...OUTER_PARAMETER_DEFINITION
    }
    const ORIPD = ORIGIN_PARAMETER_DEFINITION
    const OURPD = OUTER_PARAMETER_DEFINITION
    Object.keys(ORIPD).forEach((paramName) => {
        iteration(paramName, /*isOriginParameter*/ true)
    })
    Object.keys(OURPD).forEach((paramName) => {
        iteration(paramName, /*isOriginParameter*/ false)
    })

    function iteration(paramName, isOriginParameter) {
        if (!PD[paramName]) {
            throw Error(`ParameterError: does not has a parameter named ${paramName}.`)
        }

        if (PD[paramName]?.type === PARAMETER_TYPE.MODULE) {
            const module = PD[paramName].module
            if (!OGDF_MODULES[module] || !OGDF_MODULES.RANGES[module]) {
                throw Error(
                    `OGDFModuleError: Module name ${module} has not been defined, please check OGDF_MODULES.`
                )
            }
            const moduleChoice = (parameters[paramName]?.module ?? PD[paramName].default)
                .split('.')
                .pop()
            entries.push({
                key: paramName,
                value: OGDF_MODULES.RANGES[module].indexOf(moduleChoice),
                type: PARAMETER_TYPE.MODULE,
                isOriginParameter
            })
            OGDF_MODULES.RANGES[module].forEach((thisModuleChoice) => {
                const MODULE_DEFINITION = OGDF_MODULES[module][thisModuleChoice]
                let moduleParameters = getDefaultParameters(MODULE_DEFINITION, thisModuleChoice)
                if (moduleChoice == thisModuleChoice) {
                    moduleParameters = {
                        ...moduleParameters,
                        ...parameters[paramName]
                    }
                }
                const subEntries = getParameterEntries(
                    moduleParameters,
                    OGDF_MODULES[module][thisModuleChoice],
                    {}
                )
                subEntries.forEach((subEntry) => {
                    if (subEntry.key !== 'module') {
                        entries.push({
                            ...subEntry,
                            key: `${paramName}_${thisModuleChoice}_${subEntry.key}`
                        })
                    }
                })
            })
        } else if (PD[paramName]?.type == PARAMETER_TYPE.CATEGORICAL) {
            entries.push({
                key: paramName,
                value: PD[paramName].range.indexOf(parameters[paramName] ?? PD[paramName].default),
                type: PD[paramName].type,
                isOriginParameter
            })
        } else if (
            PD[paramName]?.type == PARAMETER_TYPE.INT ||
            PD[paramName]?.type == PARAMETER_TYPE.DOUBLE
        ) {
            // numerical
            const value = parameters[paramName] ?? PD[paramName].default
            if (value >= PD[paramName].range[0] && value <= PD[paramName].range[1]) {
                entries.push({
                    key: paramName,
                    value,
                    type: PD[paramName].type,
                    isOriginParameter
                })
            } else {
                throw Error(
                    `ParameterError: can not set ${paramName} to ${value} with range from ${PD[paramName].range[0]} to ${PD[paramName].range[0]}`
                )
            }
        } else if (PD[paramName]?.type == PARAMETER_TYPE.BOOL) {
            // numerical
            const value = parameters[paramName] ?? PD[paramName].default
            if (value == PD[paramName].range[0] || value == PD[paramName].range[1]) {
                entries.push({
                    key: paramName,
                    value,
                    type: PD[paramName].type,
                    isOriginParameter
                })
            } else {
                throw Error(`ParameterError: parameter ${paramName} is not a bool value.`)
            }
        } else {
            throw Error(
                `ParameterError: ${paramName}'s type is undefined or not defined in PARAMETER_TYPE.`
            )
        }
    }
    return entries
}

export { PARAMETER_TYPE, getDefaultParameters, updateParameters, getParameterEntries }
