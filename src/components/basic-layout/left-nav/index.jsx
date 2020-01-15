import React, { Component } from 'react';
import { Link,withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import menus from '$conf/menus';
import {Icon,Menu } from 'antd';




const {Item,SubMenu}=Menu
//给LeftNav组件添加三大属性
@withRouter
class LeftNav extends Component {

  createMenus = (menus) => {
    return menus.map(menu =>{
      //遍历menus数组里面的内容
      if(menu.children){
        //二级菜单
        return (
          <SubMenu
          key={menu.path}
          title={
            <span>
              <Icon type={menu.icon} />
              <FormattedMessage id={menu.title} />
            </span>
          }
      >
            {menu.children.map(cMenu=> this.createMenusItem(cMenu))}
          </SubMenu>
        )
      }else{
        //一级菜单
        //console.log(22222,menu)
        return this.createMenusItem(menu);
        }
    })
    
  };
  //封装函数定义每个Item
  createMenusItem = menu => {
    //console.log(11111,menu)
    return(
      <Item key={menu.path}>
        <Link to={menu.path}>
          <Icon type={menu.icon} />
          <FormattedMessage id={menu.title} />
          
        </Link>
      </Item>
    )
  }
  //遍历菜单中的数据，返回被选中的子菜单
  findOpenKeys = (pathname , menus)=>{

    const menu = menus.find((menu) => {
      if (menu.children) {
        return menu.children.find((cMenu) => cMenu.path === pathname)
      } else{
        return false;
      }
    });
      
    

    if(menu){
      return menu.path
    }
  }
  render() {
    const { pathname } = this.props.location;
    const openKeys = this.findOpenKeys(pathname,menus)
    return (
      <Menu 
      theme="dark" 
      defaultSelectedKeys={[pathname]} 
      mode="inline"
      defaultOpenKeys = {[openKeys]}
      >
           {this.createMenus(menus)}
      </Menu>
    )
  }
}
export default LeftNav;
