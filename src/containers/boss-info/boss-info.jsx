import React, {Component} from 'react'
import {connect} from 'react-redux'
import {WingBlank,InputItem,TextareaItem,Button,NavBar,WhiteSpace} from 'antd-mobile'

import HeaderSeleter from "../../components/header-seleter/header-seleter";

 class BossInfo extends Component {
    render() {
        return (
            <div>
                <NavBar>Boss 信息</NavBar>
                <HeaderSeleter/>
                <WingBlank>
                    <InputItem placeholder='请输入招聘职位'>招聘职位:</InputItem>
                    <InputItem placeholder='请输入公司名称'>公司名称:</InputItem>
                    <InputItem placeholder='请输入职位薪资'>职位薪资:</InputItem>
                    <TextareaItem title="职位要求:"
                                  rows={3}/>
                    <WhiteSpace/>
                    <Button type='primary'>保存</Button>
                </WingBlank>
            </div>
        )
    }
}
export default connect(
    state=>({}),{}
)(BossInfo)
