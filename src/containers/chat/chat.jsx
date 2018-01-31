/*
对话聊天的路由组件
 */

import React, {Component} from 'react'
import {NavBar, List, InputItem} from 'antd-mobile'

// 引入客户端io
import io from 'socket.io-client'
// 连接服务器, 得到代表连接的socket对象
const socket = io('ws://localhost:4000')

const Item = List.Item

export default class Chat extends Component {

  handleSubmit = () => {
    // 向服务器发送消息
    socket.emit('sendMessage', {name: 'Tom', date: Date.now()})
    console.log('浏览器向服务器发送消息', {name: 'Tom', date: Date.now()})
  }

  componentDidMount () {
    // 绑定'receiveMessage'的监听, 来接收服务器发送的消息
    socket.on('receiveMessage', function (data) {
      console.log('浏览器端接收到消息:', data)
    })
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
          />
        </div>
      </div>
    )
  }
}