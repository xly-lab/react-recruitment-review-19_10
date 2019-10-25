import React, {Component} from 'react'
import {
    Button,
    NavBar,
    InputItem,
    Radio,
    WingBlank,
    List,
    WhiteSpace
} from "antd-mobile";
import Logo from '../../components/logo/logo'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {register,initMsg} from '../../redux/actions'
const ListItem = List.Item;
class Register extends Component {
    state={
        username:'',
        password:'',
        surepwd:'',
        type:'boss'
    };
    replacePath=()=>{
        this.props.initMsg();
        this.props.history.replace('/login')
    };
    registerGo=()=>{
        this.props.register(this.state)
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
                <WhiteSpace/>
                <WingBlank>
                    <List>
                        <InputItem placeholder='你的账户' onChange={e=>this.setState({username:e})}>账号：</InputItem>
                        <InputItem type='password' onChange={e=>this.setState({password:e})}>密码：</InputItem>
                        <InputItem type='password' onChange={e=>this.setState({surepwd:e})}>确认密码：</InputItem>
                        <ListItem>
                            <span>你的身份：</span>
                            &nbsp;&nbsp;
                            <Radio checked={this.state.type==='boss'} onChange={()=>this.setState({type:'boss'})}>Boss</Radio>
                            &nbsp;&nbsp;&nbsp;
                            <Radio checked={this.state.type==='god'} onChange={()=>this.setState({type:'god'})}>God</Radio>
                        </ListItem>
                    </List>
                    <WhiteSpace/>

                    <Button type='primary' onClick={this.registerGo}>继续</Button>
                    <WhiteSpace/>
                    <Button onClick={this.replacePath}>已有帐号</Button>
                </WingBlank>
            </div>
        )
    }
}
export default connect(
    state=>({user:state.user}),
    {register,initMsg}
)(Register)
