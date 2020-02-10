import React, { Component } from 'react';
import { Form, Input, Select} from 'antd';
import PropTypes from 'prop-types'

import {validator} from '$utils/tools';

const { Item }= Form;
const { Option }= Select;

@Form.create()
class AddUserFrom extends Component {
  static propTypes={
    roles:PropTypes.array.isRequired
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { roles } = this.props;
  
    return (
      <Form wrapperCol={{span:15}} labelCol={{span:5}}>
        <Item label='用户名'>
          {
            getFieldDecorator('username',
              {
                rules:[
                  {required:true,message:'请输入用户名'},
                  {validator}
                ]
              }
            )(<Input placeholder='请输入用户名' />)
          }
        </Item>
        <Item label='密码'>
          {
            getFieldDecorator('password',
              {
                rules:[
                  {required:true,message:'请输入密码'},
                  {validator}
                ]
              }
            )(<Input placeholder='请输入密码' />)
          }
        </Item>
        <Item label='手机号'>
          {
            getFieldDecorator('phone',
              {
                rules:[
                  {required:true,message:'请输入手机号'}
                ]
              }
            )(<Input placeholder='请输入手机号' />)
          }
        </Item>
        <Item label='手邮箱机号'>
          {
            getFieldDecorator('email',
              {
                rules:[
                  {required:true,message:'请输入邮箱'}
                ]
              }
            )(<Input placeholder='请输入邮箱' />)
          }
        </Item>
        <Item label='所属角色'>
          {
            getFieldDecorator('roleId',
              {
                rules:[
                  {required:true,message:'请选择角色'}
                ]
              }
            )(
              <Select placeholder='请选择角色'>
                {
                  roles.map((role)=>{
                    return (
                      <Option key={role._id} value={role._id}>
                        {role.name}
                      </Option>
                    );
                  })
                }
              </Select>
            )
          }
        </Item>
        
      </Form>
    )
  }
}
export default AddUserFrom;
