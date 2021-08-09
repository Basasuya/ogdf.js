import Changer from './changer.jsx'
import React from 'react'
import { InputNumber , Slider } from 'antd'
class Transformator extends Changer {
    constructor(props) {
        super(props)
        this.name = props.name
        this.state = { value: props.value }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(value) {
        this.setState({ value })
        super.changeParam(value)
    }

    testInfinity(maxValue,defaultValue){
        // console.log("maxValue=:",maxValue[0],maxValue[1])
        // console.log("defaultValue=:",defaultValue)
        if(maxValue[1]=='Infinity'||'null'){
            if(defaultValue==0){
                return 100;
            }
            else{
                return 5*defaultValue;
            }
        }
        else{
            return maxValue[1];
        }
    }

    getStep(minValue,maxValue){
        console.log("getStep:",(maxValue-minValue)/100);
        return (maxValue-minValue)/100;
    }

    render() {
        return (
            <div>
                {/* {this.props.name}: */}
                {/* <InputNumber
                    onChange={this.handleChange}
                    min={this.props.range[0]}
                    max={this.props.range[1]}
                    defaultValue={this.props.value}
                /> */}
                <Slider
                    onChange={this.handleChange} 
                    min={this.props.range[0]}
                    max={this.testInfinity(this.props.range,this.props.value)}
                    defaultValue={this.props.value}
                    step={this.getStep(this.props.range[0],this.testInfinity(this.props.range,this.props.value))}                             
                >
                </Slider>
            </div>
        )
    }
}
export default Transformator
