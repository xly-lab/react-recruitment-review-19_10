import React, {Component} from 'react'
import {connect} from 'react-redux'
import {WingBlank,InputItem,TextareaItem,Button,NavBar,WhiteSpace} from 'antd-mobile'
import {Redirect} from 'react-router-dom'

import HeaderSeleter from "../../components/header-seleter/header-seleter";
import {update} from '../../redux/actions'

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
        this.props.update(this.state)
    };
    render() {
        const {header,type} =this.props.user;
        debugger
        if(header){
            let path=type==='boss'?'/boss':'/god';
            return <Redirect to={path}/>
        }
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
    state=>({user:state.user}),{update}
)(GodInfo)
