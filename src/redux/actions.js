import {reqLogin, reqRegister, reqUpdate, reqUser, reqUserList} from '../api/index'
import {ERROR_MSG,AUTH_SUCCESS,INIT_MSG,RECEIVE_USER,RESET_USER,RECEIVE_USER_LIST} from './action-types'
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
