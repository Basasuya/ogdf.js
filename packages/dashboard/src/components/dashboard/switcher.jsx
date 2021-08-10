import Changer from './changer.jsx'
import React from 'react'
import { Radio } from 'antd'
class Switcher extends Changer {
    constructor(props) {
        super(props)
        this.state = { value: props.value }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(event) {
        this.setState({
            value: event.target.value
        })
        super.changeParam(event.target.value)
    }

    render() {
        return (
            <div>
                {/* <p>
                    {this.props.name}:{this.state.value}
                </p> */}
                <Radio.Group onChange={this.handleChange} value={this.state.value}>
                    {this.props.range.map((option) => {
                        return (
                            <Radio value={option} key={option}>
                                {option}
                            </Radio>
                        )
                    })}
                </Radio.Group>
            </div>
        )
    }
}
export default Switcher
