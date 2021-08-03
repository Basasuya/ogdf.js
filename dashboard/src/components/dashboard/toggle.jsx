import Changer from './changer.jsx'
import React from 'react'
import { Switch } from 'antd'
import 'antd/dist/antd.css'
class Toggle extends Changer {
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(checked) {
        super.changeParam(checked)
    }

    render() {
        //let checkedChildren = this.props.name + ': TRUE'
        //let unCheckedChildren = this.props.name + ': FALSE'
        let checkedChildren = 'TRUE'
        let unCheckedChildren = 'FALSE'
        return (
            <Switch
                defaultChecked={this.props.value}
                checkedChildren={checkedChildren}
                unCheckedChildren={unCheckedChildren}
                onChange={this.handleChange}
            />
        )
    }
}
export default Toggle
