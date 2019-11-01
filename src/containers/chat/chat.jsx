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
        const {user} =this.props;
        const {users,chatMsgs} =this.props.chat;
        const meId = user._id;//我的id
        if(!users[meId]){
            return null
        }
        const targetId = this.props.match.params.userid;//对方的id
        const chatMsg_id = [meId,targetId].sort().join('_');//查询条件

        const msgs = chatMsgs.filter(msg=>msg.chat_id===chatMsg_id);//从所有的chatMsgList里选出当前与chatMsg_id相同的消息列表
        const targetHeader = users[targetId].header;
        const targerIcon = targetHeader?require(`../../assets/header/${targetHeader}.png`):require(`../../assets/header/头像1.png`);
        const meIcon = user.header?require(`../../assets/header/${user.header}.png`):require(`../../assets/header/头像1.png`);
        return (
            <div id='chat-page'>
                <NavBar
                    icon={<Icon onClick={()=>this.props.history.goBack()} type="left" />}
                    className='stick-top'>{users[targetId].username}</NavBar>
                <WingBlank >
                    <List>
                        {
                            msgs.map(msg=> {
                                if (msg.fr === targetId) {
                                    return (
                                        <Item extra={msg.create_time}
                                              key={msg._id}
                                              thumb={targerIcon}>:&nbsp;&nbsp;&nbsp;&nbsp;{msg.content} </Item>
                                    )
                                } else {
                                    return (
                                        <Item extra={msg.create_time}
                                              key={msg._id}
                                              className='chat-me'
                                              thumb={meIcon}>{msg.content}&nbsp;&nbsp;&nbsp;&nbsp;:</Item>
                                    )
                                }
                            })
                        }
                        {/*<Item extra="10:30" thumb={require('../../assets/header/头像1.png')} > 你好 </Item>*/}
                        {/*<Item  extra="10:30"  className='chat-me' thumb={require('../../assets/header/头像1.png')}> 很好 </Item>*/}
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
    state=>({user:state.user,chat:state.chat}),{sendMsg}
)(Chat)
