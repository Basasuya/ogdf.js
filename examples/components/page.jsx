import { Menu, Layout } from 'antd'
import React from 'react'
import Dashboard from './dashboard/index.jsx'
import NetVElement from './netv-react/index.jsx'
const { Sider, Content, Footer, Header } = Layout

class OGDFLayoutTestPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            layout: 'fm3',
            data: 'miserables'
        }
        this.onKeyChange = this.onKeyChange.bind(this)
        this.onDataChange = this.onDataChange.bind(this)
        this.netv = null
        this.setNetVRef = (element) => {
            this.netv = element
        }
        this.callback = (params) => {
            window[this.state.layout](this.netv.data, params, this.netv.onGraphChange)
        }
    }

    onKeyChange(event) {
        let key = event.key
        window[key](this.netv.data, {}, this.netv.onGraphChange)
        this.setState({ layout: key }, () => {
            this.forceUpdate()
        })
    }

    onDataChange(data) {
        this.setState({ data })
    }

    componentDidMount() {
        window[this.state.layout](this.netv.data, {}, this.netv.onGraphChange)
    }

    render() {
        return (
            <Layout className="layout">
                <Layout>
                    <Header>
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
                    </Header>
                    <Content>
                        <NetVElement
                            width="500"
                            height="500"
                            data={this.state.data}
                            onDataChange={this.onDataChange}
                            adaption={true}
                            ref={this.setNetVRef}
                        ></NetVElement>
                    </Content>
                    <Footer></Footer>
                </Layout>
                <Sider>
                    <Dashboard layoutName={this.state.layout} callback={this.callback}></Dashboard>
                </Sider>
            </Layout>
        )
    }
}
export default OGDFLayoutTestPage
