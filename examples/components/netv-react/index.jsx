import React from 'react'
import ReactDOM from 'react-dom'
import NetV from 'netv'

function getNodeLinkMagnitude(data) {
    const nodeLength = data.nodes.length
    const linkLength = data.links.length
    const nodeMagnitude =
        nodeLength < 1e2
            ? 1e2
            : nodeLength < 1e3
            ? 1e3
            : nodeLength < 1e4
            ? 1e4
            : nodeLength < 1e5
            ? 1e5
            : nodeLength < 1e6
            ? 1e6
            : nodeLength < 1e7
            ? 1e7
            : nodeLength < 1e8
            ? 1e8
            : nodeLength < 1e9
            ? 1e9
            : 1e10
    const linkMagnitude =
        linkLength < 1e3
            ? 1e3
            : linkLength < 1e4
            ? 1e4
            : linkLength < 1e5
            ? 1e5
            : linkLength < 1e6
            ? 1e6
            : linkLength < 1e7
            ? 1e7
            : linkLength < 1e8
            ? 1e8
            : linkLength < 1e9
            ? 1e9
            : 1e10
    return { nodeLimit: nodeMagnitude, linkLimit: linkMagnitude }
}
export default class NetVElement extends React.Component {
    constructor(props) {
        super(props)
        this.width = props.width || 400
        this.height = props.height || 300
        this.adaption = props.adaption || true
    }

    componentDidMount() {
        this.data =
            typeof this.props.data === 'string'
                ? new NetV({
                      container: ReactDOM.findDOMNode(this)
                  }).loadDataset(this.props.data)
                : this.props.data
        ReactDOM.findDOMNode(this).removeChild(ReactDOM.findDOMNode(this).firstChild) // netv will create new canvas, remove the old one
        this.netv = new NetV({
            container: ReactDOM.findDOMNode(this),
            width: this.width,
            height: this.height,
            ...getNodeLinkMagnitude(this.data)
        })
        this.onGraphChange = this.onGraphChange.bind(this)
    }

    componentDidUpdate(props) {
        if (this.props.data !== props.data) {
            this.data =
                typeof this.props.data === 'string'
                    ? this.netv.loadDataset(this.props.data)
                    : this.props.data
            ReactDOM.findDOMNode(this).removeChild(ReactDOM.findDOMNode(this).firstChild)
            this.netv = new NetV({
                container: ReactDOM.findDOMNode(this),
                width: this.width,
                height: this.height,
                ...getNodeLinkMagnitude(this.data)
            })
        }
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
