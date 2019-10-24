import {combineReducers} from 'redux'

function f(state = 1 ,action) {
return state
}
function f1(state =2 ,action) {
    return state
}

export default combineReducers({
    f,f1
})
