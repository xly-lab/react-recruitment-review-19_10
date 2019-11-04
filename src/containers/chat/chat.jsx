import React, {Component} from 'react'
import {NavBar, List, InputItem,WingBlank,Icon,Grid} from 'antd-mobile'
import {connect} from 'react-redux'

import {sendMsg,readMsg} from '../../redux/actions'

const Item = List.Item;
const Brief = List.Brief;
class Chat extends Component {
    state={
        content:'',
        isShow:false
    };
    toggle=()=>{
        const isShow = !this.state.isShow;
        this.setState({isShow});
        if(isShow){
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'))
            }, 0)
        }
    };
    componentWillMount() {
        const emojis=['😀', '😃', '😄', '😁', '😆' , '😅' , '🤣' , '😂' , '🙂' , '🙃' , '😉' , '😊' ,
                      '😇' , '🥰' , '😍' , '🤩' , '😘' , '😗' , '😚' , '😙' , '😋', '😛' , '😜', '🤪', '😝' , '🤑' ,
                      '🤗' , '🤭', '🤫' , '🤔' , '🤐', '🤨' , '😐', '😑' , '😶' , '😏' , '😒' , '🙄', '😬' , '🤥' , '😌' , '😔', '😪', '🤤',
                      '😴' , '😷', '🤒' , '🤕' , '🤢' , '🤮' , '🤧' , '🥵' , '🥶', '🥴' , '😵', '🤯', '🤠' , '🥳', '😎' ,
                      '🤓', '🧐' , '😕' , '😟' , '🙁' , '☹' , '😮' , '😯', '😲' , '😳' , '🥺' , '😦' , '😧' , '😨' , '😰', '😥' ,
                      '😢' , '😭' , '😱' , '😖' , '😣' , '😞' , '😓' , '😩' , '😫' , '😤' , '😡' , '😠' , '🤬', '😈' , '👿' ,
                      '💀', '☠' , '💩', '🤡', '👹' , '👺' , '👻' , '👽' , '👾' , '🤖' , '😺' , '😸' , '😹' , '😻' , '😼' , '😽' , '🙀',
                      '😿' , '😾', '💋' , '👋' , '🤚' , '🖐' , '✋', '🖖' , '👌' , '✌' , '🤞' , '🤟' , '🤘' , '🤙', '👈' , '👉' ,
                      '👆' , '🖕' , '👇', '☝' , '👍' , '👎' , '✊' , '👊' , '🤛' , '🤜' , '👏' , '🙌' , '👐', '🤲' , '🤝' , '🙏',
                      '✍' , '💅' , '🤳' , '💪' ,'🦵' , '🦶' , '👂' , '👃' , '🧠' , '🦷' , '🦴' , '👀' , '👁' , '👅' , '👄' , '👶' ,
                      '🧒', '👦' , '👧', '🧑' , '👱' , '👨' , '🧔' , '🦰' , '🦱' , '🦳' , '🦲', '👩', '🦰','🦱','🦲','👱'];
        this.emojis = emojis.map(em=>({text:em}))
    }
    componentDidMount() {
        // 初始显示列表
        window.scrollTo(0, document.body.scrollHeight)
    }
    componentDidUpdate () {
        // 更新显示列表
        window.scrollTo(0, document.body.scrollHeight)
    }
    componentWillUnmount() {
        // 发请求更新消息的未读状态
        const fr = this.props.match.params.userid;
        const to = this.props.user._id;
        this.props.readMsg(fr, to);
    }

    handleSend=()=>{
        const fr = this.props.user._id;
        const to = this.props.match.params.userid;
        const content = this.state.content.trim();
        if(content){
            this.props.sendMsg({fr,to,content});
        }
        this.setState({content:'',isShow:false})
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
                    <List onClick={()=>this.setState({isShow:false})}>
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
                               onFocus={()=>this.setState({isShow:false})}
                               extra={
                                   <span>
                                       <span onClick={this.toggle} style={{marginRight:8}}>🧒</span>
                                       <span onClick={this.handleSend} className={this.state.content.length>0?'change-blank':''}>发送</span>
                                   </span>
                               } />
                    {
                        this.state.isShow?(
                            <Grid
                                data={this.emojis}
                                columnNum={8}
                                carouselMaxRow={4}
                                isCarousel={true}
                                onClick={(item) => {
                                    this.setState({content: this.state.content + item.text})
                                }}
                            />
                        ):null
                    }
                </div>
            </div> )
    }
}
export default connect(
    state=>({user:state.user,chat:state.chat}),{sendMsg,readMsg}
)(Chat)
