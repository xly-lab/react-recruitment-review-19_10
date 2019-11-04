import React, {Component} from 'react'
import Cookies from 'js-cookie'
import {Result, List, WhiteSpace, Button,WingBlank,Modal} from 'antd-mobile'
import QueueAnim from 'rc-queue-anim';

import {connect} from 'react-redux'
import {initMsg} from '../../redux/actions'
const Item = List.Item;
const Brief = Item.Brief;


class Personal extends Component {
    logOut=()=>{
        Modal.alert('退出','确认退出？',[
            {
                text:'取消'
            },
            {
            text:'确认',
            onPress:()=>{
                    Cookies.remove('userid');
                    this.props.initMsg()
                }
            }
            ])
    };
    render() {
        const {username,post,salary,company,info,header} = this.props.user;
        return (
            <div className='personal'>
                <QueueAnim type='left' delay={100}>
                    <WingBlank>
                        <WhiteSpace/>
                        <Result img={<img src={require(`../../assets/header/${header}.png`)} style={{width: 50}} alt="header"/>}
                                title={username}
                                message={company} />
                        <List renderHeader={() => '相关信息'}>
                            <Item multipleLine>
                                <Brief>职位: {post}</Brief>
                                <Brief>简介: {info}</Brief>
                                {salary?<Brief>薪资: {salary}</Brief>:null}
                            </Item>
                        </List>
                        <WhiteSpace/>
                        <List>
                            <Button type='warning' onClick={this.logOut}>退出登录</Button>
                        </List>
                    </WingBlank>
                </QueueAnim>
            </div>
        )
    }
}
export default connect(
    state=>({user:state.user}),{initMsg}
)(Personal)
