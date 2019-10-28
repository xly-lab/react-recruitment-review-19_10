import React, {Component} from 'react'
import {connect} from 'react-redux'
import {WingBlank,InputItem,TextareaItem,Button,NavBar,WhiteSpace} from 'antd-mobile'

import HeaderSeleter from "../../components/header-seleter/header-seleter";

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

     };
    render() {
        return (
            <div className='boss-info'>
                <NavBar>Boss 信息</NavBar>
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
    state=>({}),{}
)(BossInfo)
