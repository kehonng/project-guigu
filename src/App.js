import React, { Component } from 'react';
import { BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import { ConfigProvider } from 'antd';

import Test from './containers/login';
import BasicLayout from './components/basic-layout';
import routes from './config/routes';
import { en, zhCN} from './locales/index';
import zh_CN from 'antd/es/locale/zh_CN';
import en_US from 'antd/es/locale/en_US';


@connect((state)=>({language:state.language,roleMenus:state.user.user}),null)
class App extends Component {
 
  render() {
    const {language,user} =this.props;
    const isEn = language === 'en';
    let filterRoute = [];

     //对route进行权限管理
    if(user){
      const { roleMenus }= user.menu;
      filterRoute = routes.filter(route=>{
        //如果在权限数据中有和路由相等的地址，那么就找到了，说明有权限不用过滤
        roleMenus.find(menu=>{
          if(menu === route.path){
            return true;
          }
          if(menu === '/product' && route.path.startsWith(menu)){
            return true
          }
          return false;
        })
      })
    }
    return (
      <ConfigProvider locale={isEn?en_US:zh_CN}>
        <IntlProvider locale={language} messages={isEn?en:zhCN}>
          <Router>
            <Switch>
              <Route path='/login' exact component={Test} />
              <BasicLayout>
                {filterRoute.map(route => {
                  return <Route {...route} key={route.path} />;
                })}
              </BasicLayout>
            </Switch>
          </Router>
        </IntlProvider>
      </ConfigProvider>
    )
  }
}
export default App;