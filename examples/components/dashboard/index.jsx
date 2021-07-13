import Changer from './changer.jsx'
import Switcher from './switcher.jsx'
import Toggle from './toggle.jsx'
import Transformator from './transformator.jsx'
import { PARAMETER_TYPE, getDefaultValueOfParameters } from '../../../src/utils/parameters'
import React from 'react'
import { Collapse } from 'antd'
const { Panel } = Collapse
class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.callback = props.callback
        this.layoutName = props.layoutName
        this.params = {}
    }

    componentDidUpdate(props) {
        if (this.props.layoutName !== props.layoutName) {
            this.callback = this.props.callback
            this.layoutName = this.props.layoutName
            this.params = {}
            this.setState({})
        }
    }

    render() {
        const setters = []
        const PARAMETERS = window[this.layoutName].parameters
        const parameters = {
            ...getDefaultValueOfParameters(PARAMETERS),
            ...this.params
        }
        const getChanger = (name) => {
            if (PARAMETERS[name].type === PARAMETER_TYPE.BOOL) {
                return <Toggle name={name} value={parameters[name]} params={this.params}></Toggle>
            } else if (PARAMETERS[name].type === PARAMETER_TYPE.CATEGORICAL) {
                return (
                    <Switcher
                        name={name}
                        value={parameters[name]}
                        range={PARAMETERS[name].range}
                        params={this.params}
                    ></Switcher>
                )
            } else {
                return (
                    <Transformator
                        name={name}
                        value={parameters[name]}
                        range={PARAMETERS[name].range}
                        params={this.params}
                    ></Transformator>
                )
            }
        }
        for (let name in PARAMETERS) {
            let setter = (
                <Panel header={name} key={name}>
                    {getChanger(name)}
                </Panel>
            )
            setters.push(setter)
        }
        return (
            <div>
                <Changer params={this.params} onChange={this.callback} />
                <Collapse accordion>{setters}</Collapse>
            </div>
        )
    }
}
export default Dashboard
