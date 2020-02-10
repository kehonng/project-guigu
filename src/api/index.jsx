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
//请求商品数据
export const reqGetProduct = (productId)=>{
  return axiosInstance({
    url:'/product/get',
    method:'GET',
    params:{
      productId
    }
  })
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
//请求修改商品状态数据
export const reqUpdataProductStatus = (productId,status)=>{
  return axiosInstance({
    url: '/product/update/status',
    method: 'POST',
    data:{
      productId,
      status
    }
  });
}

//请求获取角色列表
export const reqGetRoleList = ()=>{
  return axiosInstance({
    url: '/role/get',
    method: 'GET',
  });
}
//请求添加角色数据
export const reqAddRole = (name)=>{
  return axiosInstance({
    url: '/role/add',
    method: 'POST',
    data:{
      name
    }
  });
}
//请求更新角色权限
export const reqUpdateRole = ({roleId, authName, menus})=>{
  return axiosInstance({
    url: '/role/update',
    method: 'POST',
    data:{
      roleId, authName, menus
    }
  });
}
//请求用户列表
export const reqUserList = ()=>{
  return axiosInstance({
    url: '/user/get',
    method: 'GET',
  });
}
//请求添加用户数据
export const reqAddUser = ({username, password, phone, email, roleId})=>{
  return axiosInstance({
    url: '/user/add',
    method: 'POST',
    data:{
      username, password, phone, email, roleId
    }
  });
}