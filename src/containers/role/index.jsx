import React, { Component } from 'react';
import { Card, Button, Table, Radio, message, Modal } from 'antd';
import dayjs from 'dayjs'
import { connect } from 'react-redux';

import { getRoleListAsync, addRoleAsync, updataRoleAsync } from '$redux/actions';
import RoleFrom from './role-from';
import UpdateRoleFrom from './update-role-from';

const { Group } = Radio ;


@connect(
  state=>({roles:state.roles,username:state.user.user.username}),
  {
    getRoleListAsync,
    addRoleAsync,
    updataRoleAsync
  }
)
class Role extends Component {

  state={
    isLoading:false,
    isShowAddRoleModle:false,
    isShowUpdateRoleModle:false,
    role:{}
  }
  columns=[
    {
     // 注意：如果不写dataIndex就会报错。
     dataIndex: '_id',
     render: id => {
       return <Radio key={id} value={id} />;
     }
    },{
      title: '角色名称',
      dataIndex: 'name'
    },
    {
      title:'创建时间',
      dataIndex:'createTime',
      render:(time)=>dayjs(time).format('YYYY/MM/DD HH:mm:ss')
    },
    {
      title:'授权时间',
      dataIndex:'authTime',
      render:(time)=>{
       return time && dayjs(time).format('YYYY/MM/DD HH:mm:ss')
      }
    },
    {
      title:'授权人',
      dataIndex:'authName',
    }
  ]
   //发送请求
   componentDidMount(){
     //更新状态
    this.setState({
    isLoading:true
    })
    this.props.getRoleListAsync()
      .then(()=>{
        message.success('获取角色列表成功')
      })
      .catch((err)=>{
        message.error(err);
      })
      .finally(()=>{
        this.setState({
          isLoading:false
        })
      })
 }
 //显示modle对话框
 switchRoleModle = (key,value)=>{
  return ()=>{
    //判断是否显示对话框
    if(!value){
     //判断对话框是创建角色还是设置角色权限
     if(key === 'isShowAddRoleModle'){
      this.AddRoleFrom.props.form.resetFields();
     }else{
       //设置的角色权限
     }
    }
    this.setState({
      [key]:value
    })
  }
 }
 /* switchShowUpdateRoleModle = (isShowUpdateRoleModle)=>{
   return ()=>{
    this.setState({
      isShowUpdateRoleModle
    })
   }
 } */
 /* //取消modle对话框
 handleCancel=()=>{
   this.setState({
    isShowAddRoleModle:false
   })
 } */

  //点击确认按钮添加角色数据
  addRole = ()=>{
    const {validateFields,resetFields} = this.AddRoleFrom.props.form;
    validateFields((err,values)=>{
      if(!err){
        const {name} = values;
        console.log(name);

        //发送请求
        this.props.addRoleAsync(name)
          .then(()=>{
            this.setState({
              isShowAddRoleModle:false
            })
            //清空数据
            resetFields();
            message.success('添加角色数据成功');
          })
          .catch((err)=>{
            message.error(err);
          })
      }
    })
  

  }
  //处理单选按钮高亮
  handleRoleChange=(e)=>{
    //得到选中的值
    const id = e.target.value
    //在状态数据中根据id查找，找到以后返回数据
    const role = this.props.roles.find(role=>role._id === id)
    if(role){
     this.setState({
      role
     })
    }
  }
  //设置角色权限
  updateRole = ()=>{
    const { validateFields, resetFields } = this.updateRoleFrom.props.form;
    validateFields((err,values)=>{
      if(!err){
        console.log(values);
        //权限列表
        const { menus } = values;
        //角色ID
        const roleId = this.state.role._id;
        //授权人名称
        const authName = this.props.username;
        //发送请求
        this.props.updataRoleAsync({ menus: JSON.stringify(menus), roleId, authName })
          .then((response)=>{
            message.success('设置角色权限成功');
            //隐藏对话框
            this.setState({
              isShowUpdateRoleModle:false,
              role:response
            })
            //清除数据
            resetFields();

          })
          .catch((err)=>{
            message.error(err);
          })
        
      }
    })
  }
  
  render(){
    const { isLoading, isShowAddRoleModle, role, isShowUpdateRoleModle } = this.state;
    const { roles }= this.props;
    return (
      <Card
        title={
          <div>
            <Button type='primary' onClick={this.switchRoleModle('isShowAddRoleModle',true)}>创建角色</Button> &nbsp;&nbsp;
            <Button type='primary' onClick={this.switchRoleModle('isShowUpdateRoleModle',true)}  disabled={!role._id}>设置角色权限</Button> 
          </div>
        }
      >
        <Group  style={{width:"100%"}} onChange={this.handleRoleChange}>
          <Table 
            columns={this.columns}
            dataSource={roles}
            bordered
            rowKey='_id'
            isLoading={isLoading}
          />
        </Group>
        <Modal
          title="创建角色"
          visible={isShowAddRoleModle}
          onOk={this.addRole}
          onCancel={this.switchRoleModle('isShowAddRoleModle',false)}
        >
          <RoleFrom wrappedComponentRef={(form) => this.AddRoleFrom = form} />
        </Modal>
        <Modal
          title="设置角色权限"
          visible={isShowUpdateRoleModle}
          onOk={this.updateRole}
          onCancel={this.switchRoleModle('isShowUpdateRoleModle',false)}
        >
         <UpdateRoleFrom role={role}  wrappedComponentRef={(form) => this.updateRoleFrom = form}/>
        </Modal>
        
      </Card>
    )
  }
}

export default Role;
