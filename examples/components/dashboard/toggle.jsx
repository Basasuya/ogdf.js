import Changer from './changer.jsx'
import React from 'react'
import { Button } from 'antd'
import 'antd/dist/antd.css'
class Toggle extends Changer {
    constructor(props) {
        super(props)
        this.state = { value: props.value }
        this.isToggleOn = props.value
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.setState((state) => ({
            value: !state.value
        }))
        this.isToggleOn = !this.isToggleOn
        super.changeParam(this.isToggleOn)
    }

    render() {
        return (
            <Button onClick={this.handleClick}>
                {this.props.name}:{this.state.value ? 'TRUE' : 'FALSE'}
            </Button>
        )
    }
}
export default Toggle
