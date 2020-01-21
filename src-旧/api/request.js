//封装axios模块
import axios from 'axios';
import errCode from '../config/error-code';
import store from '../redux/store'

//创建一个axios的实例
const axiosInstance = axios.create({
  //基础路径，一般指公用的路径
  baseURL:'/api',
  timeout:20000,//超时时间限制，超过这个时间就中断请求
  headers:{
    //公共请求头参数，里面的元素都是写死了的
  }
})

//设置拦截器

//请求拦截器
axiosInstance.interceptors.request.use(
  config => {
    //先定义个空touken
    let token = store.getState().user.token;
    //设置公共的参数
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    
    //判断是否时post请求，并且检查请求头的类型。如果是application/x-www-form-urlencoded
    //就需要进行转换处理
    if(config.method === 'post'){
      config.data = Object.keys(config.data)
        .reduce((prev,curr) => {
          prev += `&${curr}=${config.data[curr]}`;
          return prev
        },'')
        .slice(1);
        config.headers['content-type'] = 'application/x-www-form-urlencoded'

    }
    return config;
  }
);

//响应拦截器,再响应之后

//统一处理全局的错误
axiosInstance.interceptors.response.use(
  //响应成功的
  response => {
    //成功的
    if(response.data.status === 0){
      return response.data.data;
    }else{
      //功能失败的
      return Promise.reject(response.data.msg);
    }
  },
  //响应失败的，根据错误返回不同的提示
  err => {
    //错误的原因
    let errMsg ='';
    if(err.response){
      //说明是响应成功的，但是返回的是失败的响应
      errMsg = errCode[err.response.status];
    }else{
      //说明响应失败了
      if(err.response.indexOf('Network Error') === -1){
        errMsg = '网络连接失败，请重新连接网络试试';
      }else if(err.response.indexOf('timeout') === -1){
        errMsg = '网络连接超时，请换wifi试试';
      }
    }
    return Promise.reject(errMsg || '服务器发生位置错误，请联系管理员')
  }
)

export default axiosInstance;