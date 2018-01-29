/*
应用面板的路由组件
 */
import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import cookies from 'browser-cookies'
import {connect} from 'react-redux'

import BossInfo from '../boss-info/boss-info'
import GeniusInfo from '../genius-info/genius-info'

class Dashboard extends Component {


  render () {
    // 检查用户是否登陆, 如果没有, 跳转到login
    const userid = cookies.get('userid')
    const {user} = this.props
    if(!userid && !user.type) {
      this.props.history.replace('/login')
      return null
    }

    return (
      <div>
        <Switch>
          <Route path='/bossinfo' component={BossInfo}/>
          <Route path='/geniusinfo' component={GeniusInfo}/>
        </Switch>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user})  // 传入的prop为user
)(Dashboard)