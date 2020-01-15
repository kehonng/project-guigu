import React, { Component } from 'react'
import logo from '../../assets/img/logo.png';
import './index.less';
import { Form, Icon, Input, Button,message} from 'antd';
import { connect } from 'react-redux';
import { saveUserAsync } from '../../redux/actions';
import withCheckLogin from '$cont/with-check-login';




const { Item } = Form;
@withCheckLogin
@connect(null, { saveUserAsync })
@Form.create()
class Login extends Component {
 
  //表单校验
   validator = (rule, value, callback)=>{
   //console.log(rule,value);
   const name = rule.field === 'username'?'用户名':'密码';
   const reg = /^\w+$/;
    if(!value){
      callback(`${name}用户名不能为空`)
    }else if(value.length <5){
      callback(`${name}必须大于5`)
    }else if(value.length > 13){
      callback(`${name}必须小于13`)
    }else if(!reg.test(value)){
      callback(`${name}只能包含英文、数字、下划线`)
    }
    callback()
  }
   //表单提交事件
   login = (e) => {
    //清除默认
    e.preventDefault();
    //校验表单手机数据
    this.props.form.validateFields((err,values) => {
      //console.log(values);
      
      if(!err){
        //手机表单数据
        const { username, password } = values;
        //发送登录请求
        /* axios
        .post('/api/login', { username, password })
          //请求成功
          .then( response =>  {
            console.log(response)
            //判断是否登录成功
            if(response.data.status === 0){
              //登录成功,跳转至目标页面
              this.props.history.push('/');
            }else {
              //登录错误
              message.error(response.data.msg)
              //清空密码
              this.props.form.resetFields(['password'])
            }
          } )
          //请求失败
          .catch(err => {
            console.log(err)
            //提示错误
            message.err('网络错误');
            //清空密码
            this.props.form.resetFields(['password'])
          }) */


        // 得到登录成功/失败
        this.props
          .saveUserAsync(username, password)
          .then(() => {
            this.props.history.replace('/');
          })
          .catch(msg => {
            message.error(msg);
            this.props.form.resetFields(['password']);
          });
      }
    })
    
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className='login'>
        <header className='login-header'>
          <img src={logo} alt="logo"/>
          <h1>React项目: 后台管理系统</h1>
        </header>
        <section className='login-section'>
          <h3>项目登录</h3>
          <Form className='login-form' onSubmit={this.login}>
          <Item>
          {
            getFieldDecorator(
              'username',
              {rules:[

                {validator:this.validator}
              ]}
            )(<Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="用户名"
            />,)
          }
          
          </Item>
          <Item>
            {
              getFieldDecorator(
                'password',
              {rules:[
                {validator:this.validator}
              ]}
              )(<Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="密码"
              />)
            }
          </Item>
          <Item>
          <Button className='login-form-btn' type="primary" htmlType="submit">
            登录
          </Button>
          </Item>
          </Form>
        </section>
      </div>
    )
  }
};
//给Login传递Form属性
export default Login;