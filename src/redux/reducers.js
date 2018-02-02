/*
包含n个reducer函数(根据老的state和指定的action返回一个新的state)的模块
 */
import {combineReducers} from 'redux'

import {getRedirectPath} from '../utils'

import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  USER_LIST,
  RECEIVE_CHAT_MSG,
  CHAT_MSG_LIST,
  MSG_READ
} from './action-types'

const initUser = {
  name: '',  // 用户名
  type: '', // 类型
  msg: '',  // 错误信息
  redirectTo: '' // 需要重定向的路由路径
}

//  管理用户状态
function user(state=initUser, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
      // 从action的data中得到type和avatar
      const {type, avatar} = action.data
      return {...action.data, redirectTo: getRedirectPath(type, avatar)}
    case ERROR_MSG:
      // state.msg = action.data // 不能直接更新state
      return  {...state, msg: action.data}
    case RECEIVE_USER:
      return action.data // 返回一个新的user
    case RESET_USER:
      return {...initUser, msg: action.data} // 返回一个初始user
    default:
      return state
  }
}


const initUserList = []
// 管理用户列表状态
function userList(state=initUserList, action) {
  switch (action.type) {
    case USER_LIST:
      return action.data
    default:
      return state
  }
}

const initChat = {
  chatMsgs: [],  // [{from: id1, to: id2}{}]
  users: {},  // {id1: user1, id2: user2}
  unReadCount: 0  // 总的未读数量
}
function chat(state=initChat, action) {
    switch (action.type) {
      case RECEIVE_CHAT_MSG:
        /*return {
          chatMsgs: [...state.chatMsgs, action.data],
          users: state.users
        }*/
        var {chatMsg, userid} = action.data
        return {
          chatMsgs: [...state.chatMsgs, chatMsg],
          users: state.users,
          unReadCount: state.unReadCount + (userid===chatMsg.to ? 1 : 0)  // 消息只有是发给我的才加1
        }
      case CHAT_MSG_LIST:
        var {chatMsgs, users, userid} = action.data
        // 计算总的未读数量
        const unReadCount = chatMsgs.reduce((preTotal, msg) => {
          // 别人发给我的未读消息
          return preTotal + (msg.to===userid && !msg.read ? 1 : 0)
        }, 0)

        return {chatMsgs, users, unReadCount}

      case MSG_READ:
        const {count, from, to} = action.data
        // 计算生成一个新的chatMsgs
        var chatMsgs = state.chatMsgs.map(msg => {
          // 只有当msg, to都相同, 并且未读, 才返回一个新的msg
          if(msg.from===from && msg.to===to && !msg.read) {
            // msg.read = true
            // Object.assign({}, msg, {read: true})
            return {...msg, read: true}
          } else {
            return msg
          }
        })
        return {
          chatMsgs: chatMsgs,  // [{from: id1, to: id2}{}]
          users: state.users,
          unReadCount: state.unReadCount-count
        }
      default:
        return state
    }
}

export default combineReducers({
  user,
  userList,
  chat
})

// 外部得到的state的结构: {user, userList, chat}


/*Array.prototype.reduce2 = function (reducer, initVal) {
  let total = initVal
  this.forEach(item=> {
    total = reducer(total, item)
  })
  return total
}*/

