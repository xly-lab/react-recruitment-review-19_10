import {reqLogin,reqRegister,reqUpdate} from '../api/index'
import {ERROR_MSG,AUTH_SUCCESS} from './action-types'
// ========================同步=============================================================
//授权成功的同步action
const authSuccess =(user) => ({type:AUTH_SUCCESS,data:user});
//授权失败的同步action
const errorMsg = (msg) => ({type:ERROR_MSG,data:msg});


// ============================异步===========================================================
//注册异步action
export const register = (user) =>{
  return async dispatch=>{
      const response = await reqRegister(user);
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
