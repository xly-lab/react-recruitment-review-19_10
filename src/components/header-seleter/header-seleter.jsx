import React, {Component} from 'react'
import {List,Grid} from 'antd-mobile'
import PropTypes from 'prop-types'



export default class HeaderSeleter extends Component {
    static propTypes ={
        getHeader:PropTypes.func.isRequired,
    };
    state={
        icon:null
    };
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
    sendHeader=({text,icon})=>{
        this.props.getHeader(text);
        this.setState({icon})
    };
    render() {
        const {icon} = this.state;
        const showHeader = !icon?'请选择你的头像':(
            <div>
                <p className='header-p'>你选择的头像:</p><img src={icon}/>
            </div>
        );
        return (
            <div>
                <List renderHeader={()=>showHeader}>
                    <Grid data={this.imgArr}
                          columnNum={5}
                          onClick={this.sendHeader}  />
                </List>
            </div>
        )
    }
}
