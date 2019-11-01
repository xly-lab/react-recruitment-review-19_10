import {combineReducers} from 'redux'
import {getRedirectTo} from '../utils'
import {
    AUTH_SUCCESS,
    ERROR_MSG,INIT_MSG,
    RESET_USER,RECEIVE_USER,
    RECEIVE_USER_LIST,RECIVE_MSG,
    RECEIVE_MSG_LIST
} from './action-types'

const userInit = {
    username:'',//用户名
    type:'',    //用户类型
    msg:'' ,     //错误提示信息
    redirectTo:''
};
//与user相关的reducers
function user(state = userInit ,action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            const {type,header} =action.data;
            return {...action.data,redirectTo: getRedirectTo(type,header)};
        case ERROR_MSG:
            return {...state,msg:action.data};
        case INIT_MSG:
            return {...state,msg:''};
        case RECEIVE_USER:
            return action.data;
        case RESET_USER:
            return {...action,msg:action.data};
        default:
            return state
    }
}
const initUserList=[];
//与userlist相关的reducers
function userlist(state = initUserList, action) {
    switch (action.type) {
        case RECEIVE_USER_LIST:
            return action.data;
        default:
            return state
    }
}
const InitChat={
    users:{},
    msgList:{},
    unReadNum:0
}
//与chatList相关的reducers
function chat(state=InitChat,action) {
    switch (action.type) {
        case RECEIVE_MSG_LIST:
            const {users,chatMsgs} = action.data;
            return {
                users,chatMsgs,
                unReadNum: 0
            };

        default:
            return state;
    }
}
export default combineReducers({
    user,userlist,chat
})
