/*
对话聊天的路由组件
 */

import React, {Component} from 'react'
import {NavBar, List, InputItem} from 'antd-mobile'
import {connect} from 'react-redux'

import {sendMsg, receiveMsg} from '../../redux/actions'

const Item = List.Item

class Chat extends Component {
  state = {
    content: ''
  }
  handleSubmit = () => {
    // 收集数据
    const from = this.props.user._id
    const to = this.props.match.params.userid
    const content = this.state.content
    // 向服务器发送消息
    this.props.sendMsg({from, to, content})
    // 清除输入
    this.setState({content: ''})
  }

  componentDidMount () {
    // 绑定接收服务发送的消息的监听
    this.props.receiveMsg()
  }

  render() {
    const userid = this.props.match.params.userid

    return (
      <div id='chat-page'>
        <NavBar>{userid}</NavBar>
        <List>
          <Item
            thumb={require('../../assets/imgs/boy.png')}
          >
            你好
          </Item>
          <Item
            thumb={require('../../assets/imgs/boy.png')}
          >
            你好2
          </Item>
          <Item
            className='chat-me'
            extra={<img src={require('../../assets/imgs/girl.png')}/>}
          >
            很好
          </Item>
          <Item
            className='chat-me'
            extra={<img src={require('../../assets/imgs/girl.png')}/>}
          >
            很好2
          </Item>
        </List>

        <div className='am-tab-bar'>
          <InputItem
            placeholder="请输入"
            extra={
              <span onClick={this.handleSubmit}>发送</span>
            }
            value={this.state.content}
            onChange={val => {this.setState({content: val})}}
          />
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user}),
  {sendMsg, receiveMsg}
)(Chat)