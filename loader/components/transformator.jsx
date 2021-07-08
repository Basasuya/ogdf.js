const Changer = require('./changer.jsx').default
class Transformator extends Changer {
    constructor(props) {
        super(props)
        this.name = props.name
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
                    {this.props.name}:
                    <input type="number" onChange={this.handleChange} value={this.state.value} />
                </p>
            </div>
        )
    }
}
export default Transformator
