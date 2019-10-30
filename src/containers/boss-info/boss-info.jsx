import React, {Component} from 'react'
import {connect} from 'react-redux'
import {WingBlank,InputItem,TextareaItem,Button,NavBar,WhiteSpace} from 'antd-mobile'
import {Redirect} from 'react-router-dom'

import HeaderSeleter from "../../components/header-seleter/header-seleter";
import {update} from '../../redux/actions'

class BossInfo extends Component {
     state={
         company:'',
         info:'',
         header:'',
         post:'',
         salary:''
     };
    getHeader=(header)=>{
        this.setState({header})
    };
    save=()=>{
        this.props.update(this.state)
     };
    render() {
        const {header,type} =this.props.user;
        if(header){
            let path=type==='boss'?'/boss':'/god';
            return <Redirect to={path}/>
        }
        return (
            <div className='boss-info'>
                <NavBar className='stick-top'>Boss 信息</NavBar>
                <WingBlank>
                <HeaderSeleter getHeader={this.getHeader}/>
                    <WhiteSpace/>
                    <InputItem placeholder='请输入招聘职位' onChange={e=>this.setState({post:e})}>招聘职位:</InputItem>
                    <InputItem placeholder='请输入公司名称' onChange={e=>this.setState({company:e})}>公司名称:</InputItem>
                    <InputItem placeholder='请输入职位薪资' onChange={e=>this.setState({salary:e})}>职位薪资:</InputItem>
                    <TextareaItem title="职位要求:"
                                  rows={3}
                                  onChange={e=>this.setState({info:e})}/>
                    <WhiteSpace/>
                    <Button type='primary' onClick={this.save}>保存</Button>
                </WingBlank>
            </div>
        )
    }
}
export default connect(
    state=>({user:state.user}),{update}
)(BossInfo)
