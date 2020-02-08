import axios from 'axios';
import { message } from 'antd';

import errCode from '../config/error-errCode';
import store from '$redux/store';
import { removeItem } from '$utils/storage'
import { removeUser } from '$redux/actions' 

//创建一个axios的实例化对象

const axiosInstance = axios.create({
  baseURL:'/api',//公用路径
  timeout:20000,//请求超时时间
  headers:{
    //书写不可更改的数据
  }
});

//请求拦截器
axiosInstance.interceptors.request.use((config)=>{
  
  //问题: 需要处理token
  const token = store.getState().user.token;;


  //获取公共请求参数
  if(token){
    config.headers.authorization = `Bearer ${token}`;
  }; 
//如果是以post发送的请求
if (config.method === 'post') {
  config.data = Object.keys(config.data)
    .reduce((p, c) => {
      p += `&${c}=${config.data[c]}`;
      return p;
    }, '')
    .slice(1);
  config.headers['content-type'] = 'application/x-www-form-urlencoded';
}

return config;
});
  

//响应拦截器
/* 
  统一错误
*/
axiosInstance.interceptors.response.use(
  //请求/响应成功
  (response)=>{
    if (response.data.status === 0) {
      //console.log(response.data.data);
      return response.data.data;
    } else {
      return Promise.reject(response.data.msg);
    }
    
    
  },
  //请求/响应失败
  (err)=>{
    //常见的错误代码
    
     // 错误原因
     let errMsg = '';

     if (err.response) {
      // 接受到响应了，但是响应是失败的
      // 根据响应状态码判断错误类型
      const status = err.response.status;
      errMsg = errCode[status];
      if(status === 401){
        //清空localStorage数据
        removeItem('user');
        //触发reudx更新
        store.dispatch(removeUser());
        //提示token过期
        message.success('密码过期，请重新登录')
      }
    } else {
      // 没有接受到响应
      // 根据响应message(错误信息)来判断错误类型
      if (err.message.indexOf('Network Error') !== -1) {
        errMsg = '网络连接失败，请重新连接网络试试';
      } else if (err.message.indexOf('timeout') !== -1) {
        errMsg = '网络连接超时，请连上wifi试试';
      }
    }

 
    return Promise.reject(errMsg || '发生未知错误，请联系管理员~');
   }
)
export default axiosInstance;