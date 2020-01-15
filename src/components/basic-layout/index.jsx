import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import logo from'../../assets/img/logo.png';
import './index.less';
import LeftNav from './left-nav';
import { Layout, Breadcrumb} from 'antd';
import HaderMain from '../basic-layout/header-main'
import '../basic-layout/header-main/'

const { Header, Content, Footer, Sider } = Layout;
//const { SubMenu } = Menu;


export default class BasicLayout extends Component {
  state = {
    collapsed: false,
    isDisplay:true
  };

  onCollapse = collapsed => {
    const { isDisplay } = this.state;
    console.log(collapsed);
    this.setState({ collapsed,isDisplay:!isDisplay });
  };

  render() {
    const { isDisplay , collapsed} = this.state;
    const { children } = this.props;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <div className="layout-logo">
            <img src={logo} alt="logo"/>
            <h3 style={{display:isDisplay?'block':'none'}}>
              <FormattedMessage id='title'/>
              </h3>
          </div>
          {/*  */}
          <LeftNav />
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 ,height:80}}>
            {/* 头部静态 */}
          <HaderMain />
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>{children}</div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  }
}
