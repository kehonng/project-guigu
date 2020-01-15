import React, { Component } from 'react';
import { Button , Icon, Modal} from 'antd';

import screenfull from 'screenfull';
import { withRouter } from 'react-router-dom'
import { removeItem } from '$utils/storage';
import { connect} from 'react-redux';
import { removeUser } from '../../../redux/actions';
import './index.less';


//暂且看不懂
@connect(state => ({ username: state.user.user && state.user.user.username }), {
  removeUser
})
@withRouter
 class HaderMain extends Component {
  state={
    isScreenFull:false
  }
  componentDidMount(){
    screenfull.on('change', this.handleScreenFullChange);
  }
  handleScreenFullChange =()=>{
    this.setState({
      isScreenFull:!this.state.isScreenFull
    })
  };
 componentWillMount(){
  screenfull.off('change', this.handleScreenFullChange);
 }

  screenFull = () => {
    screenfull.toggle();
  };
  loginOut = () => {
    // 显示对话框
    Modal.confirm({
      title: '您确认要退出登录吗?',
      onOk: () => {
        // 清空用户数据
        removeItem('user');
        this.props.removeUser();
        // 跳转到/login
        this.props.history.replace('/login');
      }
      // onCancel: () => {}
    });
  };
  render() {
    const {username,state} = this.props;
    console.log(this.props)
    return (
      <div className='header-main'>
        <div className='header-main-top'>
          <Button size='small' onClick={this.screenFull}>
            <Icon type="fullscreen" />
            </Button>
          <Button size='small' className='header-main-lang'>English</Button>
          <span>{username}</span>
          <Button type='link' size='small' onClick={this.loginOut}>退出</Button>
        </div>
        <div className='header-main-bottom'>
        <span className='header-main-left'>商品管理</span>
        <span className='header-main-right'>2020/01/15/0:18</span>
        </div>
      </div>
    )
  }
}

export default HaderMain;