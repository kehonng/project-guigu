/**
 * 用来根据prevState和action生成newState函数模块
 */
import { combineReducers } from 'redux';
import { getItem } from '../utils/storage'

import { 
  SAVE_USER, 
  REMOVE_USER, 
  CHANGE_LANGUAGE, 
  GET_CATEGORY_LIST,
  ADD_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  GET_ROLE_LIST,
  GET_ROLE,
  UPDATA_ROLE
}from './action-types';

const initUser = getItem('user') || {};
function user(prevState = initUser, action) {
  switch (action.type) {
    case SAVE_USER:
      return action.data;
    case REMOVE_USER:
      return {};
    default:
      return prevState;
  }
};
const initLanguage = navigator.language || navigator.languages[0] || 'zh-CN';
function language(prevState= initLanguage,action){
  switch(action.type){
    case CHANGE_LANGUAGE:
      return action.data;
    default:
      return prevState;
  }
};
const initCategories = [];
function categories(prevState= initCategories,action){
  switch(action.type){
    case GET_CATEGORY_LIST:
      return action.data;
    case ADD_CATEGORY:
      return [...prevState,action.data];
    case UPDATE_CATEGORY:
      return prevState.map(category=>{
        if(category._id === action.data._id){
         return action.data
        }else{
          return category
        }
      });
    case DELETE_CATEGORY:
      return prevState.filter(category=>{
        if(category._id !== action.data){
          return true;
        }else{
          return false;
        }
      })
    default:
      return prevState;
  }
}
//获取角色列表
const initroles=[];

function roles(prevState=initroles,action){
  switch (action.type){
    case GET_ROLE_LIST:
      return action.data;
    case GET_ROLE:
      return [...prevState,action.data];
    case UPDATA_ROLE:
      return prevState.map(role=>{
        if(role._id === action.data._id){
          return action.data;
        }
        return role;
      })
    default:
      return prevState;
  }
}
export default combineReducers({
  user,
  language,
  categories,
  roles
})