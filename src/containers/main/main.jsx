import React, {Component} from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Cookies from 'js-cookie'

import GodInfo from '../god-info/god-info'
import BossInfo from '../boss-info/boss-info'
import Message from "../message/message";
import Boss from "../boss/boss";
import God from "../god/god";
import NotFound from "../../components/not-found/not-found";
import Personal from "../personal/personal";
import NavFooter from "../../components/nav-footer/nav-footer";
import {getRedirectTo} from "../../utils";
import {getUser} from '../../redux/actions'
import {NavBar} from "antd-mobile";

class Main extends Component {
    componentDidMount() {
        const userid = Cookies.get('userid');
        const {user} = this.props;
        if (userid && !user._id) {
            //获取user
            this.props.getUser();
        }
    }
    navList = [ { path: '/boss', // 路由路径
             component: Boss,
             title: '大神列表',
             icon: 'god',
             text: '大神',
            hide:false,
         },
         {
             path: '/god',  //路由路径
             component: God,
             title: '老板列表',
             icon: 'boss',
             text: '老板',
             hide:false,

         },
         {
             path: '/message', // 路由路径
             component: Message,
             title: '消息列表',
             icon: 'message',
             text: '消息',
             hide:false,
         },
         {
             path: '/personal',  //路由路径
             component: Personal,
             title: '用户中心',
             icon: 'personal',
             text: '个人',
             hide:false,
         } ];

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
        const {navList} = this;
        const currentNav = navList.find(nav=>nav.path===this.props.location.pathname);
        if(currentNav){
            // 决定哪个路由需要隐藏
            if(user.type==='laoban') {
                // 隐藏数组的第2个
                navList[0].hide = true
            } else {
                // 隐藏数组的第1个
                navList[1].hide = true
            }
        }
        return (
            <div>
                {currentNav?<NavBar>{currentNav.title}</NavBar>:null}
                <Switch>
                    {
                        navList.map((nav,index)=><Route key={index} path={nav.path} component={nav.component}/>)
                    }
                    <Route path='/godinfo' component={GodInfo}/>
                    <Route path='/bossinfo' component={BossInfo}/>
                    <Route component={NotFound}/>
                </Switch>
                {currentNav?<NavFooter navList={navList}/>:null}
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
