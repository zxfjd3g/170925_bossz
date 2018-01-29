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

  handleClick = (item) => {
    console.log(item)
  }

  // 在第一次render之前调用, 而componentDidMount在第一次render之后
  componentWillMount () {
    // 给组件对象添加图片数组
    this.avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
      .split(',')
      .map(text => ({icon: require(`./imgs/${text}.png`), text})) //require()动态引入图片模块
  }
  render () {

    return (
      <List renderHeader={() => '请选择头像'}>
        <Grid
          data={this.avatarList}
          onClick={this.handleClick}
          columnNum={5}
        />
      </List>
    )
  }
}