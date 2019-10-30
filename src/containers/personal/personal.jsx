import React, {Component} from 'react'
import Cookies from 'js-cookie'
import {Result, List, WhiteSpace, Button,WingBlank,Modal} from 'antd-mobile'
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
        const {username,post,salary,company,info} = this.props.user;
        return (
            <div>
                <WingBlank>
                    <WhiteSpace/>
                    <Result img={<img src={require(`../../assets/header/头像1.png`)} style={{width: 50}} alt="header"/>}
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
            </div>
        )
    }
}
export default connect(
    state=>({user:state.user}),{initMsg}
)(Personal)
