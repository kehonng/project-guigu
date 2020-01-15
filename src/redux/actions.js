//用来创建action的工厂函数
import { reqLogin } from '../api'
import { setItem } from '../utils/storage'
import { SAVE_USER ,REMOVE_USER} from './action-types';
import { CHANGE_LANGUAGE} from '../redux/action-types';


const saveUser = user => ({ type: SAVE_USER, data: user });
//定义清空redux的数据
export const removeUser = ()=>({type:REMOVE_USER});
//定义语言
export const changeLanguage = (lang)=>({type:CHANGE_LANGUAGE,data:lang})

export const saveUserAsync = (username,password) =>{
  return dispath =>{
    return reqLogin(username, password)
    .then((response) => {
      //登录成功
      //存储数据
      setItem('user',response)
      //触发更新
      dispath(saveUser(response))
   
    });
  };
};
