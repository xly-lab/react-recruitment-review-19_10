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
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {login,initMsg} from '../../redux/actions'
class Login extends Component {
    state={
        username:'',
        password:''
    };
    replacePath=()=>{
        this.props.initMsg();
        this.props.history.replace('/register')
    };
    loginGo=()=>{
        this.props.login(this.state);
    };
    render() {
        const {msg,redirectTo} = this.props.user;
        if(redirectTo){
            return  <Redirect to={redirectTo}/>
        }
        return (
            <div>
                <NavBar>随&nbsp;便&nbsp;H&nbsp;I&nbsp;R&nbsp;E</NavBar>
                <Logo/>
                <div>
                    <span>{msg? <p className='error-msg'>{msg}</p>:null}</span>
                </div>
                <WhiteSpace/>
                <WhiteSpace/>                    <WhiteSpace/>
                <WhiteSpace/>

                <WingBlank>
                    <List>
                        <InputItem placeholder='你的账户' onChange={e=>this.setState({username:e})}>账号：</InputItem>
                        <InputItem  type='password' onChange={e=>this.setState({password:e})}>密码：</InputItem>
                    </List>
                    <WhiteSpace/>
                    <Button type='primary' onClick={this.loginGo}>登录</Button>
                    <WhiteSpace/>
                    <Button onClick={this.replacePath} >没有帐号</Button>
                </WingBlank>
            </div>
        )
    }
}
export default connect(
    state=>({user:state.user}),
    {login,initMsg}
)(Login)

