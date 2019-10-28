import React, {Component} from 'react'
import {connect} from 'react-redux'
import {WingBlank,InputItem,TextareaItem,Button,NavBar,WhiteSpace} from 'antd-mobile'

import HeaderSeleter from "../../components/header-seleter/header-seleter";

class GodInfo extends Component {
    render() {
        return (
            <div>
                <NavBar>God 信息</NavBar>
                <WingBlank>
                <HeaderSeleter/>
                    <WhiteSpace/>
                    <InputItem placeholder='请输入需求职位'>需求职位:</InputItem>
                    <TextareaItem title="个人描述:"
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
)(GodInfo)
