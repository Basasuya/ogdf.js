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
                        this._parameters[parameter] = this[parameter] = value
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
        value() {
            let self = this
            let value = {
                type: PARAMETER_TYPE.MODULE,
                range: this.constructor.SubModuleList.map((value) =>
                    value.getParamaterDefinitionTree()
                ),
                default: this.constructor.getParamaterDefinitionTree()
            }
            let parameters = {}
            // parameter node: type, range, default, value
            // module node: name, parameters
            this.constructor.SEQUENCE.forEach((name) => {
                let P = this.constructor.PARAMETERS[name]
                let proxy = {}
                if (P.type === PARAMETER_TYPE.MODULE) {
                    proxy = self[name].value()
                } else {
                    proxy.value = self[name]
                }
                parameters[name] = proxy
            })
            value.value = deepmerge({ parameters }, value.default)
            return value
        }
        static getParamaterDefinitionTree() {
            let self = this
            let definitions = {
                name: this.ModuleName,
                parameters: {}
            }
            this.SEQUENCE.forEach((name) => {
                let P = self.PARAMETERS[name]
                if (P.type === PARAMETER_TYPE.MODULE) {
                    definitions.parameters[name] = {
                        type: PARAMETER_TYPE.MODULE,
                        range: self.PARAMETERS[name].module.SubModuleList.map((value) =>
                            value.getParamaterDefinitionTree()
                        )
                    }
                    definitions.parameters[name].default =
                        self.PARAMETERS[name].default.getParamaterDefinitionTree()
                } else definitions.parameters[name] = self.PARAMETER_DEFINITION[name]
            })
            return definitions
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
                        // range test
                        let type = target.constructor.PARAMETERS[param].type
                        if (type === PARAMETER_TYPE.INT || type === PARAMETER_TYPE.DOUBLE) {
                            if (
                                value < target.constructor.PARAMETERS[param].range[0] ||
                                value > target.constructor.PARAMETERS[param].range[1]
                            )
                                throw Error(
                                    `OGDFOutOfRangeError: Parameter ${param} needs a number between ${target.constructor.PARAMETERS[param].range[0]} and ${target.constructor.PARAMETERS[param].range[1]}, but got ${value}.`
                                )
                        } else if (type === PARAMETER_TYPE.CATEGORICAL) {
                            if (target.constructor.PARAMETERS[param].range.indexOf(value) < 0)
                                throw Error(
                                    `OGDFCategoryNotFoundError: Parameter ${param} needs one of category in ${target.constructor.PARAMETERS[
                                        param
                                    ].range.join(',')}, but got ${value}.`
                                )
                        } else if (type === PARAMETER_TYPE.MODULE) {
                            // module type check
                            if (value instanceof target.constructor.PARAMETERS[param].module) {
                                target[param] = value
                                return true
                            } else if (value instanceof VirtualModule)
                                throw Error(
                                    `OGDFModuleTypeError: Parameter ${param} needs a ${target.constructor.PARAMETERS[param].module.BaseModuleName} object, but got ${value.constructor.BaseModuleName}.`
                                )
                            else
                                throw Error(
                                    `OGDFModuleTypeError: Parameter ${param} needs a ${
                                        target.constructor.PARAMETERS[param].module.BaseModuleName
                                    } object, but got ${typeof value}.`
                                )
                        }
                        target[param] = value
                        if (target.constructor.SEQUENCE.indexOf(param) >= 0) {
                            target._parameters[param] = value
                        }
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
