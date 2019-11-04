import React, {Component} from 'react'
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
const Item = TabBar.Item;
 class NavFooter extends Component {
    static propTypes ={
        navList:PropTypes.array.isRequired,
        unReadNum:PropTypes.number.isRequired
    };
    render() {
        let {navList,unReadNum} =this.props;
        navList=navList.filter(nav=>!nav.hide);
        const path = this.props.location.pathname;
        return (
            <TabBar>
                {navList.map(nav=>(
                <Item   key={nav.path}
                        title={nav.text}
                        badge={nav.path==='/message'?unReadNum:0}
                        icon={{uri:require(`../../assets/images/${nav.icon}.png`)}}
                        selectedIcon={{uri:require(`../../assets/images/${nav.icon}-selected.png`)}}
                        selected={path===nav.path}
                        onPress={()=>{this.props.history.replace(nav.path)}}
                />
                ))}
            </TabBar>

        )
    }
}
export default withRouter(NavFooter)
