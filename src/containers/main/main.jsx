import React, {Component} from 'react'
import {Switch,Route} from 'react-router-dom'

import GodInfo from '../god-info/god-info'
import BossInfo from '../boss-info/boss-info'

export default class Main extends Component {
    render() {
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
