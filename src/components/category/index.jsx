import React, { Component } from 'react';
import { Card, Button, Icon, Table  } from 'antd';
import { connect } from 'react-redux';
import {getCategoryListAsync } from '$redux/actions';

@connect(state => ({ categories: state.categories }), {
  getCategoryListAsync
})
class Category extends Component {
  componentDidMount(){
    this.props.getCategoryListAsync();
  }
  render() {
    const {categories} = this.props;
    const columns=[
      {
        title: '品类名称',
        dataIndex: 'name',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render(){
          return <div>
            <Button type='link'>修改分类</Button>
            <Button type='link'>删除分类</Button>
          </div>
        }
      }
    ];
    /* const data=[
      {
        key: '1',
        name: '中国加油'
      },
      {
        key: '2',
        name: '武汉加油'
      },
      {
        key: '3',
        name: '武汉加油'
      },
      {
        key: '4',
        name: '武汉加油'
      },
    ] */
    return (
      <Card title="分类列表" extra={
        <Button type='primary'><Icon type='plus' />分类列表</Button>
      }>
      <Table 
        columns={columns}
        dataSource={categories}
        bordered
        pagination={{
          showSizeChanger:true,
          showQuickJumper:true,
          pageSizeOptions:['3','6','9'],
          defaultPageSize:3
        }}
      />
      </Card>
    )
  }
};
export default Category;
