/*
后台应用的路由器模块
1. 引入express
2. 得到路由器
3. 注册n个路由
4. 向外暴露路由器
5. 通过 app使用上路由器
 */
// 1. 引入express
const express = require('express')
const md5 = require('blueimp-md5')
const models = require('./models')
const UserModel = models.getModel('user')
// 2. 得到路由器
const router = express.Router()
const _filter = {'pwd': 0, '__v': 0} // 查询时过滤掉

// 3. 注册n个路由
  // 用户注册的路由
/*
路由回调函数的3步
1. 获取请求参数
2. 处理(操作数据库数据)
3. 返回响应
 */
router.post('/register', function (req, res) {
  // 1. 获取请求参数
  const {name, pwd, type} = req.body // 包含所有请求参数的对象

  // 2. 处理(操作数据库数据)
  // 2.1. 根据name查询是否已经存在,
  UserModel.findOne({name}, function (err, user) {
    // 3.1. 如果已经存在, 返回一个错误的提示
    if(user) {
      return res.send({code: 1, msg: '用户名已存在!'}) // code: 数据的标识 1: 错误 0: 正确
    }
    // 2.2. 如果不存在, 保存到数据库,
    const userModel = new UserModel({name, pwd: md5(pwd), type})
    userModel.save(function (err, user) {
      // 向浏览器端返回cookie(key=value)
      res.cookie('userid', user._id)
      // 3.2. 返回数据(新的user)
      res.send({code: 0, data: {_id: user._id, name, pwd, type}})
    })
  })
})
  // 用户登陆的路由
router.post('/login', function (req, res) {
  // 1. 获取请求参数
  const {name, pwd} = req.body
  // 2. 根据name和pwd查询对应的user
  UserModel.findOne({name, pwd: md5(pwd)}, _filter, function (err, user) {
    // 3.1. 存在, 返回user数据
    if(user) {
      // 向浏览器端返回cookie(key=value)
      res.cookie('userid', user._id)
      res.json({code: 0, data: user})
    } else {
      // 3.2. 不存在, 返回错误信息
      res.json({code: 1, msg: '用户名或密码错误!'})
    }
  })

})

// 4. 向外暴露路由器
module.exports = router
