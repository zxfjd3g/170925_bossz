# 常见问题
## 1. 项目启动不了
    1). 执行命令的位置对不对
    2). 命令包或依赖包没有下载
    3). 功能代码有问题
## 2. 后台路由回调函数的3步
    1). 获取请求参数
    2). 处理(操作数据库数据)
    3). 返回响应
## 3. 使用aysnc/await
    1). 作用: 使用同步编码方法实现异步功能(ajax异步请求)
    1). 编写2步:
      在调用返回promise对象的函数左边加上await: const response = await reqRegister({name, pwd, type})
      在await所在的函数定义左边加上async
 
## 4. 完成与后台交互编码后, 效果没有
    1). 点击后, 是否发送了请求(network)
        点击监听没有加
        分发一个异步的action
    2). 服务器有没有正确的返回(network)
    3). ajax请求的响应处理(使用debugger语句调试)
        分发一个同步action (使用redux插件)
        reducer有没有对应的处理返回(使用redux插件)
        容器组件是否读取了状态做相应的处理
    
    
  
# day01
## 1. 项目开发准备
    1). 项目描述: 整体业务功能/功能模块/主体的技术/开发模式
    2). 技术选型: 数据展现/用户交互/组件化, 后端, 前后台交互, 模块化, 项目构建/工程化, 其它
    3). API接口: 接口, 接口文档, 对/调/测接口
    4). npm/git常用命令

## 2. 启动项目开发
    1). 使用create-react-app脚手架创建模板项目(工程化)
    2). 引入antd-mobile, 并实现按需打包
    3). 引入react-router-dom(v4): 
      BrowserRouter/Route/Switch
      history: push()/replace()
    4). 引入redux
      redux/react-redux/redux-thunk
      4个重要模块: action-types/actions/reducers/store
      redux: createStore()/combineReducers()/applyMiddleware()
      react-redux: <Provider store={store}> / connect()(Xxx)

## 3. 实现简单后台
    1). 使用express搭建简单的服务器端
    2). 使用mongoose操作mongodb数据库
   
## 4. 登陆/注册界面
    1). 创建3个1级路由: dashboard/login/register
    2). 完成登陆/注册的静态组件
      antd组件: WingBlank/WhiteSpace/List/InputItem/Radio/RadioItem/Button
      路由跳转: this.props.history.replace('/login')

# day02
## 1. 前后端应用编码流程结构图
![](https://i.imgur.com/11pDhWu.png)

## 2. 注册/登陆的后台功能
    1). 后台的3个重要模块
      models.js: 包含多个能操作mongodb集合数据的model对象的模块
      app_router.js: 应用路由器模块, 其中注册了n个用来处理前台请求的路由
      server.js: 启动后台应用服务器的模块

    2). 理清注册/登陆后台路由的业务流程
      注册: 先根据name查询, 如果存在返回错误提示信息, 否则保存到数据库,返回生成的user数据
      登陆: 根据name和pwd查询, 如果不存在返回错误提示信息, 否则返回查询得到的user数据

    3). 注意
      注册/登陆时, 密码需要进行md5加密处理
      注册/登陆成功返回, 将user的_id通过cookie返回给浏览器保存(userid)
      注册/登陆成功返回的user不应该包含pwd
      返回给浏览器的数据结构为: {code:0, data: value} / {code:1, msg: 'xxx'}
  
## 3. 注册/登陆的前台功能
    1). api模块
		ajax请求方法封装: 统一函数参数, 返回promise对象
		定义不同接口请求的方法: reqRegister()/reqLogin()/...
		使用async/await: 使用同步编码方式执行异步ajax请求调用

	2). 异步action
		对参数数据进行合法性检查(可能需要)
		调用请求后台接口的方法
		得到返回结果后, 根据code值分发不同的同步action

	3). reducers实现
		根据action中的type和data, 返回不同的state值
		使用...的解包功能
		在状态对象中设计2个特别的属性
			msg: 指定需要显示的错误提示信息
			redirectTo: 需要自动跳转的路由路径

	4). 在register/login组件中
		通过connect向组件注入状态属性和action函数属性
		在render()中, 处理msg/redirectTo
		在点击注册/登陆时, 分发异步action实现交互功能

# day03
## 1. 用户信息完善功能
	1). 组件收集数据
		设计state
		给标签元素绑定监听
		在监听回调函数中读取输入, 更新状态
	
	2). cookie总结
		是什么?  小文本: key1=value1;key2=value2
		哪产生?  服务器端: res.cookie(key, value)
		哪保存? 浏览器保存 
		cookie分类: 会话cookie(内存) / 持久化cookie(文件)
		删除cookie: 服务器: res.clearCookie(key)
		浏览器使用cookie: 读取cookie, 发送请求时自动携带对应的cookie

	3). 整体编码流程

## 2. 搭建整体界面
	1). 整体路由设计
	
	2). 检查是否需要先登陆

# day04
## 1. 个人中心功能
	1). 使用antd搭建界面
	2). 从redux中获取user显示
	3). 登出功能: 使用browser-cookies删除userid cookie, 重置redux中的user

## 2. boss/牛人列表
	1). 为boss和genius组件, 抽取共同的ui组件: user-list
	2). 实现异步获取用户信息信息的整套流程代码
		后台: /list---> type---- {code: 0, data: userList}
		前台: 
			api/ajax:  reqUserList(type) -->ajax('/api/list', {type}) 
			redux: 
				异步action: getUserList(type) --> reqUserList(type) --->调用同步action(USER_LIST, data: userList)
				reducers: userList() ---> case USER_LIST: --->action.data
			组件:
				容器组件(boss/genius):
					import {connect} from 'react-redux'
					import {xxx} from '../redux/actions'
				
					组件内部
						const {userList, xxx} = this.props
						// userList用读取显示
						// xxx用来执行, 最终更新状态

					export default connet(
						state => ({userList: state.userList}),
						{xxx}
					)(Boss)
				ui组件(user-list): 
					<UserList userList={userList}/>  纯粹的react组件
					组件内部需要使用router的API(history/location/match): export default withRoute(UserList)

## 3. 实时聊天功能
	1). socket.io的理解和使用
		socket.io是一个能实现多人远程实时通信(聊天)的库
		内部包装的是H5 WebSocket和轮询(老浏览使用)
		它包含2个库: socket.io(服务器端), socket.io-client(浏览器端)
		服务器端编码
			io.on('connection', function(socket) {
			  console.log('socket.io 服务器与一个浏览器连接上了')
			  // 绑定sendMsg监听, 接收此浏览器发送的消息
			  socket.on('sendMsg', function(data) {
			    console.log('服务器接收到浏览器的消息', data)
			    // 向所有连接上的浏览器发消息(名称, 数据)
			    io.emit('recvMsg', data)
				console.log('服务器向浏览器发送消息', data)
			  })
			})
		客户端编码
			// 连接服务器, 得到代表连接的socket对象
			const socket = io('ws://localhost:4000')
			// 绑定'receiveMessage'的监听, 来接收服务器发送的消息
			socket.on('receiveMessage', function (data) {
			  console.log('浏览器端接收到消息:', data)
			})
			// 向服务器发送消息
			socket.emit('sendMessage', {name: 'Tom', date: Date.now()})


	2). 实现基本的聊天功能
		服务器端

		浏览器端







