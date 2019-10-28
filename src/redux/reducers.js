import {combineReducers} from 'redux'
import {getRedirectTo} from '../utils'
import {
    AUTH_SUCCESS,
    ERROR_MSG,INIT_MSG
} from './action-types'

const userInit = {
    username:'',//用户名
    type:'',    //用户类型
    msg:'' ,     //错误提示信息
    redirectTo:''
};

function user(state = userInit ,action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            const {type,header} =action.data;
            return {...action.data,redirectTo: getRedirectTo(type,header)};
        case ERROR_MSG:
            return {...state,msg:action.data};
        case INIT_MSG:
            return {...state,msg:''};
        default:
            return state
    }
}

export default combineReducers({
    user
})
