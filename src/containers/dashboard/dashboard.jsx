/*
应用面板的路由组件
 */
import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import cookies from 'browser-cookies'
import {connect} from 'react-redux'
import {NavBar} from 'antd-mobile'

import BossInfo from '../boss-info/boss-info'
import GeniusInfo from '../genius-info/genius-info'
import Boss from '../boss/boss'
import Genius from '../genius/genius'
import Msg from '../msg/msg'
import User from '../user/user'
import NotFound from '../../components/not-found/not-found'
import NavFooter from '../../components/nav-footer/nav-footer'
import Chat from '../chat/chat'
import {getUserInfo, getChatMsgList} from '../../redux/actions'
import {getRedirectPath} from '../../utils'



class Dashboard extends Component {

  // 给组件对象添加navList属性: this.navList获取
  navList = [
    {
      path: '/boss', // 路由路径
      component: Boss,
      title: '牛人列表',
      icon: 'boss',
      text: '牛人',
      hide: false
    },
    {
      path: '/genius', // 路由路径
      component: Genius,
      title: 'BOSS列表',
      icon: 'job',
      text: 'BOSS',
      hide: false
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

    // 获取当前用户相关的所有聊天列表
    this.props.getChatMsgList()
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
        // 计算需要跳转的路由路径
        const path = getRedirectPath(user.type, user.avatar)
        // 跳转
        this.props.history.replace(path)

        return null
      }
      if(user.type==='boss') {
        // 隐藏第2个
        this.navList[1].hide = true
      } else {
        // 隐藏第2个
        this.navList[0].hide = true
      }
    } else {  // redux中user为空, 但cookie有userid
      return null //不做任何显示
    }

    // 计算出当前的nav对象
    // /boss   /msg
    /*
    {
      path: '/me', // 路由路径
      component: User,
      title: '个人中心',
      icon: 'user',
      text: '我',
    }
     */
    const currentNav = this.navList.find(nav => nav.path===location.pathname)

    return (
      <div>
        {currentNav ? <NavBar className="stick-top">{currentNav.title}</NavBar> : null}

        <Switch>
          <Route path='/bossinfo' component={BossInfo}/>
          <Route path='/geniusinfo' component={GeniusInfo}/>
          <Route path='/chat/:userid' component={Chat}/>
          {
            this.navList.map((nav, index) => (
              <Route key={index} path={nav.path} component={nav.component}/>
            ))
          }
          <Route component={NotFound}/>
        </Switch>

        {currentNav ? <NavFooter navList={this.navList} unReadCount={this.props.unReadCount}/> : null}
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user, unReadCount: state.chat.unReadCount}),  // 传入的prop为user
  {getUserInfo, getChatMsgList}
)(Dashboard)