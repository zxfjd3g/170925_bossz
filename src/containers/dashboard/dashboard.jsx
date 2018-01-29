/*
应用面板的路由组件
 */
import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import cookies from 'browser-cookies'
import {connect} from 'react-redux'

import BossInfo from '../boss-info/boss-info'
import GeniusInfo from '../genius-info/genius-info'
import Boss from '../boss/boss'
import Genius from '../genius/genius'
import Msg from '../msg/msg'
import User from '../user/user'
import NotFound from '../../components/not-found/not-found'
import {getUserInfo} from '../../redux/actions'



class Dashboard extends Component {

  // 给组件对象添加navList属性: this.navList获取
  navList = [
    {
      path: '/boss', // 路由路径
      component: Boss,
      title: '牛人列表',
      icon: 'boss',
      text: '牛人',
    },
    {
      path: '/genius', // 路由路径
      component: Genius,
      title: 'BOSS列表',
      icon: 'job',
      text: 'BOSS',
    },
    {
      path: '/msg', // 路由路径
      component: Msg,
      title: '消息列表',
      icon: 'msg',
      text: '消息',
    },
    {
      path: '/me', // 路由路径
      component: User,
      title: '个人中心',
      icon: 'user',
      text: '我',
    }
  ]

  componentDidMount () {
    // 取出cookie中的userid
    const userid = cookies.get('userid')
    const {user} = this.props
    // userid有值, 而user中没有数据, 才去请求获取userinfo
    if(userid && !user._id) {
      this.props.getUserInfo()
    }
  }


  render () {
    // 检查用户是否登陆, 如果没有, 跳转到login
    const userid = cookies.get('userid')
    const {user, location} = this.props
    if(!userid && !user.type) {
      this.props.history.replace('/login')
      return null
    }
    // debugger
    if(user.type) { // 已经登陆
      if(location.pathname==='/') { // 访问的/
        if(user.type==='boss') {
          this.props.history.replace('/boss')
          return null
        } else {
          this.props.history.replace('/genius')
          return null
        }
      }

    } else {
      return null //不做任何显示
    }

    return (
      <div>
        <Switch>
          <Route path='/bossinfo' component={BossInfo}/>
          <Route path='/geniusinfo' component={GeniusInfo}/>
          {
            this.navList.map((nav, index) => (
              <Route key={index} path={nav.path} component={nav.component}/>
            ))
          }
          {/*<Route component={NotFound}/>*/}
        </Switch>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),  // 传入的prop为user
  {getUserInfo}
)(Dashboard)