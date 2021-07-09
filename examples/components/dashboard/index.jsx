import Changer from './changer.jsx'
import Switcher from './switcher.jsx'
import Toggle from './toggle.jsx'
import Transformator from './transformator.jsx'
import { PARAMETER_TYPE, getDefaultValueOfParameters } from '../../../src/utils/parameters'
import React from 'react'
import ReactDOM from 'react-dom'
class Dashboard {
    constructor(settings) {
        this.container = settings.container
        this.parameters = settings.parameters
        this.render = this.render.bind(this)
    }
    render(params, callback) {
        const setters = []
        const PARAMETERS = this.parameters
        const parameters = {
            ...getDefaultValueOfParameters(PARAMETERS),
            ...params
        }
        for (let name in PARAMETERS) {
            let setter
            if (PARAMETERS[name].type === PARAMETER_TYPE.BOOL) {
                setter = (
                    <Toggle
                        key={name}
                        name={name}
                        value={parameters[name]}
                        params={params}
                    ></Toggle>
                )
            } else if (PARAMETERS[name].type === PARAMETER_TYPE.CATEGORICAL) {
                setter = (
                    <Switcher
                        key={name}
                        name={name}
                        value={parameters[name]}
                        range={PARAMETERS[name].range}
                        params={params}
                    ></Switcher>
                )
            } else {
                setter = (
                    <Transformator
                        key={name}
                        name={name}
                        value={parameters[name]}
                        params={params}
                    ></Transformator>
                )
            }
            setters.push(setter)
        }
        const controller = (
            <div>
                {setters}
                <Changer params={params} onChange={callback} />
            </div>
        )
        ReactDOM.render(controller, this.container)
    }
}
export default Dashboard
