import Changer from './changer.jsx'
import React from 'react'
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
                <p>
                    {this.props.name}:{this.state.value}
                </p>
                {this.props.range.map((option) => {
                    return (
                        <p key={option}>
                            {option}
                            <input
                                type="radio"
                                name={this.props.name}
                                value={option}
                                onChange={this.handleChange}
                            />
                        </p>
                    )
                })}
            </div>
        )
    }
}
export default Switcher
