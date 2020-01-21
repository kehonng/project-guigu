//创建store对象

import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension'
export default createStore(reducers,
  process.env.NODE_ENV === 'development'?
  composeWithDevTools(applyMiddleware(thunk)):
  applyMiddleware(thunk)
  );