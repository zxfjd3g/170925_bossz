/*
用户个人中心路由组件
 */

import React from 'react'
import {Result, List, WhiteSpace, Modal} from 'antd-mobile'
import cookies from 'browser-cookies'
import {connect} from 'react-redux'

import {resetUser} from '../../redux/actions'

const Item = List.Item
const Brief = Item.Brief

class User extends React.Component {

  handleClick = () => {
    const {name, resetUser} = this.props
    Modal.alert(name, '确定退出吗?', [
      {
        text: '取消',
      },
      {
        text: '确定',
        onPress () {
          // 清除cookie中的userid
          cookies.erase('userid')
          // 清除redux中的user
          resetUser()
        }
      }
    ])
  }

  render() {

    const {avatar, name, company, title, desc, money} = this.props


    return (
      <div style={{marginTop: 50, marginBottom: 50}}>
        <Result
          img={<img src={require(`../../assets/imgs/${avatar}.png`)} style={{width: 50}} alt="avatar"/>}
          title={name}
          message={company ? company : null}
        />

        <List renderHeader={() => '相关信息'}>
          <Item multipleLine>
            <Brief>职位: {title}</Brief>
            <Brief>简介: {desc}</Brief>
            <Brief>{money ? `薪资: ${money}` : null}</Brief>
          </Item>
        </List>
        <WhiteSpace/>
        <List>
          <Item onClick={this.handleClick}>退出登录</Item>
        </List>
      </div>
    )
  }
}

export default connect(
  state => state.user,
  {resetUser}
)(User)
