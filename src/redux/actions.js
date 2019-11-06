import io from 'socket.io-client'
import {reqLogin, reqRegister, reqUpdate, reqUser, reqUserList,reqChatMsgList,reqReadMsg} from '../api/index'
import {ERROR_MSG,AUTH_SUCCESS,INIT_MSG,RECEIVE_USER,RESET_USER,RECEIVE_USER_LIST,RECEIVE_MSG_LIST,RECIVE_MSG,MSG_READ} from './action-types'
// ========================同步=============================================================
//授权成功的同步action
const authSuccess =(user) => ({type:AUTH_SUCCESS,data:user});
//授权失败的同步action
const errorMsg = (msg) => ({type:ERROR_MSG,data:msg});
//清空msg信息
export const initMsg = ()=>({type:INIT_MSG});
//更新数据成功的同步action
const receiveUser = (user) =>({type:RECEIVE_USER,data:user});
//重置userde的同步action
const resetUser = (msg) =>({type:RESET_USER,data:msg});
//获取user list 的同步action
const receiveUserList = (userlist)=>({type:RECEIVE_USER_LIST,data:userlist});
//获取chatMsgList的同步action
export const receiveChatMsgList = (chatMsgAll,userid) =>({type:RECEIVE_MSG_LIST,data:{chatMsgAll,userid}});
//保存单挑chatMsg
const receiveMsg = (chatMsg,userid)=>({type:RECIVE_MSG,data:{chatMsg,userid}});
// 读取了某个聊天消息的同步action
const msgRead = ({count, fr, to}) => ({type: MSG_READ, data: {count, fr, to}});

// ============================异步===========================================================
//注册异步action
export const register = (user) =>{
    const {username,password,surepwd,type} = user;
    if(!username){
        return errorMsg('请输入用户名');
    }
    if(password===''||surepwd===''){
        return errorMsg('密码不能为空');
    }
    if(password!==surepwd){
        return errorMsg('两次密码不相同');
    }
  return async dispatch=>{
      const response = await reqRegister({username,password,type});
      const result = response.data;
      if (result.code===0){
          getChatMsgList(dispatch,result.data._id);
          //成功
          dispatch(authSuccess(result.data))
      }else {
          //失败
          dispatch(errorMsg(result.msg))
      }
  }
};
//登录异步action
export const login = (user) =>{
    if(!user.username){
        return errorMsg('请输入用户名');
    }
    if(!user.password){
        return errorMsg('请输入密码');
    }
    return async dispatch=>{
        const response = await reqLogin(user);
        const result = response.data;
        if (result.code===0){
            getChatMsgList(dispatch,result.data._id);
            //成功
            dispatch(authSuccess(result.data))
        }else {
            //失败
            dispatch(errorMsg(result.msg))
        }
    }
};
//异步更新action
export const update=(user)=>{
    return async dispatch=>{
        const response =  await reqUpdate(user);
        const result = response.data;
        if(result.code===0){
            dispatch(receiveUser(result.data))
        }else{
            dispatch(resetUser(result.msg))
        }
    }
};

//异步获取user
export const getUser=()=>{
    return async dispatch=>{
        const response =await reqUser();
        const result = response.data;
        if(result.code===0){
            getChatMsgList(dispatch,result.data._id);
            dispatch(receiveUser(result.data))
        }else {
            dispatch(resetUser(result.msg));
        }
    }
};

//异步获取userlist
export const getUserList=(type)=>{
    return async dispatch=>{
        const response = await reqUserList(type);
        const result = response.data;
        if(result.code===0){
            dispatch(receiveUserList(result.data))
        }
    }
};
function initIO(dispatch,userid) {
    if(!io.socket){
        io.socket = io('ws://localhost:5000');
        io.socket.on('receiveMsg',(chatMsg)=>{
            // console.log('服务器向客户端发送的消息是：',chatMsg);
            if(chatMsg.fr===userid||chatMsg.to===userid){
                dispatch(receiveMsg(chatMsg,userid))
            }
        });
    }
}
//发送消息的异步action
export const sendMsg=({fr,to,content})=>{
    return dispatch=>{
        // console.log('客户端向服务器端发送消息',{fr,to,content});
        io.socket.emit('sendMsg',{fr,to,content});
    }
};
//工具函数获取chatMshList
async function getChatMsgList(dispatch,userid) {
    initIO(dispatch,userid);
    const response = await reqChatMsgList();
    const result = response.data;
    if(result.code===0){
        dispatch(receiveChatMsgList(result.data,userid));
    }
}
//异步 的消息已读action
export const readMsg=(fr,to)=>{
    return async dispatch =>{
        const response = await reqReadMsg(fr);
        const result = response.data;
        if(result.code===0){
            dispatch(msgRead({count:result.data,fr,to}))
        }
    }

}
