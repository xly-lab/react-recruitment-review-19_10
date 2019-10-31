import React, {Component} from 'react'
import {NavBar, List, InputItem,WingBlank} from 'antd-mobile'
import {connect} from 'react-redux'
const Item = List.Item;
const Brief = List.Brief;
class Chat extends Component {
    render() {
        return (
            <div id='chat-page'>
                <NavBar>aa</NavBar>
                <WingBlank >
                    <List>
                        <Item extra="10:30" thumb={require('../../assets/header/头像1.png')} > 你好 </Item>

                        <Item  extra="10:30"  className='chat-me' thumb={require('../../assets/header/头像1.png')}> 很好 </Item>

                    </List>

                </WingBlank>
                <div className='am-tab-bar am-tab-bar-1'>
                    <InputItem placeholder="请输入" extra={ <span>发送</span> } /> </div>
            </div> )
    }
}
export default connect(
    state=>({}),{}
)(Chat)
