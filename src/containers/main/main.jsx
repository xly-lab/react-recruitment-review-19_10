import React, {Component} from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

import GodInfo from '../god-info/god-info'
import BossInfo from '../boss-info/boss-info'

class Main extends Component {
    render() {
        const {user} = this.props;
        if(!user._id){
            return <Redirect to='/login'/>
        }
        return (
            <div>
                <Switch>
                    <Route path='/godinfo' component={GodInfo}/>
                    <Route path='/bossinfo' component={BossInfo}/>
                </Switch>
            </div>
        )
    }
}
export default connect(
    state=>({user:state.user})
)(Main)
