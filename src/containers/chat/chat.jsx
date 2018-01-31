/*
对话聊天的路由组件
 */

import React, {Component} from 'react'
import {NavBar, List, InputItem} from 'antd-mobile'
import {connect} from 'react-redux'

import {sendMsg, receiveMsg, getChatMsgList} from '../../redux/actions'

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
    // 获取当前用户相关的所有聊天列表
    this.props.getChatMsgList()
  }

  render() {
    const userid = this.props.match.params.userid
    const meId = this.props.user._id
    // 取出数据
    const {chatMsgs, users} = this.props.chat
    // 得到当前的chatId
    const currChatId = [userid, meId].sort().join('_')
    // 过滤出需要显示的
    const currMsgs = chatMsgs.filter(msg => msg.chat_id===currChatId)

    if(!users[userid]) { // 在users没有得到之前直接不显示
      return null
    }
    // 目标的头像对象
    const targetAvatar = users[userid].avatar
    const targetAvatarImg = targetAvatar ? require(`../../assets/imgs/${targetAvatar}.png`) : null
    // 我的头像对象
    const meAvatar = this.props.user.avatar
    const meAvatarImg = require(`../../assets/imgs/${meAvatar}.png`)

    return (
      <div id='chat-page'>
        <NavBar>{userid}</NavBar>
        <List>
          {
            currMsgs.map(msg => {
              if(msg.from===userid) { //别人发过来的
                return (
                  <Item
                    key={msg._id}
                    thumb={targetAvatarImg}
                  >
                    {msg.content}
                  </Item>
                )
              } else {
                return (
                  <Item
                    className='chat-me'
                    key={msg._id}
                    extra={<img src={meAvatarImg}/>}
                  >
                    {msg.content}
                  </Item>
                )
              }
            })
          }
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
  state => ({user: state.user, chat: state.chat}),
  {sendMsg, receiveMsg, getChatMsgList}
)(Chat)

// <Chat user={} chat={}>