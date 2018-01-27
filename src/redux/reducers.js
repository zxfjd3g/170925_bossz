/*
包含n个reducer函数(根据老的state和指定的action返回一个新的state)的模块
 */
import {combineReducers} from 'redux'

import {
  AUTH_SUCCESS,
  ERROR_MSG
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
      return {...action.data, redirectTo: '/'}
    case ERROR_MSG:
      // state.msg = action.data // 不能直接更新state
      return  {...state, msg: action.data}
    default:
      return state
  }
}

export default combineReducers({
  user
})

// 外部得到的state的结构: {user: {}}

