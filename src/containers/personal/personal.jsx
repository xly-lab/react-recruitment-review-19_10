import React, {Component} from 'react'
import {Result, List, WhiteSpace, Button,WingBlank} from 'antd-mobile'
const Item = List.Item;
const Brief = Item.Brief;


export default class Personal extends Component {
    render() {
        return (
            <div>
                <WingBlank>
                    <WhiteSpace/>
                    <Result img={<img src={require(`../../assets/header/头像1.png`)} style={{width: 50}} alt="header"/>}
                        title='张三'
                        message='IBM' />
                        <List renderHeader={() => '相关信息'}>
                            <Item multipleLine>
                                <Brief>职位: 前端工程师</Brief>
                                <Brief>简介: React/Vue/jQuery</Brief>
                                <Brief>薪资: 20k</Brief>
                            </Item>
                        </List>
                <WhiteSpace/>
                <List>
                    <Button type='warning'>退出登录</Button>
                </List>
                </WingBlank>
            </div>
        )
    }
}
