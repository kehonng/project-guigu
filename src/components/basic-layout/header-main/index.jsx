import React, { Component } from 'react';
import { Button, Icon,  Modal } from 'antd';
import screenfull from 'screenfull';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';


import { removeItem } from '$utils/storage.js';
import { removeUser, changeLanguage } from '$redux/actions';

import './index.less';

@connect(
  state => ({
    username: state.user.user && state.user.user.username,
    language: state.language
  }),
  {
    removeUser,
    changeLanguage
  }
)
@withRouter
class HeaderMin extends Component {
  state={
    isScreenFull:false
  }
  componentDidMount(){
    screenfull.on('change',this.handleIsScreenFull)
  };
  //解除绑定的change事件，避免造成内存泄漏
  componentWillMount(){
    screenfull.off('change',this.handleIsScreenFull)
  }
  handleIsScreenFull =()=>{
    const { isScreenFull } = this.state;
    this.setState({
      isScreenFull:!isScreenFull
    })
  }
  //全屏点击事件
  screenFull =()=>{
    screenfull.toggle();
  }
  //退出事件
  logout=()=>{
    Modal.confirm({
      title: '您确定您要退出吗?',
      onOk:()=>{
        //清空给数据
        removeItem('user');
        
        this.props.removeUser();
        //跳转到login页面
        this.props.history.replace('/login');
      }
    });
  };
  //单击国际化事件
  changeLanguage = () => {
    const language = this.props.language === 'en' ? 'zh-CN' : 'en';
    this.props.changeLanguage(language);
  };

  render() {
    const { isScreenFull } =this.state;
    const { username, language } = this.props;
  
    
    return (
      <div className='header-main'>
         <div className='header-main-top'>
            <Button size='small' onClick={this.screenFull}>
              <Icon type={isScreenFull ?"fullscreen-exit":"fullscreen"} />
            </Button>
            <Button size='small' className='header-lang' onClick={this.changeLanguage}>{language==='en'?'Eglish':'中文'}</Button>
            <span>hello, {username}</span>
            <Button type='link' size='small' onClick={this.logout}>退出</Button>
         </div>
         <div className='header-main-bottom'>
           <div className='header-main-left'>首页</div>
           <div className='header-main-right'>2020/01/28 12:55:37</div>
         </div>
      </div>
    )
  }
}
export default HeaderMin;