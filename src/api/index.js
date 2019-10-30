import ajax from './ajax'

//注册
export const reqRegister = (user) => ajax('/register',user,'POST');

//登录
export const reqLogin = (user) => ajax('/login',user,'POST');

//更新数据
export const reqUpdate = (user) =>ajax('/update',user,'POST');

//获取user
export const reqUser = () => ajax('/user');

//获取userlist
export const reqUserList = (type)=>ajax('/userlist',{type});
