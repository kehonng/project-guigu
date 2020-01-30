import React, { Component } from 'react';
import { BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import { ConfigProvider } from 'antd';

import Home from './components/home';
import Test from './containers/login';
import BasicLayout from './components/basic-layout';
import { en, zhCN} from './locales/index';
import zh_CN from 'antd/es/locale/zh_CN';
import en_US from 'antd/es/locale/en_US';


@connect((state)=>({language:state.language}),null)
class App extends Component {
  render() {
    const language =this.props.language;
    const isEn = language === 'en';
    return (
      <ConfigProvider locale={isEn?en_US:zh_CN}>
        <IntlProvider locale={language} messages={isEn?en:zhCN}>
          <Router>
            <Switch>
              <Route path='/login' exact component={Test} />
              <BasicLayout>
                <Route path='/' exact component={Home} />
              </BasicLayout>
            </Switch>
          </Router>
        </IntlProvider>
      </ConfigProvider>
     
    )
  }
}
export default App;