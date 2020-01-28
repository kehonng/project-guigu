import React, { Component } from 'react';
import { Form, Icon, Input, Button, message} from 'antd';
import { connect } from 'react-redux'; 

import { saveUserAsync } from '../../redux/actions';
import widtCheckLogin from '../with-check-login'


//图片需要引入才可以使用
import logo from '../../assets/logo.png';
import './index.less';

@widtCheckLogin
@connect(null,{
  saveUserAsync
  }
)
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
    /* 
      如果callback回调函数有参数就说明校验失败了
      如果callback回调函数没有阐述就说明校验成功了   
    */
    callback();
  }
  //触发表单提交事件
  login =(e)=>{
    //清除默认事件
    e.preventDefault();
    /*  
    1.校验表单
    2.收集表单数据
    3.发送请求，请求登录 
    */

    //validateFields方法 
    this.props.form.validateFields((err,values)=>{
      //
      /*
        *err
          如果表单校验失败就有错误，返回一个错误对象
          如果表单校验成功，那么返回对象就为null 
        *value
          表示手机表单的数据
       */
      if(!err){
        const { password, username } = values;
        //发送请求请求登录
        /* 
          这里会有一个跨域的错误
        */
        /* axios.post('/api/login',{username, password})
          .then((response)=>{
            //请求成功
            
            //判断是否登录成功
            if(response.data.status ===0){
              //登录成功跳转到home页面
              this.props.history.replace('/');
            }else{
              //登录失败
              message.error(response.data.msg);
              //清空密码
              this.props.form.resetFields(['password']);
            }
            console.log(response);
          })
          .catch((err)=>{
            console.log(err);
            
            //返回错误
            message.error('网络有问题~');
             //清空密码
             this.props.form.resetFields(['password']);
          }) */
          //需要得到成功还是失败
          this.props.saveUserAsync(username, password)
          .then(()=>{
            this.props.history.replace('/');
          })
          .catch((msg)=>{
            message.error(msg);
            //清空密码
            this.props.from.resetFields([password]);
          })
      }
    })
  };
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
          <Form className='login-form' onSubmit = {this.login}>
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
              <Button type="primary" className='login-form-btn' htmlType='submit'>登录</Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    )
  }
}
//暴露
export default Login;