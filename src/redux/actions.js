import {reqLogin,reqRegister,reqUpdate} from '../api/index'
import {ERROR_MSG,AUTH_SUCCESS,INIT_MSG} from './action-types'
// ========================同步=============================================================
//授权成功的同步action
const authSuccess =(user) => ({type:AUTH_SUCCESS,data:user});
//授权失败的同步action
const errorMsg = (msg) => ({type:ERROR_MSG,data:msg});
//清空msg信息
export const initMsg = ()=>({type:INIT_MSG});

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
