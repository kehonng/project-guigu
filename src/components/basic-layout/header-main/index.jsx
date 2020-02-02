import React, { Component } from 'react';
import { Button, Icon,  Modal } from 'antd';
import screenfull from 'screenfull';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage } from 'react-intl';
import dayjs from 'dayjs';


import { removeItem } from '$utils/storage.js';
import { removeUser, changeLanguage } from '$redux/actions';
import menus from '../../../config/mens';

import './index.less';

@injectIntl
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
    isScreenFull:false,
    data:Date.now()
  }
  componentDidMount(){
    screenfull.on('change',this.handleIsScreenFull);
    this.timeId =setInterval(()=>{
      this.setState({
        data:Date.now()
      })
    },1000)
  };
  //解除绑定的change事件，避免造成内存泄漏
  componentWillUnmount(){
    screenfull.off('change',this.handleIsScreenFull);
    clearInterval(this.timeId);
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
  logout = () => {
    const { intl } = this.props;
    // 显示对话框
    Modal.confirm({
      title: intl.formatMessage({ id: 'logout' }),
      onOk: () => {
        // 清空用户数据
        removeItem('user');
        
        this.props.removeUser();
        // 跳转到/login
        this.props.history.replace('/login');
      }
    });
  };
  //单击国际化事件
  changeLanguage = () => {
    const language = this.props.language === 'en' ? 'zh-CN' : 'en';
    this.props.changeLanguage(language);
  };
  //页面头变化
  findTitle = (menus, pathname) => {
    for (let index = 0; index < menus.length; index++) {
      const menu = menus[index];
      // 二级菜单
      if (menu.children) {
        for (let index = 0; index < menu.children.length; index++) {
          const cMenu = menu.children[index];
          if (cMenu.path === pathname) {
            return cMenu.title;
          }
        }
      } else {
        if (menu.path === pathname) {
          return menu.title;
        }
      }
    }
  };

  render() {
    const { isScreenFull,date } =this.state;
    const { username, language, location:{pathname} } = this.props;
    const title = this.findTitle(menus, pathname)
    
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
          <span className='header-main-left'>
              <FormattedMessage id={title} />
            </span>
            <span className='header-main-right'>
              {dayjs(date).format('YYYY/MM/DD HH:mm:ss')}
            </span>
         </div>
      </div>
    )
  }
}
export default HeaderMin;