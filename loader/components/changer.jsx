const React = require('react')
class Changer extends React.Component {
    constructor(props) {
        super(props)
        this.params = props.params
        this.onChange = props.onChange
        this.state = { params: props.params }
        this.changeParam = this.changeParam.bind(this)
    }

    changeParam(value) {
        this.params[this.props.name] = value
        this.setState({
            params: this.params
        })
        this.onChange(this.params)
    }
}
export default Changer
