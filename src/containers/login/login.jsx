/*
用户登陆的路由组件
 */
import React, {Component} from 'react'
import {WingBlank, List, WhiteSpace, InputItem, Radio, Button} from 'antd-mobile'

import Logo from '../../components/logo/logo'

const RadioItem = Radio.RadioItem

export default class Register extends Component {

  state = {
    name: '', // 用户名
    pwd: '', // 密码
  }

  handleChange = (name, val) => {
    //更新状态
    this.setState({
      [name]: val    // [name] 代表属性名是一个变量的值
    })
  }

  // 注册
  login = () => {
    console.log(this.state)
  }

  // 跳转到登陆路由
  toRegister = () => {
    this.props.history.replace('/register')
  }


  render() {
    const {type} = this.state

    return (
      <div>
        <Logo/>
        <WingBlank>
          <List>
            <InputItem onChange={val => this.handleChange('name', val)}>用户名:</InputItem>
            <WhiteSpace/>
            <InputItem type='password' onChange={val => this.handleChange('pwd', val)}>密 码:</InputItem>

            <WhiteSpace/>
            <Button type='primary' onClick={this.login}>登 陆</Button>
            <Button onClick={this.toRegister}>还没有账号</Button>

          </List>
        </WingBlank>
      </div>
    )
  }
}