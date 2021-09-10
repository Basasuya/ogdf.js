import {
    getDefaultParameters,
    updateParameters,
    PARAMETER_TYPE
} from '../../utils/parameters'
import * as deepmerge from 'deepmerge'

export default function createModule(NAME, MODULE_DIRECTORY) {
    class OgdfModule {
        constructor() {
            this.ModuleName = NAME
            this.BaseModuleName = NAME
        }
        malloc(OGDFModule) {
            let params = this._sequence.map(name => {
                let type = this._PARAMETERS[name].type
                if (type === PARAMETER_TYPE.CATEGORICAL) {
                    return this._PARAMETERS[name].range.indexOf(this[name])
                } else if (type === PARAMETER_TYPE.MODULE) {
                    return this[name].malloc(OGDFModule)
                } else return this[name]
            })
            this._buffer = OGDFModule[`_${this.BaseModuleName}_${this.ModuleName}`](...params)
            return this._buffer
        }
        free() {
            this._sequence.forEach(name => {
                let type = this._PARAMETERS[name].type
                if (type === PARAMETER_TYPE.MODULE) {
                    return this[name].free()
                }
            })
            OGDFModule[`__delete`](this._buffer)
            this._buffer = undefined
        }
        parameters(parameter, value) {
            if (parameter) {
                if (typeof parameter == 'object') {
                    // this.parameters({ useHighLevelOptions: true })
                    this._parameters = updateParameters(
                        this._parameters,
                        parameter,
                        PARAMETER_DEFINITION
                    )
                } else if (typeof parameter == 'string') {
                    // e.g., this.parameters("useHighLevelOptions", true)
                    // e.g., this.parameters("multilevelBuilderType.module", "EdgeCoverMerger")
                    // e.g., this.parameters("multilevelBuilderType.edgeLengthAdjustment")
                    const parameterChain = parameter.split('.')
                    const newParam = JSON.parse(JSON.stringify(this._parameters))
                    let parentObj = newParam
                    for (let i = 0; i < parameterChain.length - 1; i++) {
                        parentObj = parentObj[parameterChain[i]]
                        if (!parentObj || !parentObj[parameterChain[i + 1]]) {
                            throw Error(
                                `ParameterError: Cannot find parameter ${parameter} in ${this.name}'s parameters`
                            )
                        }
                    }
                    const chainEnd = parameterChain[parameterChain.length - 1]
                    if (value !== undefined) {
                        parentObj[chainEnd] = value
                        this._parameters = updateParameters(this._parameters, newParam, PD)
                    } else {
                        return parentObj[chainEnd]
                    }
                }
            }
            return JSON.parse(JSON.stringify(this._parameters))
        }
    }
    for (let MODULE_NAME in MODULE_DIRECTORY) {
        OgdfModule[MODULE_NAME] = class extends OgdfModule {
            constructor(configs = {}) {
                super()
                this.ModuleName = MODULE_NAME
                this._PARAMETERS = MODULE_DIRECTORY[MODULE_NAME]
                this._sequence = Object.keys(MODULE_DIRECTORY[MODULE_NAME])
                for (let paramName of this._sequence) {
                    if (this._PARAMETERS[paramName].type === PARAMETER_TYPE.MODULE) {
                        if (!this._PARAMETERS[paramName].module)
                            throw Error(`OGDFModuleDependencyError: Module ${NAME}.${MODULE_NAME} needs dependency ${this._PARAMETERS[paramName].module}.`)
                        const PD = this._PARAMETERS[paramName].default.PARAMETER_DEFINITION
                        let params = {}
                        Object.keys(PD).forEach(key => {
                            if (PD[key].type === PARAMETER_TYPE.MODULE) params[key] = new (PD[key].default)()
                            else params[key] = PD[key].default
                        })
                        params = deepmerge(params, configs[paramName] || {})
                        this[paramName] = new (this._PARAMETERS[paramName].default)(params)
                    }
                    else {
                        this[paramName] = configs[paramName] || MODULE_DIRECTORY[MODULE_NAME][paramName].default
                    }
                }
            }
        }
        OgdfModule[MODULE_NAME].PARAMETER_DEFINITION = MODULE_DIRECTORY[MODULE_NAME]
    }
    OgdfModule.NAME = NAME
    return OgdfModule
}