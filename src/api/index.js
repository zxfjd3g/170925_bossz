/*
包含所有ajax请求方法的模块
 */
import ajax from './ajax'

// 请求注册
export const reqRegister = (user) => ajax('/api/register', user, 'POST')
// 请求登陆
export const reqLogin = (user) => ajax('/api/login', user, 'POST')