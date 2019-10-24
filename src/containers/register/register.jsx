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
const ListItem = List.Item;
export default class Register extends Component {
    state={
        username:'',
        password:'',
        surepwd:'',
        type:'boss'
    };
    replacePath=()=>{
        this.props.history.replace('/login')
    };
    render() {
        return (
            <div>
                <NavBar>随&nbsp;便&nbsp;H&nbsp;I&nbsp;R&nbsp;E</NavBar>
                <Logo/>
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

                    <Button type='primary'>继续</Button>
                    <WhiteSpace/>

                    <Button onClick={this.replacePath}>已有帐号</Button>
                </WingBlank>
            </div>
        )
    }
}
