/**
 * 用来创建action对象工厂函数模块
 * 同步action
 * 异步action
 */
import { reqLogin,reqGetCategoryList } from '../api/index';
import { setItem } from '../utils/storage';
import { SAVE_USER, REMOVE_USER, CHANGE_LANGUAGE, GET_CATEGORY_LIST }from './action-types';

//语言转换
export const changeLanguage = (lang)=>({type:CHANGE_LANGUAGE,data:lang});

//退出清空用户数据
export const removeUser = ()=>({type:REMOVE_USER});
//保存用户数据
const saveUser = user => ({ type: SAVE_USER, data: user });

export const saveUserAsync = (username, password) => {
  return dispatch => {
    // 当前函数返回值，作为将来组件调用时的返回值
    // 异步操作
    return reqLogin(username, password).then(response => {
      // 登录成功
      /*
          存储用户数据和token

          存在redux中（内存存储，一旦刷新就没了）
          还需要持久化存储：localStorage
            因为频繁操作 localStorage 性能不好，如果存储在redux，性能更好

          存储：localStorage 和 redux
          读取：先从 localStorage 中读取，存在 redux 中，后面通过 redux 读取使用
        */
      setItem('user', response);
      // 触发更新
      dispatch(saveUser(response));
    })
  };
};

//获取分类数据
const getCategoryList = categories => ({
  type: GET_CATEGORY_LIST,
  data: categories
});
export const getCategoryListAsync = () => {
  return dispatch => {
    // 发送请求
    return reqGetCategoryList()
      .then(response => {
        console.log(response);
        
        // 调用dispatch，触发更新
        dispatch(getCategoryList(response));
      })
      .catch(err=>{
        console.log(err);
        
      })
  };
};