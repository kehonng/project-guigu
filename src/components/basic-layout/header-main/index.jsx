import React, { Component } from 'react';
import { Button, Icon } from 'antd';
import screenfull from 'screenfull'

import './index.less';

export default class HeaderMin extends Component {
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
  render() {
    const { isScreenFull } =this.state;
    return (
      <div className='header-main'>
         <div className='header-main-top'>
            <Button size='small' onClick={this.screenFull}>
              <Icon type={isScreenFull ?"fullscreen-exit":"fullscreen"} />
            </Button>
            <Button size='small' className='header-lang'>English</Button>
            <span>hello, admin</span>
            <Button type='link' size='small'>退出</Button>
         </div>
         <div className='header-main-bottom'>
           <div className='header-main-left'>首页</div>
           <div className='header-main-right'>2020/01/28 12:55:37</div>
         </div>
      </div>
    )
  }
}
