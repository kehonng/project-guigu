/*
  * 检测登录的高阶组件
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default function withCheckLogin(WrappedComponent) {
  
  @connect(state => ({ user: state.user }), null)
  class CheckLogin extends Component {
    // 给组件命名
    static displayName = `checkLogin(${WrappedComponent.displayName ||
      WrappedComponent.name ||
      'Component'})`;

    render() {
     
      const {
        user: { token },
        location: { pathname }
      } = this.props;

      if (token) {
        // 登录过
        if (pathname === '/Login') {
          // 跳转到主页
          return <Redirect to="/" />;
        }
      } else {
        // 没有登录过
        if (pathname !== '/Login') {
          // 跳转到主页
          return <Redirect to='/Login' />;
        }
      }

      return <WrappedComponent {...this.props}/>;
    }
  }

  return CheckLogin;
}
