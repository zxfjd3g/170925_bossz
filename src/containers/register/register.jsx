/*
用户注册的路由组件
 */
import React, {Component} from 'react'
import {WingBlank, List, WhiteSpace, InputItem, Radio, Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import Logo from '../../components/logo/logo'
import {register} from '../../redux/actions'

const RadioItem = Radio.RadioItem

class Register extends Component {

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
    // 请求注册
    this.props.register(this.state)
  }

  // 跳转到登陆路由
  toLogin = () => {
    this.props.history.replace('/login')
  }


  render() {
    const {type} = this.state
    const {msg, redirectTo} = this.props

    // 如果redirectTo有值, 需要跳转到指定路由
    if(redirectTo) {
      return <Redirect to={redirectTo}/>
    }
    // 不需要跳转
    return (
      <div>
        <Logo/>
        <WingBlank>
          {/*如果msg存在就显示*/}
          {msg ? <p className='error-msg'>{msg}</p> : null}
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

export default connect(
  state => state.user,   // {name:'xx', type: 'boss', msg: 'xxx', redirectTo: '/'}
  {register}
)(Register)