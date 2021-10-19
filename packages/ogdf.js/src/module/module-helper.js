import { PARAMETER_TYPE } from '../utils/parameter-type'
import deepmerge from 'deepmerge'
class VirtualModule {}
export default function createModule(NAME, MODULE_DIRECTORY) {
    class BaseModule extends VirtualModule {
        /**
         * the base class name of ogdf module
         */
        static BaseModuleName = NAME
        /**
         * the class name of ogdf module
         */
        static ModuleName = NAME
        /**
         * the same as parameter definition
         */
        static PARAMETERS = {}
        /**
         * parameter definition
         */
        static PARAMETER_DEFINITION = {}
        /**
         * parameter sequence
         */
        static SEQUENCE = []
        /**
         * default parameters
         */
        static DEFAULT_PARAMETERS = {}
        constructor() {
            super()
            this._parameters = {}
        }
        /**
         * create an object correspond to ogdf entry
         * @param {*} OGDFModule initialized ogdf entry module
         * @returns the address of buffer
         */
        malloc(OGDFModule) {
            let params = this.constructor.SEQUENCE.map((name) => {
                let type = this.constructor.PARAMETERS[name].type
                if (type === PARAMETER_TYPE.CATEGORICAL) {
                    return this.constructor.PARAMETERS[name].range.indexOf(this[name])
                } else if (type === PARAMETER_TYPE.MODULE) {
                    return this[name].malloc(OGDFModule)
                } else return this[name]
            })
            this._buffer = OGDFModule[
                `_${this.constructor.BaseModuleName}_${this.constructor.ModuleName}`
            ](...params)
            return this._buffer
        }
        free() {
            this.constructor.SEQUENCE.forEach((name) => {
                let type = this.constructor.PARAMETERS[name].type
                if (type === PARAMETER_TYPE.MODULE) {
                    return this[name].free()
                }
            })
            OGDFModule[`__delete`](this._buffer)
            this._buffer = undefined
        }
        /**
         * get or set parameters of module object
         * @param {*} parameter
         * @param {*} value
         * @returns parameters
         */
        parameters(parameter, value) {
            if (parameter) {
                // parameter setter
                if (typeof parameter == 'object') {
                    // this.parameters({ useHighLevelOptions: true })
                    for (let paramName of this.constructor.SEQUENCE) {
                        if (this.constructor.PARAMETERS[paramName].type === PARAMETER_TYPE.MODULE) {
                            if (!this.constructor.PARAMETERS[paramName].module)
                                throw Error(
                                    `OGDFModuleDependencyError: Module ${NAME}.${this.constructor.ModuleName} should be a constructor but found ${this.constructor.PARAMETERS[paramName].module}.`
                                )
                            if (
                                parameter[paramName] &&
                                parameter[paramName].static &&
                                parameter[paramName].static.ModuleName &&
                                parameter[paramName].parameters
                            ) {
                                this[paramName] = new this.constructor.PARAMETERS[paramName].module[
                                    parameter[paramName].static.ModuleName
                                ](parameter[paramName].parameters)
                                this._parameters[paramName] = this[paramName]
                                continue
                            }
                            if (parameter[paramName] instanceof VirtualModule) {
                                if (
                                    parameter[paramName] instanceof
                                    this.constructor.PARAMETERS[paramName].module
                                ) {
                                    this[paramName] = parameter[paramName]
                                    this._parameters[paramName] = this[paramName]
                                    continue
                                } else
                                    throw Error(
                                        `OGDFModuleTypeError: ${parameter[paramName]} needs a ${this.constructor.PARAMETERS[paramName].module.BaseModuleName} object, but got ${parameter[paramName].constructor.BaseModuleName}`
                                    )
                            }
                            let params =
                                this.constructor.PARAMETERS[paramName].default.DEFAULT_PARAMETERS
                            params = deepmerge(params, parameter[paramName] || {})
                            this[paramName] = new this.constructor.PARAMETERS[paramName].default(
                                params
                            )
                        } else {
                            this[paramName] =
                                parameter[paramName] ||
                                MODULE_DIRECTORY[this.constructor.ModuleName][paramName].default
                        }
                        this._parameters[paramName] = this[paramName]
                    }
                } else if (typeof parameter == 'string') {
                    // e.g., this.parameters("useHighLevelOptions", true)
                    // e.g., this.parameters("multilevelBuilderType.module", "EdgeCoverMerger")
                    // e.g., this.parameters("multilevelBuilderType.edgeLengthAdjustment")
                    if (this.constructor.SEQUENCE.indexOf(parameter) >= 0)
                        this._parameters[paramName] = this[paramName] = value
                }
            }
            return this._parameters
        }
        /**
         * get json object for using
         * @returns json object
         */
        json() {
            let self = this
            let json = {
                static: {
                    BaseModuleName: this.constructor.BaseModuleName,
                    ModuleName: this.constructor.ModuleName
                },
                parameters: {},
                PARAMETER_DEFINITION: this.constructor.PARAMETER_DEFINITION
            }
            this.constructor.SEQUENCE.forEach((name) => {
                let P = this.constructor.PARAMETERS[name]
                if (P.type === PARAMETER_TYPE.MODULE) json.parameters[name] = self[name].json()
                else json.parameters[name] = self[name]
            })
            return json
        }
    }
    BaseModule.SubModuleList = []
    for (let MODULE_NAME in MODULE_DIRECTORY) {
        class Module extends BaseModule {
            static ModuleName = MODULE_NAME
            static PARAMETERS = MODULE_DIRECTORY[MODULE_NAME]
            static PARAMETER_DEFINITION = MODULE_DIRECTORY[MODULE_NAME]
            static SEQUENCE = Object.keys(MODULE_DIRECTORY[MODULE_NAME])
            static DEFAULT_PARAMETERS = (() => {
                let params = {}
                const PD = MODULE_DIRECTORY[MODULE_NAME]
                Object.keys(PD).forEach((key) => {
                    if (PD[key].type === PARAMETER_TYPE.MODULE) params[key] = new PD[key].default()
                    else params[key] = PD[key].default
                })
                return params
            })()
            constructor(configs = {}) {
                super()
                this.parameters(configs)
            }
        }
        let ModuleProxy = new Proxy(Module, {
            construct(target, args) {
                return new Proxy(new target(...args), {
                    get(target, param) {
                        return target[param]
                    },
                    set(target, param, value) {
                        if (param[0] === '_') {
                            target[param] = value
                            return true
                        }
                        if (value instanceof VirtualModule) {
                            if (value instanceof target.constructor.PARAMETERS[param].module) {
                                target[param] = value
                                return true
                            } else
                                throw Error(
                                    `OGDFModuleTypeError: Parameter ${param} needs a ${target.constructor.PARAMETERS[param].module.BaseModuleName} object, but got ${value.constructor.BaseModuleName}`
                                )
                        }
                        target[param] = value
                        if (target.constructor.SEQUENCE.indexOf(param) >= 0)
                            target._parameters[param] = value
                        return true
                    }
                })
            }
        })
        BaseModule[MODULE_NAME] = ModuleProxy
        BaseModule.SubModuleList.push(ModuleProxy)
    }
    return BaseModule
}
