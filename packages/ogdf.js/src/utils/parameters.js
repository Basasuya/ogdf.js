import OGDF_MODULES from './modules'
import { PARAMETER_TYPE } from './parameter-type'

function getDefaultParameters(PARAMETER_DEFINITIONS) {
    let result = {}
    let PD = PARAMETER_DEFINITIONS
    Object.keys(PD).forEach((key) => {
        const defaultValue = PD[key].default
        result[key] = defaultValue
        if (PD[key].type === PARAMETER_TYPE.MODULE) {
            let moduleName = PD[key].module
            if (!OGDF_MODULES[moduleName] || !OGDF_MODULES.RANGES[moduleName]) {
                throw Error(
                    `OGDFModuleError: Module name ${moduleName} has not been defined, please check OGDF_MODULES.`
                )
            }
            result[defaultValue] = getDefaultParameters(OGDF_MODULES[moduleName][defaultValue])
        }
    })
    return result
}

function getOriginParameterSequence(ORIGIN_PARAMETER_DEFINITIONS, parameters) {
    let sequence = []
    const OPD = ORIGIN_PARAMETER_DEFINITIONS
    Object.keys(OPD).forEach((paramName) => {
        sequence.push(paramName)
        if (OPD[paramName].type === PARAMETER_TYPE.MODULE) {
            const moduleName = OPD[paramName].module
            if (!OGDF_MODULES[moduleName] || !OGDF_MODULES.RANGES[moduleName]) {
                throw Error(
                    `OGDFModuleError: Module name ${parameters[paramName].module} has not been defined, please check OGDF_MODULES.`
                )
            }

            const moduleValue = parameters[paramName]
            const subsequence = getOriginParameterSequence(
                OGDF_MODULES[moduleName][moduleValue],
                parameters[moduleValue]
            )
            subsequence.forEach((subParamName) => {
                sequence.push(paramName + '.' + subParamName)
            })
        }
    })
    return sequence
}

// function getOriginParameterSequence(parameters) {
//     let sequence = []
//     for (let paramName in parameters) {
//         sequence.push(paramName)
//         if (parameters[paramName].type === PARAMETER_TYPE.MODULE) {
//             if (
//                 !OGDF_MODULES[parameters[paramName].module] ||
//                 !OGDF_MODULES.RANGES[parameters[paramName].module]
//             ) {
//                 throw Error(
//                     `OGDFModuleError: Module name ${parameters[paramName].module} has not been defined, please check OGDF_MODULES.`
//                 )
//             }
//             for (let moduleName in OGDF_MODULES[parameters[paramName].module]) {
//                 let ogdfModule = OGDF_MODULES[parameters[paramName].module][moduleName]
//                 let moduleSequence = getOriginParameterSequence(ogdfModule)
//                 for (let moduleParamName of moduleSequence) {
//                     if (sequence.indexOf(moduleParamName) < 0)
//                         // parameter not included
//                         sequence.push(moduleParamName)
//                 }
//             }
//         }
//     }
//     return sequence
// }

function getOriginalParameterValues(parameters, PARAMETERS, SEQUENCE) {
    let originalParameters = []
    for (let paramName in PARAMETERS) {
        if (PARAMETERS[paramName].type === PARAMETER_TYPE.MODULE) {
            originalParameters[SEQUENCE.indexOf(paramName)] = OGDF_MODULES.RANGES[
                PARAMETERS[paramName].module
            ].indexOf(parameters[paramName])
            if (PARAMETERS[paramName].module) {
                let module = OGDF_MODULES[PARAMETERS[paramName].module][parameters[paramName]]
                getOriginalParameterValues(parameters, module, SEQUENCE).forEach((value, index) => {
                    if (value !== undefined) originalParameters[index] = value
                })
            }
        } else if (PARAMETERS[paramName].type === PARAMETER_TYPE.CATEGORICAL) {
            originalParameters[SEQUENCE.indexOf(paramName)] = PARAMETERS[paramName].range.indexOf(
                parameters[paramName]
            )
        } else if (PARAMETERS[paramName]) {
            originalParameters[SEQUENCE.indexOf(paramName)] = parameters[paramName]
        }
    }
    return originalParameters
}

export {
    PARAMETER_TYPE,
    getDefaultParameters,
    getOriginalParameterValues,
    getOriginParameterSequence
}
