import React, { Component } from 'react';
import { Card, Button, Table, message, Modal} from 'antd';
import dayjs from 'dayjs';
import { connect } from 'react-redux';

import { reqUserList } from '$api';
import { getRoleListAsync } from '$redux/actions';
import AddUserFrom from './add-user-from';
import { reqAddUser } from '$api'

@connect(state=>({roles:state.roles}),{
  getRoleListAsync
})
class User extends Component {
  state={
    isLoading:false,
    user:[],
    isShowUserModle:false
  }
  columns=[
    {
      title: '用户名',
      dataIndex: 'username'
    },
    {
      title: '邮箱',
      dataIndex: 'email'
    },
    {
      title: '手机号',
      dataIndex: 'phone'
    },
    {
      title: '注册时间',
      dataIndex: 'createTime',
      render: time => dayjs(time).format('YYYY/MM/DD HH:mm:ss')
    },
    {
      title: '所属角色',
      dataIndex: 'roleId',
      render:(roleId)=>{
        const role = this.props.roles.find(role=>role._id === roleId)
        return role && role.name
      }

    },
    {
      title: '操作',
      /* dataIndex: 'phone' */
      render:()=>{
        return <div>
          <Button type='link'>修改</Button>
          <Button type='link'>删除</Button>
        </div>
      }
    }
  ]
  //发送请求，请求用户数据
  componentDidMount(){
    this.setState({
      isLoading: true,
    });
    reqUserList()
      .then((res)=>{
        this.setState({
          user: res,
        });
        message.success('用户数据获取成功')
      })
      .catch((err)=>{
        message.error(err)
      })
      .finally(()=>{
        this.setState({
          isLoading: false
        });
      });
      //判断有没有roles数据
      if (!this.props.roles.length) {
        this.props
          .getRoleListAsync()
          .then(() => {
            message.success('获取角色列表数据成功~');
          })
          .catch(err => {
            message.error(err);
          });
      }
  }
  //显示添加用户弹框
  switchModle =(isShowUserModle)=>{
   return ()=>{
    this.setState({
      isShowUserModle
    })
   }
  }
  //添加用户数据
  addUser = ()=>{
    const { validateFields, resetFields} = this.AddUserFrom.props.form;
    validateFields((err,values)=>{
      if(!err){
        console.log(values);
        //发送请求添加用户数据
        reqAddUser(values)
          .then((response)=>{
            //更新状态
            this.setState({
              isShowUserModle:false,
              user:[...this.state.user,response]
            })
            message.success('添加用户数据成功');
            //清空数据
            resetFields()
          })
          .catch((err)=>{
            message.error(err)
          })
        
      }
    })
  }
  render() {
    const {isLoading,user,isShowUserModle} =this.state;
    const { roles } = this.props;
    return (
      <Card
        title={
            <Button type='primary' onClick={this.switchModle(true)}>添加用户</Button> 
        }
      >
          <Table 
            columns={this.columns}
            dataSource={user}
            bordered
            rowKey='_id'
            isLoading={isLoading}
          />
        <Modal
          title="添加用户"
          visible={isShowUserModle}
          onOk={this.addUser}
          onCancel={this.switchModle(false)}
        >
          <AddUserFrom roles={roles} wrappedComponentRef={(form) => this.AddUserFrom = form} />
        </Modal> 
      </Card>
    )
  }
}
export default User;