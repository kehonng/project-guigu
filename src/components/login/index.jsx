import React, { Component } from 'react';
import { Form, Icon, Input, Button} from 'antd';

import logo from './logo.png';
import './index.less';
export default class Login extends Component {
  render() {
    return (
      <div className='login'>
        <header className='login-header'>
         <img src={logo} alt="logo"/>
         <h3>React项目: 后台管理系统</h3>
        </header>
        <section className='login-section'>
          <h3>用户登录</h3>
          <Form className='login-form '>
            <Form.Item>
            <Input
                  prefix={
                    <Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder='密码'
                />
            </Form.Item>
            <Form.Item>
            <Input
                  prefix={
                    <Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder='密码'
                />
            </Form.Item>
            <Form.Item>
              <Button type="primary" className='login-form-btn'>登录</Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    )
  }
}
