import React, { Component } from 'react';
import {Menu, Icon} from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import menus from '../../../config/mens';
import { FormattedMessage } from 'react-intl';

const { SubMenu, Item } = Menu;

@connect(state=>({roleMenus:state.user.user.menus}))
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
    const roleMenus= this.props.roleMenus;
    console.log(roleMenus);
    
    const filterMenus = menus.reduce((p,c)=>{
      //深度克隆
     c = JSON.parse(JSON.stringify(c))
      //p-表示上一次得值
      //c表是当前的值
      if(roleMenus.indexOf(c.path)!==-1 || c.children){
        if(c.children){
          const children= c.children.filter(
            //如果再权限数组中找到了 返回true 不会被过滤
            //如果在权限数组中找不到 返回false 过滤掉
            item=>roleMenus.indexOf(item.path)!==-1)
            if(!children.length){
              return p;
            }
            c.children=children;
        }
        p.push(c);
      
       
      }
        
      return p;
    },[])
    let { pathname } = this.props.location;
    //console.log(pathname);
    if(pathname.indexOf('/product') !== -1 ){
       pathname = '/product'
    }
    const openKeys = this.findOpenKeys(pathname,filterMenus);
    
    
    return (
      <Menu 
        theme="dark" 
        defaultSelectedKeys={[pathname]}
        defaultOpenKeys={[openKeys]}
        mode="inline"
      >
        {this.createMenus(filterMenus)}
      </Menu>
    )
  }
}
export default LeftNav;