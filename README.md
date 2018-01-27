# 常见问题
## 1. 项目启动不了
    1. 执行命令的位置对不对
    2. 命令包或依赖包没有下载
    3. 功能代码有问题
## 2. 路由回调函数的3步
    1. 获取请求参数
    2. 处理(操作数据库数据)
    3. 返回响应

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
## 1. 注册/登陆的后台功能
## 2. 注册/登陆的前台功能
## 3. 用户信息完善功能

# day03


# day04






