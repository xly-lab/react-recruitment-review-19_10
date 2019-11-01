import React, {Component} from 'react'
import {NavBar, List, InputItem,WingBlank,Icon} from 'antd-mobile'
import {connect} from 'react-redux'

import {sendMsg} from '../../redux/actions'

const Item = List.Item;
const Brief = List.Brief;
class Chat extends Component {
    state={
        content:''
    };
    handleSend=()=>{
        const fr = this.props.user._id;
        const to = this.props.match.params.userid;
        const content = this.state.content.trim();
        if(content){
            this.props.sendMsg({fr,to,content});
        }
        this.setState({content:''})
    };
    render() {
        return (
            <div id='chat-page'>
                <NavBar
                    icon={<Icon type="left" />}
                    className='stick-top'>aa</NavBar>
                <WingBlank >
                    <List>
                        <Item extra="10:30" thumb={require('../../assets/header/头像1.png')} > 你好 </Item>
                        <Item  extra="10:30"  className='chat-me' thumb={require('../../assets/header/头像1.png')}> 很好 </Item>
                    </List>

                </WingBlank>
                <div className='am-tab-bar am-tab-bar-1'>
                    <InputItem placeholder="请输入"
                               value={this.state.content}
                               onChange={e=>this.setState({content:e})}
                               extra={ <span onClick={this.handleSend}>发送</span> } /> </div>
            </div> )
    }
}
export default connect(
    state=>({user:state.user}),{sendMsg}
)(Chat)
