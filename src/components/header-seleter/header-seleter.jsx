import React, {Component} from 'react'
import {List,Grid} from 'antd-mobile'

export default class HeaderSeleter extends Component {
    constructor(props){
        super(props);
        this.imgArr=[];
        for (let i =0 ;i <20;i++){
            this.imgArr.push({
                text:'头像'+(i+1),
                icon:require(`../../assets/header/头像${i+1}.png`)
            })
        }
    }
    render() {
        const showHeader = '请选择你的头像';
        return (
            <div>
                <List renderHeader={()=>showHeader}>
                    <Grid data={this.imgArr}
                          columnNum={5}/>
                </List>
            </div>
        )
    }
}
