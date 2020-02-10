import React, { Component } from 'react';
import { Form, Input, Tree, } from 'antd';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import menus from '$conf/mens';


const { Item } = Form;
const { TreeNode } = Tree;

@Form.create()
class UpdateRoleFrom extends Component {
  static propTypes ={
    role:PropTypes.object.isRequired
  }

  renderTreeNodes = menus =>
  menus.map(item => {
    if (item.children) {
      return (
        <TreeNode title={<FormattedMessage id={item.title} />} key={item.path} dataRef={item}>
          {this.renderTreeNodes(item.children)}
        </TreeNode>
      );
    }
    return <TreeNode title={<FormattedMessage id={item.title} />} key={item.path}/>
  });
  render() {
    const {
      form: { getFieldDecorator },
      role
    } = this.props;
    return (
      <Form>
        <Item label='角色名称'>
          {
            getFieldDecorator(
              'name',
              {initialValue:role.name}
            )(
              <Input disabled />
            )
          }
         
        </Item>
        <Item>
          {
            getFieldDecorator(
              'menus',
              {
                trigger:'onCheck',
                valuePropName:'checkedKeys',
                initialValue:role.menus
              }
            )(
            <Tree
              defaultExpandAll={true}
              checkable={true}
            >
            <TreeNode title='平台权限' key='0'>
             {this.renderTreeNodes(menus)}
            </TreeNode>
           
          </Tree>
            )
          }
          
        </Item>
      </Form>
    )
  }
}
export default UpdateRoleFrom;
