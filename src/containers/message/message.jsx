import React, {Component} from 'react';
import {connect} from 'react-redux';
import {List, Badge,WingBlank} from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;
/*得到所有聊天的最后 msg 组成的数组 [msg1, msg2, msg3..]
// 1. 使用{}进行分组(chat_id), 只保存每个组最后一条 msg: {chat_id1: lastMsg1, chat_id2: lastMsg2}
// 2. 得到所有分组的 lastMsg 组成数组: Object.values(lastMsgsObj) [lastMsg1, lastMsg2]
// 3. 对数组排序(create_time, 降序)
*/

function getLastMsgs(chatMsgs,userid) {
    // 1. 使用{}进行分组(chat_id), 只保存每个组最后一条 msg: {chat_id1: lastMsg1, chat_id2: lastMsg2}
    const lastMsgObjs = {};
    chatMsgs.forEach(msg=>{
        if(msg.to===userid&&!msg.read){
            msg.unReadCount=1;
        }else{
            msg.unReadCount=0;
        }
        const chatId = msg.chat_id;
        let lastMsg = lastMsgObjs[chatId];
        if(!lastMsg){
            lastMsgObjs[chatId]=msg;
        }else {
            // 累加unReadCount=已经统计的 + 当前msg的
            const unReadCount = lastMsg.unReadCount + msg.unReadCount;
            if(msg.create_time>lastMsg.create_time){
                lastMsgObjs[chatId]=msg;
            }
            //将unReadCount保存在最新的lastMsg上
            lastMsgObjs[chatId].unReadCount = unReadCount
        }
    });
// 2. 得到所有分组的 lastMsg 组成数组: Object.values(lastMsgsObj) [lastMsg1, lastMsg2]
    const lastMsgs = Object.values(lastMsgObjs);
// 3. 对数组排序(create_time, 降序)
    lastMsgs.sort((m1,m2)=>{
        return m2.create_tiem-m1.create_time;
    });
    console.log(lastMsgs);
    return lastMsgs
}

class Message extends Component {
    render() {
        const {user} = this.props;
        const meId = user._id;
        const {users,chatMsgs} = this.props.chat;
        const lastMsgs = getLastMsgs(chatMsgs,user._id);
        return (
            <div className='message'>
                <WingBlank >
                        {
                            lastMsgs.map(msg=>{
                                const targetId = msg.fr === meId ? msg.to : msg.fr;
                                const targetUser = users[targetId];
                                return(

                                        <List  key={msg._id}>
                                        <Item extra={<Badge text={msg.unReadCount}/>}
                                              thumb={require(`../../assets/header/${targetUser.header?targetUser.header:'头像1'}.png`)}
                                              arrow='horizontal'
                                              onClick={()=>this.props.history.push(`/chat/${targetId}`)}>
                                            {msg.content}
                                            <Brief>{targetUser.username}</Brief>
                                        </Item>
                                        </List>

                                )
                            })
                        }
                </WingBlank>
            </div>

            )
    }
}
export default connect(
    state=>({user:state.user,chat:state.chat})
)(Message)
