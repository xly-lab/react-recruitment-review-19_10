import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {HashRouter,Route,Switch} from 'react-router-dom'
import store from "./redux/store";

import Login from "./containers/login/login";
import Main from "./containers/main/main";
import Register from "./containers/register/register";

import './assets/css/theme-css.less'

// import './test/socketIO'

ReactDOM.render((
    <Provider store={store}>
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <Route component={Main}/>
            </Switch>
        </HashRouter>
    </Provider>
),document.getElementById('root'));
