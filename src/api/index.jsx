/**
 * 封装请求功能函数
 */
import axiosInstance from './request';

// 请求登录
export const reqLogin = (username, password) => {
  return axiosInstance({
    url: '/login',
    method: 'POST',
    data: {
      username,
      password
    }
  });
};
//请求分类数据
export const reqGetCategoryList = ()=>{
  return axiosInstance({
    url: '/category/get',
    method: 'GET'
  });
}