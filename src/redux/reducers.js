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
} from './action-types'

const initUser = {
  name: '',  // 用户名
  type: '', // 类型
  msg: '',  // 错误信息
  redirectTo: '' // 需要重定向的路由路径
}

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

export default combineReducers({
  user
})

// 外部得到的state的结构: {user}


/*Array.prototype.reduce2 = function (reducer, initVal) {
  let total = initVal
  this.forEach(item=> {
    total = reducer(total, item)
  })
  return total
}*/

