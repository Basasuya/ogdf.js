import React from 'react'
import { Button } from 'antd'
import 'antd/dist/antd.css'
class Changer extends React.Component {
    constructor(props) {
        super(props)
        this.params = props.params
        this.onChange = props.onChange
        this.state = { params: props.params }
        this.changeParam = this.changeParam.bind(this)
        this.draw = this.draw.bind(this)
    }

    componentDidUpdate(props) {
        if (this.props.params !== props.params) {
            this.params = this.props.params
            this.setState({ params: this.params })
        }
    }

    changeParam(value) {
        this.params[this.props.name] = value
        this.setState({
            params: this.params
        })
    }

    draw() {
        this.onChange(this.state.params)
    }

    render() {
        return <Button onClick={this.draw}>Draw Graph</Button>
    }
}
export default Changer
