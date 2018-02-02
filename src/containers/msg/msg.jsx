/*
对话消息列表组件
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {List, Badge} from 'antd-mobile'

const Item = List.Item
const Brief = Item.Brief

/*
得到所有聊天的最后msg组成的数组
 */
function getLastMsgs(chatMsgs) {
  const lastMsgsObj = {}  // chat_id1: msg1, chat_id2:msg2

  // 遍历chatMsgs
  chatMsgs.forEach(msg => {
    const chatId = msg.chat_id
    // 从lastMsgsObj中查找相同聊天的msg
    let lastMsg = lastMsgsObj[chatId]
    // 没有
    if(!lastMsg) {
      //将新的msg保存为lastMsg
      lastMsgsObj[chatId] = msg
    } else {// 有
      // 对比时间, 保存create_time较大的一个
      if(msg.create_time>lastMsg.create_time) {
        //将新的msg保存为lastMsg
        lastMsgsObj[chatId] = msg
      }
    }
  })

  // 将lastMsgsObj的所有value转换为一个数组 [lastMsg1, lastMsg2]
  const lastMsgs = Object.values(lastMsgsObj)
  // 对lastMsgs进行排序
  lastMsgs.sort(function (msg1, msg2) {
    return msg2.create_time-msg1.create_time
  })

  return lastMsgs
}

class Msg extends Component {

  render() {

    const {user, chat} = this.props
    const {meId} = user._id
    const {chatMsgs, users} = chat


    const lastMsgs = getLastMsgs(chatMsgs)
    console.log(lastMsgs)

    return (
      <List>
        {
          lastMsgs.map(msg => {
            // 确定目标用户的id
            const targetId = msg.from===meId ? msg.to : msg.from
            const targetUser = users[targetId]

            return (
              <Item
                key={msg._id}
                extra={<Badge text={msg.unReadCount}/>}
                thumb={require(`../../assets/imgs/${targetUser.avatar}.png`)}
                arrow='horizontal'
              >
                {msg.content}
                <Brief>{targetUser.name}</Brief>
              </Item>
            )
          })
        }
      </List>
    )
  }
}

export default connect(
  state => ({
    user: state.user,
    chat: state.chat
  })
)(Msg)