import React, { Component } from 'react';
import { Card, Icon, Form, Input, Select, InputNumber ,Button, message} from 'antd';
import BraftEditor from 'braft-editor';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';

import { getCategoryListAsync } from '$redux/actions'
import { reqAddProduct, reqUpdataProduct } from '$api';

import './index.less';
import 'braft-editor/dist/index.css';

const { Item } = Form;
const { Option } = Select;

@connect(
  state=>({categories:state.categories}),
  {
    getCategoryListAsync
  }
) 
@Form.create()
class ProductFrom extends Component {

  componentDidMount(){
    if(!this.props.categories.length){

      this.props.getCategoryListAsync()
    }
   
  }
   //判断是否是添加商品
    /* 
      添加商品是 /product
      修改商品是 /product/update/商品Id
    */
  isAddProduct = ()=>{
   return this.props.location.pathname.indexOf('/update/') === -1
  }
  //表单提交
  submit = (e)=>{
    //清除表单默认
    e.preventDefault();
    this.props.form.validateFields((err,values)=>{
      if(!err){
       // console.log(value);
        const {categoryId,name,price,desc,detail}= values;
        const isAddProduct = this.isAddProduct();
        let promise = null;
        if(isAddProduct){
          //发送添加商品请求
          promise = reqAddProduct({ name,
            desc,
            categoryId,
            price,
            detail: detail.toHTML()
          })
            
        }else{
          //发送修改商品请求
          promise = reqUpdataProduct({
            name,
            desc,
            categoryId,
            price,
            detail: detail.toHTML(),
            productId: this.props.match.params.id
          });
        }
        //复用代码
        promise 
          .then(()=>{
            message.success(`商品${isAddProduct?'添加':'修改'}成功`);
            this.props.history.push('/product');
          })
          .catch((err)=>{
            message.error(err);
          })
      }
    })
  }
  /* //后退箭头
  arrowRetreat =()=>{
    //跳转页面
    this.props.history.push('/product');
  
  } */
  //处理分类id
  handleCategories = (isAddProduct)=>{
    //获取商品数据
    if(isAddProduct){
      return '0'
    };
    //获取分类数据和商品数据Id
    const { categories, location:{state:{categoryId}}} = this.props;
    //find()方法找到返回true,找不到就返回false，既undfind
    const category = categories.find(category=>{
      return category._id === categoryId
    })
    if(category){
      //说明找到了有这个分类Id
      return categoryId
    }
    return '0';
  }
  render() {
    const { form:{getFieldDecorator},categories,location} = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 2 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
    };
    //表单数据，和路由地址
    const { state } = location;
    //是否是添加商品
    let isAddProduct = this.isAddProduct();
    //判断是否是修改商品
    /* 
      添加商品是 /product
      修改商品是 /product/update/商品Id
    */
    return (
      <Card
        title={
          <div>
            <Link to='/product'>
              <Icon type="arrow-left" className='go-retreat' />
            </Link>
            <span>{isAddProduct?'添加商品':'修改商品'}</span>
          </div>
          
        }
      >
        <Form {...formItemLayout} onSubmit={this.submit}>
          <Item label='商品名称'>
            {
              getFieldDecorator(
                'name',
                {
                  rules:[
                    {
                      required:true,message:'请输入商品名称'
                    }
                  ],
                  //初始化
                  initialValue:isAddProduct?'':state.name
                }
              )(
                <Input placeholder='请输入商品名称' />
              )
            }
           
          </Item>
          <Item label='商品描述'>
            {
              getFieldDecorator(
                'desc',{
                  rules:[
                    {
                      required:true,message:'请输入商品描述'
                    }
                  ],
                  initialValue:isAddProduct?'':state.desc
                }
              )(
                <Input placeholder='请输入商品描述' />
              )
            }
          </Item>
          <Item label='商品分类'>
            {
              getFieldDecorator(
                'categoryId',
                {
                  rules:[
                    {
                      required:true,message:'请输入商品分类'
                    }
                  ],
                  initialValue: this.handleCategories(isAddProduct)
                }
              )(
                <Select placeholder = '请选择商品分类'>
                  <Option key='0' value='0'>
                    暂无分类
                  </Option>
                  {
                    categories.map((category)=>{
                      return <Option key={category._id} value={category._id}>{category.name}</Option>
                    })
                  }
                </Select>
              )
            }
            
          </Item>
          <Item label='商品价格'>
            {
              getFieldDecorator(
                'price',{
                  rules:[
                    {
                      required:true,message:'请输入商品价格'
                    }
                  ],
                  initialValue:isAddProduct?'':state.price
                }
              )(
                <InputNumber
                  formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/￥\s?|(,*)/g, '')}
                  className='price'
                />
              )
            }
            
          </Item>
          <Item label='商品详情' wrapperCol={{span:22}}>
            {
              getFieldDecorator(
                'detail',
                {
                  rules:[
                    {
                      required:true,message:'请输入商品详情'
                    }
                  ],//BraftEditor.createEditorState()需要到富文本编辑器文档查看使用方法
                  initialValue:isAddProduct?'':BraftEditor.createEditorState(state.detail)
                }
              )(
                <BraftEditor className='detail' />
              )            
            }
          
          </Item>
          <Item>
            <Button type='primary' htmlType='submit'>提交</Button>
          </Item>
        </Form>
      </Card>
    )
  }
}
export default ProductFrom;
