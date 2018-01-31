/*
包含所有ajax请求方法的模块
 */
import ajax from './ajax'

// 请求注册
export const reqRegister = (user) => ajax('/api/register', user, 'POST')

// 请求登陆
export const reqLogin = (user) => ajax('/api/login', user, 'POST')

// 更新用户信息
export const reqUpdateUser = (user) => ajax('/api/update', user, 'POST')

// 获取用户信息
export const reqUserInfo = () => ajax('/api/userinfo')

// 获取boss/genius用户列表
export const reqUserList = (type) => ajax('/api/list', {type})

