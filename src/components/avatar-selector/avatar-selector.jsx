/*
选择用户头像的UI组件
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {List, Grid} from 'antd-mobile'

export default class AvatarSelector extends Component {

  static propTypes = {
    setAvatar: PropTypes.func.isRequired
  }

  state = {
    icon: null  // 选择的图片
  }

  // 处理点击图片
  handleClick = ({icon, text}) => {
    // console.log(icon, text)
    // 更新状态
    this.setState({icon})
    // 调用父组件传入函数, 更新父组件的状态
    this.props.setAvatar(text)
  }

  // 在第一次render之前调用, 而componentDidMount在第一次render之后
  componentWillMount () {
    // 给组件对象添加图片数组
    this.avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
      .split(',')
      .map(text => ({icon: require(`./imgs/${text}.png`), text})) //require()动态引入图片模块
  }
  render () {
    const {icon} = this.state
    // 确定头部界面
    const header = icon ? (<p>已选择头像: <img src={icon} alt="avatar"/></p>) : '请选择头像'
    return (
      <List renderHeader={() => header}>
        <Grid
          data={this.avatarList}
          onClick={this.handleClick}
          columnNum={5}
        />
      </List>
    )
  }
}