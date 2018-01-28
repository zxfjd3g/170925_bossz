/*
使用express启动服务器
1. 引入express
2. 生成应用对象(执行express函数)
3. 注册根路由(使用app的use())
4. 启动服务器(使用app监听指定端口)
 */
// 1. 引入express
const express = require('express')
const bodyParser = require('body-parser') // 解析请求体
const cookieParser = require('cookie-parser')
// 引入应用的路由器
const appRouter = require('./app_router')

// 2. 生成应用对象(执行express函数)
const app = express()

// 3. 注册根路由(使用app的use())
/*app.use('/', function (req, res) {
  res.send('hello server!2222')
})*/

app.use(cookieParser()) // 解析cookie数据
app.use(bodyParser.json()) // 解析请求体(ajax请求: json数据格式)
app.use(bodyParser.urlencoded({ extended: false })) // 解析请求体(表单数据)
// 注册路由器
app.use('/api', appRouter)   // 登陆: /api/login

// 4. 启动服务器(使用app监听指定端口)
app.listen(4000, function () {
  console.log('服务器启动成功 port: 4000')
})