import { Menu, Row, Col, Upload, message, Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import React from 'react'
import Dashboard from './dashboard/index.jsx'
import NetVElement from './netv-react/index.jsx'

class OGDFLayoutTestPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            layout: 'fm3',
            data: 'miserables'
        }
        this.onKeyChange = this.onKeyChange.bind(this)
        this.beforeDataUpload = this.beforeDataUpload.bind(this)
        this.netv = null
        this.setNetVRef = (element) => {
            this.netv = element
        }
        this.callback = (params) => {
            this.onDrawing()
            window[this.state.layout](this.netv.data, params, this.netv.onGraphChange)
        }
    }

    onKeyChange(event) {
        let key = event.key
        this.onDrawing()
        window[key](this.netv.data, {}, this.netv.onGraphChange)
        this.setState({ layout: key }, this.forceUpdate)
    }

    onDrawing() {
        message.loading(`Evaluating and drawing...`)
    }

    onDone() {
        message.destroy()
        message.success(`Congratulations! Graph drawing completed!`)
    }

    beforeDataUpload(file) {
        return new Promise((resolve) => {
            const reader = new FileReader()
            reader.readAsText(file)
            reader.onload = () => {
                const json = JSON.parse(reader.result)
                const data = { nodes: json.nodes, links: json.links }
                console.log(data)
                this.setState({ data }, () => {
                    this.onDrawing()
                    window[this.state.layout](this.netv.data, {}, this.netv.onGraphChange)
                })
            }
        })
    }

    componentDidMount() {
        this.onDrawing()
        window[this.state.layout](this.netv.data, {}, this.netv.onGraphChange)
    }

    render() {
        return (
            <>
                <Row>
                    <Col span={24}>
                        <Menu
                            mode="horizontal"
                            defaultSelectedKeys="fm3"
                            onSelect={this.onKeyChange}
                        >
                            <Menu.Item tab="DH" key="dh">
                                DavidsonHarel
                            </Menu.Item>
                            <Menu.Item tab="FM3" key="fm3">
                                FMMMLayout
                            </Menu.Item>
                            <Menu.Item tab="GEM" key="gem">
                                GEMLayout
                            </Menu.Item>
                            <Menu.Item tab="PMDS" key="pmds">
                                PivotMDS
                            </Menu.Item>
                            <Menu.Item tab="SM" key="sm">
                                StressMinimization
                            </Menu.Item>
                        </Menu>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                        <NetVElement
                            width="500"
                            height="500"
                            data={this.state.data}
                            autoTransform
                            ref={this.setNetVRef}
                            onDone={this.onDone}
                        ></NetVElement>
                    </Col>
                    <Col span={12}>
                        <Upload
                            action="localhost:8081/data"
                            beforeUpload={this.beforeDataUpload}
                            // onChange={this.onDataChange}
                        >
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                        <Dashboard
                            layoutName={this.state.layout}
                            callback={this.callback}
                        ></Dashboard>
                    </Col>
                </Row>
            </>
        )
    }
}
export default OGDFLayoutTestPage
