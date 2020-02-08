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

//请求添加分类
export const reqAddCategory = (categoryName) => {
  return axiosInstance({
    url: '/category/add',
    method: 'POST',
    data: {
      categoryName
    }
  });
};

//请求修改分类
export const reqUpdateCategory = (categoryId,categoryName) => {
  return axiosInstance({
    url: '/category/update',
    method: 'POST',
    data: {
      categoryId,
      categoryName
    }
  });
};
//请求删除分类
export const reqdeleteCategory = (categoryId) => {
  return axiosInstance({
    url: '/category/delete',
    method: 'POST',
    data: {
      categoryId,
    }
  });
};

//请求商品数据
export const reqGetProductList = (pageNum,pageSize)=>{
  return axiosInstance({
    url: '/product/list',
    method: 'GET',
    params:{
      pageNum,
      pageSize
    }
  });
}
//请求添加商品数据
export const reqAddProduct = ({categoryId,name,price,desc,detail})=>{
  return axiosInstance({
    url: '/product/add',
    method: 'POST',
    data:{
      categoryId,name,price,desc,detail
    }
  });
}
//请求修改商品数据
export const reqUpdataProduct = ({categoryId,name,price,desc,detail,productId})=>{
  return axiosInstance({
    url: '/product/update',
    method: 'POST',
    data:{
      categoryId,name,price,desc,detail,productId
    }
  });
}
//请求搜索商品数据
export const reqSearchProduct = ({searchType,searchValue,pageNum,pageSize})=>{
  return axiosInstance({
    url: '/product/search',
    method: 'GET',
    params:{
      //意思是搜索类型取其中一个
     
      pageNum,
      pageSize,
      [searchType]:searchValue
    }
  });
}