import React from 'react'
import {render} from 'react-dom'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {Provider} from 'react-redux'

import store from './redux/store'
import Register from './containers/register/register'
import Login from './containers/login/login'
import Dashboard from './containers/dashboard/dashboard'

import './assets/css/index.css'

render(
  (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path='/register' component={Register}/>
          <Route path='/login' component={Login}/>
          <Route component={Dashboard}/>{/*与上面不匹配的所有*/}
        </Switch>
      </BrowserRouter>
    </Provider>
  ),
  document.getElementById('root')
)