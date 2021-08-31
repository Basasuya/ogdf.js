import OGDF_MODULES from './modules'
import { PARAMETER_TYPE } from './parameter-type'

/**
 * Get default parameters according to PARAMETER_DEFINITION
 * e.g., getDefaultParameters(ogdf.layouts.layered.sugi.PARAMETER_DEFINITION)
 * ! Default parameters of OGDF_MODULES can also be computed,
 * but you should set PARAMETER_DEFINITION to OGDF_MODULES[module],
 * and set moduleName with your module choice
 * e.g. getDefaultParamters(OGDF_MODULES['EdgeInsertion']['FixedEmbedding'], 'FixedEmbedding')
 * @param {object} PARAMETER_DEFINITION
 * @param {string} moduleName
 * @returns {object} default parameters
 */
function getDefaultParameters(PARAMETER_DEFINITION, moduleName = null) {
    let result = {}
    let PD = PARAMETER_DEFINITION

    if (!PD) return {}
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

/**
 * Update old parameters (oldParameters) with new parameters (newParameters) according to PARAMETER_DEFINITION
 * ! parameters that not defined in PARAMETER_DEFINITION will be ignored
 * e.g., updateParameters({}, {x: 1}, ogdf.layouts.layered.sugi.PARAMETER_DEFINITION) will ignore the parameter [x] in newParameters (2nd arg)
 * updateParameters of OGDF_MODULES is also allowed
 * we guarantee both oldParameters and newParameters will not be changed in this function
 * @param {object} oldParameters
 * @param {object} newParameters
 * @param {object} PARAMETER_DEFINITION
 * @returns {object} a copy of updated oldParameters
 */
function updateParameters(oldParameters, newParameters, PARAMETER_DEFINITION) {
    oldParameters = oldParameters ? JSON.parse(JSON.stringify(oldParameters)) : {}
    newParameters = newParameters ? JSON.parse(JSON.stringify(newParameters)) : {}
    const resultParameters = {}
    if (!PARAMETER_DEFINITION) throw Error(`ParameterError: PARAMETER_DEFINITION is not defined.`)

    Object.keys(PARAMETER_DEFINITION).forEach((paramName) => {
        if (PARAMETER_DEFINITION[paramName].type !== PARAMETER_TYPE.MODULE) {
            let value = PARAMETER_DEFINITION[paramName].default

            if (paramName in oldParameters) value = oldParameters[paramName]

            if (paramName in newParameters) value = newParameters[paramName]

            const PD = PARAMETER_DEFINITION
            const isCategorical =
                PD[paramName].type == PARAMETER_TYPE.CATEGORICAL &&
                PD[paramName].range.indexOf(value) >= 0
            const isNumerical =
                (PD[paramName].type == PARAMETER_TYPE.INT ||
                    PD[paramName].type == PARAMETER_TYPE.DOUBLE) &&
                value >= PD[paramName].range[0] &&
                value <= PD[paramName].range[1] &&
                value !== Infinity &&
                value !== -Infinity
            const isBoolean = PD[paramName].type == PARAMETER_TYPE.BOOL && typeof value == 'boolean'

            if (isCategorical || isNumerical || isBoolean) {
                resultParameters[paramName] = value
            } else {
                throw Error(
                    `ParameterRangeError: can not set ${paramName} to ${value} with type of ${PD[paramName].type} range in [${PD[paramName].range}].`
                )
            }
        } else {
            const module = PARAMETER_DEFINITION[paramName].module
            let moduleChoice = PARAMETER_DEFINITION[paramName].default

            function prepareModuleParameters(parameters, moduleChoice) {
                if (typeof parameters == 'object') {
                    if (parameters.module) {
                        moduleChoice = parameters.module
                    }
                } else {
                    // supporting set module to be a string
                    // but the string will be converted into a standard module parameter object
                    moduleChoice = parameters
                    parameters = {}
                }

                if (!(moduleChoice in OGDF_MODULES[module])) {
                    throw Error(
                        `ParameterRangeError: Module ${module} cannot be set to ${moduleChoice}.`
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
 * get a list of parameters each with its key, value (a numerical/boolean value, categorical value will be converted into numerical), type, and isOriginParameter(means it is defined by the origin cpp library)
 * same to getDefaultParameters and updateParameters, it can be used with OGDF_MODULES
 * @param {object} parameter
 * @param {object} ORIGIN_PARAMETER_DEFINITION
 * @param {object} OUTER_PARAMETER_DEFINITION
 * @returns [{key, value, type, isOriginParameter}, ...], the order follows the deep first traversal of {...ORIGIN_PARAMETER_DEFINITION, ...OUTER_PARAMETER_DEFINITION};
 * !The order of origin parameters should keep same to their order in cpp code,
 * it will be tested by running `npm run test`
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
