import Changer from './changer.jsx'
import React from 'react'
import { InputNumber } from 'antd'
class Transformator extends Changer {
    constructor(props) {
        super(props)
        this.name = props.name
        this.state = { value: props.value }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(value) {
        this.setState({ value })
        super.changeParam(value)
    }

    render() {
        return (
            <div>
                {this.props.name}:
                <InputNumber
                    onChange={this.handleChange}
                    min={this.props.range[0]}
                    max={this.props.range[1]}
                    defaultValue={this.props.value}
                />
            </div>
        )
    }
}
export default Transformator
