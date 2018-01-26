/*
用户注册的路由组件
 */
import React, {Component} from 'react'
import {WingBlank, List, WhiteSpace, InputItem, Radio, Button} from 'antd-mobile'

import Logo from '../../components/logo/logo'

const RadioItem = Radio.RadioItem

export default class Register extends Component {

  state = {
    name: '', // 用户名
    pwd: '', // 密码
    pwd2: '', // 确认密码
    type: 'boss' // genius
  }

  handleChange = (name, val) => {
    //更新状态
    this.setState({
      [name]: val    // [name] 代表属性名是一个变量的值
    })
  }

  // 注册
  register = () => {
    console.log(this.state)
  }

  // 跳转到登陆路由
  toLogin = () => {
    this.props.history.replace('/login')
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
            <InputItem type='password' onChange={val => this.handleChange('pwd2', val)}>确认密码:</InputItem>

            <WhiteSpace/>
            <RadioItem checked={type==='genius'} onChange={() => this.handleChange('type', 'genius')}>牛人</RadioItem>
            <RadioItem checked={type==='boss'} onChange={() => this.handleChange('type', 'boss')}>BOSS</RadioItem>

            <WhiteSpace/>
            <Button type='primary' onClick={this.register}>注 册</Button>
            <Button onClick={this.toLogin}>已经有账号</Button>

          </List>
        </WingBlank>
      </div>
    )
  }
}