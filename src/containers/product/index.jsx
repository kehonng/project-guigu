import React, { Component } from 'react';
import { Card,Icon,Input,Select,Button,Table, message} from 'antd';

import { reqGetProductList, reqSearchProduct} from '$api'

export default class Product extends Component {
  state={
    productList:[],
    total:0,
    isLoading:false,
    searchType:'productName',
    searchValue:''
  }
  //定义成实例对象的属性，当前的值
  currentSearchValue='';
  
  //请求商品数据列表
  getProductList=(pageNum,pageSize)=>{
    //更新loding状态
    this.setState({
      isLoading:true
    })
    const {searchType,searchValue} = this.state;
    const { currentSearchValue }= this
    let promise =null;
    if(currentSearchValue){
      //搜索商品
      promise = reqSearchProduct({pageNum,pageSize,searchType,searchValue:currentSearchValue});
    }else{
      //普通获取商品
      promise = reqGetProductList(pageNum,pageSize)
    }
    //复用代码
    promise
      .then((response)=>{
        //console.log(response);
        this.setState({
          productList:response.list,
          total:response.total,
          searchValue:currentSearchValue
        })
        //请求成功/搜索成功
        message.success(`${currentSearchValue?'搜索':'获取'}商品列表成功`)
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
  componentDidMount(){
    this.getProductList(1,3)
  }
  columns = [
    {
      title: '商品名称',
      dataIndex: 'name',
    },
    {
      title: '商品描述',
      dataIndex: 'desc',
    },
    {
      title: '商品价格',
      dataIndex: 'price'
    },
    {
      title: '商品状态',
      dataIndex: 'status',
      render(){
        return (
          <div>
            <Button type='primary'>上架</Button>
            <span>已下架</span>
          </div>
        )
      }
    },
    {
      title: '操作',
      //dataIndex: 'xxx',
      render:(product)=>{
        return (
          <div>
            <Button type='link'>详情</Button>
            <Button type='link' onClick={this.updateProduct(product)}>修改</Button>
          </div>
        )
      }
    }
  ];
  //点击修改商品数据
  updateProduct=(product)=>{
    return ()=>{
      //跳转页面
      //location.state获取表单数据
      const id = product._id;
      this.props.history.push('./product/update/'+id,product);
    }
  }
  //显示添加商品组件
  showAddProduct=()=>{
    //跳转页面
    this.props.history.push('/product/add');
  }
  //根据什么类型搜索
  handleSelect= (value)=>{
    this.setState({
      searchType:value
    })
  }
  handleInput= (e)=>{
    this.setState({
      searchValue:e.target.value.trim()
    })
  }
  //点击搜索功能
  search= ()=>{
    const {searchValue } = this.state;
    this.currentSearchValue= searchValue
    this.getProductList(1,3)
  }

  render() {
    const { productList,total,isLoading, searchType, searchValue} = this.state;
    return (
      <Card
        title={
          <div>
            <Select defaultValue={searchType} onChange={this.handleSelect}>
              <Select.Option value='productName'>根据商品名称</Select.Option>
              <Select.Option value='productDesc'>根据商品描述</Select.Option>
            </Select>
            <Input 
              placeholder='关键字' 
              style={{
                width:200,
                margin:'0 10px'
              }} 
              onChange={this.handleInput}
              value={searchValue}
            />
            <Button type='primary' onClick={this.search}>搜索</Button>
          </div>
        }
        extra={
          <Button type='primary' onClick={this.showAddProduct}><Icon type='plus'></Icon>添加商品</Button>
        }
      >
        <Table 
         columns={this.columns}
         dataSource={productList}
         bordered
         pagination	={{
          pageSizeOptions:['3','6','9'],
          defaultPageSize:3,
          showQuickJumper:true,
          showSizeChanger:true,
          total,
          onChange:this.getProductList,
          onShowSizeChange:this.getProductList
         }}
         rowKey='_id'
         loading={isLoading}
        />
      </Card>
    )
  }
}
