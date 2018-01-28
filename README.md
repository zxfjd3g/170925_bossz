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
    1). 作用: 使用同步编码方法实现异步功能
    1). 编写2步:
      在调用返回promise对象的函数左边加上await: const response = await reqRegister({name, pwd, type})
      在await所在的函数定义左边加上async
      
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


# day04






