import React, { Component } from 'react';
import { Form, Icon, Input, Button} from 'antd';

//图片需要引入才可以使用
import logo from './logo.png';
import './index.less';
@Form.create()
class Login extends Component {

  
  //自定义表单校验
  validator = (rule,value,callback)=>{
    //console.log(rule,value);
    //console.log(rule.field);
    const reg = /^\w+$/;
    const name = rule.field === 'username'?'用户名':'密码';
    if(!value){
      callback(`请输入您的${name}`);
    }else if(value.length < 5){
      callback(`${name}长度最短为5个字符`);
    }else if(value.length > 15){
      callback(`${name}长度不能超过为15个字符`);
    }else if(!reg.test(value)){//检测value的值
      callback(`${name}只能是字母、数字、下划线`);
    }
    //不管怎么样都会触发回调函数
    callback();
  }
    render() {
    const { getFieldDecorator } = this.props.form;
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
            {
              getFieldDecorator(
                'username',
                {
                  rules:[
                    {
                      validator:this.validator
                    }
                  ]
                }
              )(
                <Input
                  prefix={
                    <Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder='密码'
                />
              )
            }
            </Form.Item>
            <Form.Item>
              {
                getFieldDecorator(
                  'password',
                  {
                    rules:[
                      {
                        validator:this.validator
                      }
                    ]
                  }
                
                )(
                  <Input
                  prefix={
                    <Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder='密码'
                />
                )
              }
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
//暴露
export default Login;