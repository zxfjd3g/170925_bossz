/*
底部导航的UI组件
 */

import React from 'react'
import PropTypes from 'prop-types'
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'

const Item = TabBar.Item

class NavFooter extends React.Component {

  static propTypes = {
    navList: PropTypes.array.isRequired
  }

  render() {
    // 过滤掉hide为true的
    const navList = this.props.navList.filter(v => !v.hide)
    // 当前请求的path
    const {pathname} = this.props.location
    /*
    {
      path: '/me', // 路由路径
      component: User,
      title: '个人中心',
      icon: 'user',
      text: '我',
    }
     */
    return (
      <TabBar>
        {navList.map(v => (
          <Item
            key={v.path}
            title={v.text}
            icon={{uri: require(`./imgs/${v.icon}.png`)}}
            selectedIcon={{uri: require(`./imgs/${v.icon}-active.png`)}}
            selected={pathname === v.path}
            onPress={() => {
              this.props.history.replace(v.path)
            }}
          >
          </Item>
        ))}
      </TabBar>
    )
  }
}

export default withRouter(NavFooter)