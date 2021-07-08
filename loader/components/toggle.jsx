const Changer = require('./changer.jsx').default
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
            <button onClick={this.handleClick}>
                {this.props.name}:{this.state.value ? 'TRUE' : 'FALSE'}
            </button>
        )
    }
}
export default Toggle
