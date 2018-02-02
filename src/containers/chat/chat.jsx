/*
对话聊天的路由组件
 */

import React, {Component} from 'react'
import {NavBar, List, InputItem, Grid, Icon} from 'antd-mobile'
import {connect} from 'react-redux'
import QueueAnim from 'rc-queue-anim'

import {sendMsg, readMsg} from '../../redux/actions'

const Item = List.Item

class Chat extends Component {
  state = {
    content: '',
    isShow: false // 是否显示表情列表
  }
  // 处理点击发送消息
  handleSubmit = () => {
    // 收集数据
    const content = this.state.content
    if(!content) {
      return
    }
    const from = this.props.user._id
    const to = this.props.match.params.userid
    // 向服务器发送消息
    this.props.sendMsg({from, to, content})
    // 清除输入
    this.setState({content: '', isShow: false})
  }

  // 处理点击切换表情显示
  toggleShow = () => {
    const isShow = !this.state.isShow
    this.setState({isShow})
    if(isShow) {
      // 异步手动派发resize事件,解决表情列表显示的bug
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
      }, 0)
    }
  }

  componentWillMount() {
    this.emojis = ['😀', '😂', '😆', '😊', '😍', '🤷', '❤', '😂', '😍', '🔥', '🤔', '😊', '🙄', '😘',
      '😀', '😂', '😆', '😊', '😍', '🤷', '❤', '😂', '😍', '🔥', '🤔', '😊', '🙄', '😘',
      '😀', '😂', '😆', '😊', '😍', '🤷', '❤', '😂', '😍', '🔥', '🤔', '😊', '🙄', '😘']
    this.emojis = this.emojis.map(value => ({text: value}))
    console.log(this.emojis)
  }

  componentDidMount() {
    const from = this.props.match.params.userid
    // 异步请求读取消息(更新消息的read值)
    this.props.readMsg(from)
    // 初始显示列表
    window.scrollTo(0, document.body.scrollHeight)
  }

  componentWillUnmount() {
    const from = this.props.match.params.userid
    // 异步请求读取消息(更新消息的read值)
    this.props.readMsg(from)
  }

  componentDidUpdate () {
    // 更新显示列表
    window.scrollTo(0, document.body.scrollHeight)
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
        <NavBar
          className='stick-top'
          icon={<Icon type='left'/>}
          onLeftClick={() => {
            this.props.history.goBack()
          }}
        >
          {users[userid].name}
        </NavBar>
        <List style={{marginBottom: 50, marginTop: 50}}>
          <QueueAnim type='scale' delay={100}>
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
          </QueueAnim>

        </List>

        <div className='am-tab-bar'>
          <InputItem
          placeholder="请输入"
          extra={
            <div>
              <span onClick={this.toggleShow}>😀</span>
              <span onClick={this.handleSubmit}>发送</span>
            </div>
          }
          value={this.state.content}
          onChange={val => {this.setState({content: val})}}
          onFocus = {() => {this.setState({isShow: false})}}
        />

          {
            this.state.isShow ? (
              <Grid
                data={this.emojis}
                columnNum={8}
                isCarousel={true}
                carouselMaxRow={4}
                onClick={(item) => {// 点击项对应的数据项
                  this.setState({content: this.state.content + item.text})
                }}
              />
            ) : null
          }

        </div>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user, chat: state.chat}),
  {sendMsg, readMsg}
)(Chat)

// <Chat user={} chat={}>