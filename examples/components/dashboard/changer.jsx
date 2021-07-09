import React from 'react'
class Changer extends React.Component {
    constructor(props) {
        super(props)
        this.params = props.params
        this.onChange = props.onChange
        this.state = { params: props.params }
        this.changeParam = this.changeParam.bind(this)
        this.draw = this.draw.bind(this)
    }

    changeParam(value) {
        this.params[this.props.name] = value
        this.setState({
            params: this.params
        })
    }

    draw() {
        this.onChange(this.params)
    }

    render() {
        return <button onClick={this.draw}>Start</button>
    }
}
export default Changer
