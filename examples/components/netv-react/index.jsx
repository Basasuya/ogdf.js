import React from 'react'
import ReactDOM from 'react-dom'
import NetV from 'netv'

export default class NetVElement extends React.Component {
    constructor(props) {
        super(props)
        this.width = props.width || 400
        this.height = props.height || 300
        this.adaption = props.adaption || true
    }

    componentDidMount() {
        this.netv = new NetV({
            container: ReactDOM.findDOMNode(this),
            width: this.width,
            height: this.height
        })
        this.data =
            typeof this.props.data === 'string'
                ? this.netv.loadDataset(this.props.data)
                : this.props.data
        this.onGraphChange = this.onGraphChange.bind(this)
    }

    onGraphChange(graph) {
        this.netv.data(
            this.adaption
                ? NetV.Utils.transformGraphPosition(
                      graph,
                      Math.min(this.width, this.height) * 0.9,
                      this.width / 2,
                      this.height / 2
                  )
                : graph
        )
        this.netv.draw()
    }

    render() {
        return <div></div>
    }
}
