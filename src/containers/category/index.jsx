import React, { Component } from 'react';
import { Card, Button, Icon, Table, Modal, message  } from 'antd';
import { connect } from 'react-redux';


import {getCategoryListAsync, addCategoryAsync, updateCategoryAsync,deleteCategoryAsync} from '$redux/actions';
import AddCategoryFrom from './add-category-from';

@connect(state => ({ categories: state.categories }), {
  getCategoryListAsync,
  addCategoryAsync,
  updateCategoryAsync,
  deleteCategoryAsync
})
class Category extends Component {
 
  //定义状态
  state={
    isShowCategoryModel:false,
    isUpdateCategory:false,
    category:{}
  }
  componentDidMount(){
    if(!this.props.categories.lenght){
      this.props.getCategoryListAsync();
    }
    
  };
  columns=[
    {
      title: '品类名称',
      dataIndex: 'name',
    },
    {
      title: '操作',
      /* dataIndex: 'name', */
      render:(category)=>{
        console.log(category.name);
        
        return <div>
          <Button type='link' onClick={this.showCategoryModel(category)}>修改分类</Button>
          <Button type='link' onClick={this.delCategory(category)}>删除分类</Button>
        </div>
      }
    }
  ];
  //删除分类
  delCategory =(category)=>{
    return ()=>{
      Modal.confirm({
        title:`您确认想要删除${category.name}分类吗`,
        onOk:()=>{
          this.props.deleteCategoryAsync(category._id)
            .then(()=>{
              message.success('删除分类成功')
            })
            .catch((err)=>{
              message.error(err)
            })
        }
      })
    }
  }
  //添加/修改分类
  addCategory=()=>{
    /* 
      1.校验表单
      2.收集数据
      3.发送请求，更新后台数据。
      4.数据更新到前端展示。
    */
    const {validateFields,resetFields} = this.addCategoryFrom.props.form;
    const { category:{name,_id} } = this.state;
    validateFields((errors, values)=>{
      if(!errors){
        const { categoryName } = values;
        let promise = null;
        //添加/修改分类
        if(name){
          //修改分类
          promise = this.props
          .updateCategoryAsync(_id,categoryName)
        }else{
          //添加分类
          promise = this.props
        .addCategoryAsync(categoryName)
       
          
        }
        promise.then(()=>{
          //请求成功
          message.success(`${name?'修改':'添加'}分类成功`);
          //隐藏对话框
          this.hiddenAddCategory();
          //清空表单数据
          resetFields();
        })
        .catch((err)=>{
          //请求失败
          message.error(err)
        })
      }
    })
  };
  //隐藏添加分类
  hiddenAddCategory=()=>{
    const { resetFields } = this.addCategoryFrom.props.form
    //更新状态
    this.setState({
      isShowCategoryModel:false,
    })
   //清空表单数据
   resetFields();

  };
  //点击显示分类列表
  showCategoryModel=(category={})=>{
   return ()=>{
    this.setState({
      isShowCategoryModel:true,
      category,
      isUpdateCategory:category.name

    })
   }
  }
  /* //点击修改分类
  showUpdateCategoryModel=(category)=>{
   
    return ()=>{
      this.setState({
        isUpdateCategory:true,
        category
      });
      //显示Model
      this.showCategoryModel();
     
    };
  }; */
  render() {
    const {categories} = this.props;
    const { isShowCategoryModel,category } = this.state;
    return (
      <Card title="分类列表" extra={
        <Button type='primary' onClick={this.showCategoryModel()}><Icon type='plus' />分类列表</Button>
      }>
      <Table 
        columns={this.columns}
        dataSource={categories}
        bordered
        pagination={{
          showSizeChanger:true,
          showQuickJumper:true,
          pageSizeOptions:['3','6','9'],
          defaultPageSize:3
        }}
        rowKey='_id'
      />
      <Modal
          title={category.name?'修改分类':'添加分类'}
          visible={isShowCategoryModel}
          onOk={this.addCategory}
          onCancel={this.hiddenAddCategory}
          width={350}
        >
          <AddCategoryFrom 
            categoryName={category.name}
            wrappedComponentRef={(form) => this.addCategoryFrom = form} 
          />
        </Modal>
      </Card>
    )
  }
};
export default Category;
