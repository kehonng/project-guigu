/**
 * 用来创建action对象工厂函数模块
 * 同步action
 * 异步action
 */
import { reqLogin } from '../api';
import { setItem } from '../utils/storage';
import { SAVE_USER, REMOVE_USER }from './action-types';


//退出清空用户数据
export const removeUser = ()=>({type:REMOVE_USER});
//保存用户数据
const saveUser = (user) =>({type:SAVE_USER,data:user});
export const saveUserAsync = ( username, password)=>{
   return dispatch =>{
   //异步函数
      return reqLogin( username, password)
      //代表登录成功
      .then((response)=>{
         //存储数据
         setItem('user',response);
         //触发更新
         dispatch(saveUser(response));
      })
   }
}