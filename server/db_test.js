/*
测试使用mongoose操作mongodb数据库
1. 连接数据库
  1.1. 引入mongoose
  1.2. 连接指定数据库(URL只有数据库是变化的)
  1.3. 获取连接对象
  1.4. 绑定连接完成的监听(用来提示连接成功)
2. 得到对应特定集合的Model
  2.1. 字义Schema(描述文档结构)
  2.2. 定义Model(与集合对应, 可以操作集合)
3. 通过Model或其实例对集合数据进行CRUD操作
  3.1. 通过Model实例的save()添加数据
  3.2. 通过Model的find()/findOne()查询多个或一个数据
  3.3. 通过Model的findByIdAndUpdate()更新某个数据
  3.4. 通过Model的remove()删除匹配的数据
 */

/*1. 连接数据库*/
// 1.1. 引入mongoose
const mongoose = require('mongoose')
// 1.2. 连接指定数据库(URL只有数据库是变化的)
mongoose.connect('mongodb://localhost:27017/bossz_test')
// 1.3. 获取连接对象
const conn = mongoose.connection
// 1.4. 绑定连接完成的监听(用来提示连接成功)
conn.on('connected', function () {
  console.log('数据库连接成功')
})

/*2. 得到对应特定集合的Model*/
// 2.1. 字义Schema(描述文档结构)
const userSchema = mongoose.Schema({
  // 用户名
  'name': {type: String, 'require': true},
  // 密码
  'pwd': {type: String, 'require': true},
  // 类型
  'type': {'type': String, 'require': true},
  // 头像
  'avatar': {'type': String},
  // 个人简介或者职位简介
  'desc': {'type': String},
  // 职位名
  'title': {'type': String},
  // 如果你是boss 还有两个字段
  // 公司名称
  'company': {'type': String},
  // 工资
  'money': {'type': String}
})

// 2.2. 定义Model(与集合对应, 可以操作集合)   // users
// const UserModel = mongoose.model('user', userSchema)
mongoose.model('user', userSchema)
const UserModel = mongoose.model('user') // 根据标识名称获取对应的模型(构造函数)

/*3. 通过Model或其实例对集合数据进行CRUD操作*/
// 3.1. 通过Model实例的save()添加数据
function testSave() {
  const userModel = new UserModel({name: 'Bob', 'pwd': '234', type: 'boss', 'avatar': 'boy'})
  userModel.save(function (err, user) {
    console.log('save()', err, user)
  })
}
// testSave()

// 3.2. 通过Model的find()/findOne()查询多个或一个数据
function testFind() {
  UserModel.find(function (err, users) { // 返回数组, 如果没有匹配的数据, 返回[]
    console.log('find()', err, users)
  })
  UserModel.findOne({_id: '5a6addb47e61b74208d5d9e4'}, function (err, user) { //返回对象, 如果没有返回null
    console.log('findOne()', err, user)
  })
}
// testFind()

// 3.3. 通过Model的findByIdAndUpdate()更新某个数据
function testUpdate() {
  UserModel.findByIdAndUpdate({_id: '5a6addb47e61b74208d5d9e4'}, {name: 'AOA'}, function (err, user) {
    console.log('findByIdAndUpdate()', err, user) // user中被更新的属性值是原来的值
  })
}
// testUpdate()

// 3.4. 通过Model的remove()删除匹配的数据
function testDelete() {
  UserModel.remove({_id: '5a6addb47e61b74208d5d9e4'}, function (err, result) {
    console.log('remove', err, result)
  })
}
testDelete()