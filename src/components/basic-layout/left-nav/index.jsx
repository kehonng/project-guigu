import React, { Component } from 'react';
import {Menu, Icon} from 'antd';
import { Link, withRouter } from 'react-router-dom';

import menus from '../../../config/mens';
import { FormattedMessage } from 'react-intl';

const { SubMenu, Item } = Menu;

@withRouter//给子组件传递三大属性
class LeftNav extends Component {

  createMenus=(menus)=>{
    return menus.map((menu)=>{
      if(menu.children){
        //二级菜单
      return  (
        <SubMenu
          key={menu.path}
          title={
            <span>
              <Icon type={menu.Icon} />
              <FormattedMessage id={menu.title} />
            </span>
          }
        >
          {menu.children.map(cMenu =>this.createMenusItem(cMenu))};
         
        </SubMenu>
    );
      }else{
        //一级菜单
      return  this.createMenusItem(menu);
      }
    })
  };
  //定义遍历一级菜单方法
  createMenusItem =(menu)=>{
   return <Item key={menu.path}>
      <Link to={menu.path}>
        <Icon type={menu.Icon} />
        <FormattedMessage id={menu.title} />
      </Link>
    </Item>
  }
  //遍历菜单，返回展示的子菜单
  findOpenKeys = (pathname,menus)=>{
    const menu = menus.find(menu=>menu.children && menu.children.find(cMenus=>cMenus.path === pathname))
    if(menu){
      return menu.path
    }
  }
  render() {
    const { pathname } = this.props.location;
    //console.log(pathname);
    const openKeys = this.findOpenKeys(pathname,menus);
    return (
      <Menu 
        theme="dark" 
        defaultSelectedKeys={[pathname]}
        defaultOpenKeys={[openKeys]}
        mode="inline"
      >
        {this.createMenus(menus)}
      </Menu>
    )
  }
}
export default LeftNav;