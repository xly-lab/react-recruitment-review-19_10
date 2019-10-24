import React, {Component} from 'react'
import {
    Button,
    NavBar,
    InputItem,
    WingBlank,
    List,
    WhiteSpace
} from "antd-mobile";
import Logo from '../../components/logo/logo'
export default class Login extends Component {
    state={
        username:'',
        password:''
    };
    replacePath=()=>{
        this.props.history.replace('/register')
    };
    render() {
        return (
            <div>
                <NavBar>随&nbsp;便&nbsp;H&nbsp;I&nbsp;R&nbsp;E</NavBar>
                <Logo/>
                <WhiteSpace/>
                <WhiteSpace/>                    <WhiteSpace/>
                <WhiteSpace/>

                <WingBlank>
                    <List>
                        <InputItem placeholder='你的账户' onChange={e=>this.setState({username:e})}>账号：</InputItem>
                        <InputItem  type='password' onChange={e=>this.setState({password:e})}>密码：</InputItem>
                    </List>
                    <WhiteSpace/>
                    <Button type='primary'>登录</Button>
                    <WhiteSpace/>
                    <Button onClick={this.replacePath} >没有帐号</Button>
                </WingBlank>
            </div>
        )
    }
}
