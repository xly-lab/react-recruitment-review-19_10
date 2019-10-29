import React, {Component} from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Cookies from 'js-cookie'

import GodInfo from '../god-info/god-info'
import BossInfo from '../boss-info/boss-info'
import {getRedirectTo} from "../../utils";
import {getUser} from '../../redux/actions'
class Main extends Component {
    componentDidMount() {
        const userid = Cookies.get('userid');
        const {user} = this.props;
        if (userid && !user._id) {
            //获取user
            this.props.getUser();
        }
    }

    render() {
        const {user} = this.props;
        const usreid = Cookies.get('userid');
        if(!usreid){
            return <Redirect to='/login'/>
        }
        if(!user._id){
            return null;
        }
        else{

            let path = this.props.location.pathname;
            if(path==='/'){
                path=getRedirectTo(user.type,user.header);
                return <Redirect to={path}/>
            }
        }
        return (
            <div>
                <Switch>
                    <Route path='/godinfo' component={GodInfo}/>
                    <Route path='/bossinfo' component={BossInfo}/>
                </Switch>
            </div>
        )
    }
}
export default connect(
    state=>({user:state.user}),{getUser}
)(Main)
/*
1. 实现自动登陆:
  1. componentDidMount()
    登陆过(cookie中有userid), 但没有有登陆(redux管理的user中没有_id) 发请求获取对应的user:
  2. render()
    1). 如果cookie中没有userid, 直接重定向到login
    2). 判断redux管理的user中是否有_id, 如果没有, 暂时不做任何显示
    3). 如果有, 说明当前已经登陆, 显示对应的界面
    4). 如果请求根路径: 根据user的type和header来计算出一个重定向的路由路径, 并自动重定向
 */
