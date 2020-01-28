import React from 'react';
import axios from 'axios';
import { message } from 'antd';

 function Test(){
   //自定义一个axios的实例化对象
  const axioInstance = axios.create({
    baseURL:'/api',//公共请求
    timeout:2000,//请求超时时间
    headers:{
      //里面写不可更改的参数
    }
  })
  //设置请求拦截器（发送请求之前）
  axioInstance.interceptors.request.use(
    //代码成功
    (config)=>{
      //console.log(config);
      
      if(token){
        config.headers.authorization=`Bearer ${token}`
      }
      //判断如果时POST请求，并且请求头是application/x-www-form-urlencoded;
      if(config.method === 'post'){
        //遍历data数据
          //提取data中的数据为新数组，然后进行遍历
        const keys = Object.keys(config.data);
        const data = keys
          .reduce((prev,curr)=>{
          /* 
          * prev 代表上一次的数据
          * curr 代表当前的数据 
          */
           prev += `&${curr}=${config.data[curr]}`
           return prev;
          },'')
          .slice(1);
        config.data = data;
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
      }
      return config;
    }
    /* //失败,基本用不上
    ()=>{} */
  )
  //设置响应拦截器（发送请求之后，返回响应之前）
  /* 
  * 统一处理错误
  */
  axioInstance.interceptors.response.use(
    //请求/响应成功
    (response)=>{
      if(response.data.status === 0){
        //说明就是响应成功的,直接返回成功的Promise
        //直接得到token
        return response.data.data;
      }else{
        //说明是响应成功，功能登录失败了的，直接返回失败的Promise
        return Promise.reject(response.data.msg)
      }
    },
    //请求/响应失败
    /*
        Network Error 网络错误  err.message
        err.response.status === 401  / err.message 401  没有token/token有问题
        "timeout of 10ms exceeded" err.message  请求超时

        根据不同的错误，返回不同的错误提示
      */
    (err)=>{
      //console.dir(err);
     const errCode = {
      401: '没有权限访问当前接口',
      403: '禁止访问当前接口',
      404: '当前资源未找到',
      500: '服务器发生未知错误，请联系管理员'
     };
     let errMessage= '';
     
     if(err.response){
       //说明响应是成功了的，但是响应的是失败的数据
       errMessage =  errCode[err.response.status]
     }else{
       //说明没有接到响应
       if(err.message.indexOf('Network Error') !== -1){
        errMessage = '网络发生未知错误，请换个网络试试'
       }
       if(err.message.indexOf('timeout') !== -1){
        errMessage = '网络请求超时，请连上wifi试试'
       }
     }
  
      
      return Promise.reject(errMessage || '发生未知错误，请联系管理员');
    }
  )
  
   let token = '';
   let id = '';
  const handleClick1 =()=>{
    axioInstance({
      method:'POST',
      url:'/login',
      data:{
        username:'admin',
        password:'admin'
      },
      /* headers:{
        'content-type':'application/x-www-form-urlencoded'
      } */
    })
    //登录成功
    .then((response)=>{
     console.log(response);
     
      //console.log(response.data.data);
     /*  if(response.data.status === 0){
        //请求成功
        token = response.data.data.token;
        message.success('登录成功');
      }else{
        //登录失败
        message.error(response.data.msg)
      } */
    })
    //登录失败
    .catch((err)=>{
      console.log(err);
      message.error(err);
    })
  }
  const handleClick2 =()=>{
    axioInstance({
      method:'POST',
      url:'/category/add',
      data:{
        categoryName:'平板电脑',
      },
      headers:{
        authorization:`Bearer ${token}`
      }
    })
    //登录成功
    .then((response)=>{
      //console.log(response.data.data._id);
      if(response.data.status === 0){
        //请求成功
        id = response.data.data._id;
        message.success('添加成功');
      }else{
        //登录失败
        message.error(response.data.msg)
      }
    })
    //登录失败
    .catch((err)=>{
      console.log(err);
      message.error(err);
    })
  };
  const handleClick3 =()=>{
    axioInstance({
      method:'POST',
      url:'/user/delete',
      data:{
        username:id,
      },
      headers:{
        authorization:`Bearer ${token}`
      }
    })
    //登录成功
    .then((response)=>{
      console.log(response.data.data._id);
      if(response.data.status === 0){
        //请求成功
        message.success('删除分类成功');
      }else{
        //登录失败
        message.error(response.data.msg)
      }
    })
    //登录失败
    .catch((err)=>{
      console.log(err);
      message.error(err);
    })
  };
  return (
    <div>
      <button onClick={handleClick1}>按钮1</button>
      <button onClick={handleClick2}>按钮2</button>
      <button onClick={handleClick3}>按钮3</button>
    </div>
  )

}
export default Test;