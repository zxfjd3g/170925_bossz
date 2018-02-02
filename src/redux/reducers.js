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
  CHAT_MSG_LIST
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
  users: {}  // {id1: user1, id2: user2}
}
function chat(state=initChat, action) {
    switch (action.type) {
      case RECEIVE_CHAT_MSG:
        /*return {
          chatMsgs: [...state.chatMsgs, action.data],
          users: state.users
        }*/
        return {...state, chatMsgs: [...state.chatMsgs, action.data]}
      case CHAT_MSG_LIST:
        const {chatMsgs, users} = action.data
        return {chatMsgs, users}
      default:
        return state
    }
}


export default combineReducers({
  user,
  userList,
  chat
})

// 外部得到的state的结构: {user, userList}


/*Array.prototype.reduce2 = function (reducer, initVal) {
  let total = initVal
  this.forEach(item=> {
    total = reducer(total, item)
  })
  return total
}*/

