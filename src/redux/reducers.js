//用来根据prevStata和action生成Nrestate函数模块
import { combineReducers } from 'redux';
import { SAVE_USER,REMOVE_USER,CHANGE_LANGUAGE } from './action-types';
import { getItem } from '../utils/storage';

const initUser = getItem('user') || {};

function user(prevState = initUser ,action){
  switch(action.type){
    case SAVE_USER :
      return action.data
    case REMOVE_USER:
      return {};

    default:
        return prevState;
  } 
}
const initLanguage = navigator.language || navigator.languages[0] ||'zh-CN';
function language(prevState = initLanguage,action){
  switch(action.type){
    case CHANGE_LANGUAGE:
      return action.data;
    default:
        return prevState;
  } 
}

export default combineReducers({
  user,
  language
})