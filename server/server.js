/*
使用express启动服务器
1. 引入express
2. 生成应用对象(执行express函数)
3. 注册根路由(使用app的use())
4. 启动服务器(使用app监听指定端口)
 */
// 1. 引入express
const express = require('express')

// 2. 生成应用对象(执行express函数)
const app = express()

// 3. 注册根路由(使用app的use())
app.use('/', function (req, res) {
  res.send('hello server!2222')
})

// 4. 启动服务器(使用app监听指定端口)
app.listen(4000, function () {
  console.log('服务器启动成功 port: 4000')
})