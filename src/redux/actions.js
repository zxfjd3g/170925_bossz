/*
包含n个action creator函数的模块
 */
import {
  reqRegister,
  reqLogin,
  reqUpdateUser,
  reqUserInfo,
  reqUserList
} from '../api'
import {
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  USER_LIST
} from './action-types'

// 同步授权成功action
const authSuccess = (user) => ({type: AUTH_SUCCESS, data: user})
// 同步错误信息action
const errorMsg = (msg) => ({type: ERROR_MSG, data: msg})


/*
异步注册的action
 */
export const register = ({name, pwd, pwd2, type}) => {
  return async (dispatch)=> {
    // 数据合法性检查
    if(!name || !pwd) {
      dispatch(errorMsg('用户名或密码必须指定'))
    } else if (pwd!==pwd2) {
      dispatch(errorMsg('两次密码必须相同'))
    } else {
      // 发送ajax请求注册
     /* reqRegister({name, pwd, type}).then(response => {

      })*/
      const response = await reqRegister({name, pwd, type})
      const {code, data, msg} = response.data  // {code: 0, data: user}  {code: 1, msg: 'xxx'}
      if (code === 0) {
        // 分发成功的同步action
        dispatch(authSuccess(data))
      } else {
        // 分发失败的同步action
        dispatch(errorMsg(msg))
      }
    }
  }
}


/*
异步登陆的action
 */
export const login = ({name, pwd}) => {
  return async dispatch => {
    // 数据合法性检查
    if(!name || !pwd) {
      dispatch(errorMsg('用户名或密码必须指定'))
    } else {
      // 发送ajax请求登陆
      const response = await reqLogin({name, pwd})
      const {code, data, msg} = response.data  // {code: 0, data: user}  {code: 1, msg: 'xxx'}
      if (code === 0) {
        // 分发成功的同步action
        dispatch(authSuccess(data))
      } else {
        // 分发失败的同步action
        dispatch(errorMsg(msg))
      }
    }
  }
}

// 同步接收用户
const receiveUser = (user) => ({type: RECEIVE_USER, data: user})
// 同步重置用户
export const resetUser = (msg) => ({type: RESET_USER, data: msg})
/*
异步更新用户
 */
export const updateUser = (user) => {
  return async dispatch => {
    // 发送异步ajax请求
    const response = await reqUpdateUser(user)
    const result = response.data
    if(result.code===0) { // 更新成功
      dispatch(receiveUser(result.data))
    } else { // 失败
      dispatch(resetUser(result.msg))
    }
  }
}

/*
异步获取用户信息(根据cookie中的userid)
 */
export const getUserInfo = () => {
  return async dispatch => {
    const response = await reqUserInfo()
    const result = response.data
    if(result.code===0) { // 获取用户成功
      dispatch(receiveUser(result.data))
    } else { // 失败
      dispatch(resetUser(result.msg))
    }
  }
}


const userList = (userList) => ({type: USER_LIST, data: userList})
/*
异步获取用户列表
 */
export const getUserList = (type) => {
  return async dispatch => {
    const response = await reqUserList(type)
    const result = response.data
    if(result.code===0) { // 获取用户成功
      dispatch(userList(result.data))
    }
  }
}

