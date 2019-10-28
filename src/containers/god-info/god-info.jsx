import React, {Component} from 'react'
import {connect} from 'react-redux'
import {WingBlank,InputItem,TextareaItem,Button,NavBar,WhiteSpace} from 'antd-mobile'

import HeaderSeleter from "../../components/header-seleter/header-seleter";

class GodInfo extends Component {
    state={
        info:'',
        header:'',
        post:'',
    };
    getHeader=(header)=>{
        this.setState({header})
    };
    save=()=>{

    };
    render() {
        return (
            <div>
                <NavBar>God 信息</NavBar>
                <WingBlank>
                <HeaderSeleter getHeader={this.getHeader}/>
                    <WhiteSpace/>
                    <InputItem placeholder='请输入需求职位' onChange={e=>this.setState({post:e})}>需求职位:</InputItem>
                    <TextareaItem title="个人描述:"
                                  rows={3}
                                  onChange={e=>this.setState({info:e})}/>
                    <WhiteSpace/>
                    <Button type='primary' onClick={this.save()}>保存</Button>
                </WingBlank>
            </div>
        )
    }
}
export default connect(
    state=>({}),{}
)(GodInfo)
