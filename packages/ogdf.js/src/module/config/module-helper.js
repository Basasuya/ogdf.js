import { PARAMETER_TYPE } from '../../utils/parameters'
import * as deepmerge from 'deepmerge'

export default function createModule(NAME, MODULE_DIRECTORY) {
    class OgdfModule {
        constructor() {
            this.ModuleName = NAME
            this.BaseModuleName = NAME
            this._sequence = []
            this._parameters = {}
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
                    for (let paramName of this._sequence) {
                        if (this._PARAMETERS[paramName].type === PARAMETER_TYPE.MODULE) {
                            if (!this._PARAMETERS[paramName].module)
                                throw Error(`OGDFModuleDependencyError: Module ${NAME}.${this.ModuleName} needs dependency ${this._PARAMETERS[paramName].module}.`)
                            const PD = this._PARAMETERS[paramName].default.PARAMETER_DEFINITION
                            let params = {}
                            Object.keys(PD).forEach(key => {
                                if (PD[key].type === PARAMETER_TYPE.MODULE) params[key] = new (PD[key].default)()
                                else params[key] = PD[key].default
                            })
                            params = deepmerge(params, parameter[paramName] || {})
                            this[paramName] = new (this._PARAMETERS[paramName].default)(params)
                        }
                        else {
                            this[paramName] = parameter[paramName] || MODULE_DIRECTORY[this.ModuleName][paramName].default
                        }
                        this._parameters[paramName] = this[paramName]
                    }
                } else if (typeof parameter == 'string') {
                    // e.g., this.parameters("useHighLevelOptions", true)
                    // e.g., this.parameters("multilevelBuilderType.module", "EdgeCoverMerger")
                    // e.g., this.parameters("multilevelBuilderType.edgeLengthAdjustment")
                    if (this._sequence.indexOf(parameter) >= 0)
                        this._parameters[paramName] = this[paramName] = value
                }
            }
            return this._parameters
        }
    }
    for (let MODULE_NAME in MODULE_DIRECTORY) {
        OgdfModule[MODULE_NAME] = class extends OgdfModule {
            constructor(configs = {}) {
                super()
                this.ModuleName = MODULE_NAME
                this._PARAMETERS = MODULE_DIRECTORY[MODULE_NAME]
                this._sequence = Object.keys(MODULE_DIRECTORY[MODULE_NAME])
                this._parameters = {}
                this.parameters(configs)
            }
        }
        OgdfModule[MODULE_NAME].PARAMETER_DEFINITION = MODULE_DIRECTORY[MODULE_NAME]
    }
    OgdfModule.NAME = NAME
    return OgdfModule
}