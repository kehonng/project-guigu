import React from 'react';
import axios from 'axios';
import { message } from 'antd'

export default function Test(){

  //配置拦截器
  //先创建一个axios的实例化对象
  const axiosInstance = axios.create({
    //基础路径，公用的路径
    baseURL:'/api',
    //超时中断，超过这个事件就会中断请求
    timeout:20000,
    headers:{
      //公共请求头，参数必须写死参数
    }
  })
  //设置配置器
  //请求拦截器，再请求之前触发
  axiosInstance.interceptors.request.use(
    //设置发送请求，代码成功（还没有发送成功）
    config =>{
      //修改config配置，添加headers动态参数
      //console.log(config);
      if (token) {
        //只要后边的有toke那就添上一个
        config.headers.authorization = `Bearer ${token}`;
      }
      //如果请求方式时post就判断下是用的哪种方式请求头，
      //如果是application/x-www-form-urlencoded这种就需要转换
      if(config.method === 'post'){
        const keys = Object.keys(config.data);
        const data = keys
          .reduce((prev,curr)=> {
          prev += `&${curr}=${config.data[curr]}`;
          return prev;
        },'')
          .slice(1);
          config.data = data;

          config.headers['content-type'] = 'application/x-www-form-urlencoded'
      }

      return config;
    }

    ////设置发送请求，代码失败（还没有发送成功）
    //一般不用写
   /*  ()=>{} */
  );

  //响应拦截器，再响应之后，
  
  //统一错误处理
  axiosInstance.interceptors.response.use(
  
    //响应成功的
    (response)=>{
      if(response.data.status === 0){
        //就返回一个成功的promise
        console.log(response)
        return response.data.data;
      }else{
        //功能错误，直接就返回失败
        return Promise.reject(response.data.msg)
      }
    },
    //响应失败的
    //根据不同的错误，返回不同的提示
    (err)=>{
      const errCode = {
        401:'没有权限访问当前接口',
        403:'禁止访问当前接口',
        404:'当前资源未找到',
        500:'服务器发现未知错误，请联系管理员解决'
      }
      let errMessage = '';
      if(err.response){
        //说明接受带了响应，响应是失败的
        errMessage = errCode[err.response.status]
      }else{
        //说明没有接到响应，请求失败了
        if(err.message.indexOf('Network Error') !== -1){
          errMessage = '网络连接失败，请重新连接试试'
        } else if(err.message.indexOf('timeout') !== -1){
          errMessage = '网络连接超时，请换个wifi试试'
        }
      }
      return Promise.reject(errMessage ||'发生未知错误，请联系管理员');
    }
  );
      /* 
      } */
      /* 
     {
        
        
      }else{ */
        //说明没有接到响应，请求失败了
        /*
        Network Error 网络错误  err.message
        err.response.status === 401  / err.message 401  没有token/token有问题
        "timeout of 10ms exceeded" err.message  请求超时

        根据不同的错误，返回不同的错误提示
      */
        /*
      }
      
    }
  ); */

  //定义一个空的token
  let token ='';
  let id = '';
  const handleClick1 =()=>{
    //发送请求数据
    axiosInstance({
      method:'POST',
      url:'/login',
      data:{
        username:'admin',
        password:'admin'
      },
    })
    //请求成功
    .then(response => {
      console.log(response)
      //console.log(response.data.msg);
      /* if(response.data.status === 0){
        token = response.data.data.token;
        message.success('登录成功')
      }else{
        message.error(response.data.msg)
      } */
    })
    .catch(err => {
      console.log(err)
      message.error(err);
    })
  };
  const handleClick2 =()=>{
    axiosInstance({
      method:'POST',
      url:'/category/add',
      data:{
        categoryName:'意大利炮',
      },
      /* headers:{
        authorization:`Bearer ${token}`
      } */
      
    })
    //请求成功
    .then(response => {
      //console.log(response)
     // console.log(response.data.msg);
      if(response.data.status === 0){
        id = response.data.data._id;
        message.success('添加成功');
      }else{
        message.error(response.data.msg)
      }
    })
    .catch(err => {
      //console.log(err)
      message.error(err);
    })
  };
  const handleClick3 =()=>{
    axiosInstance({
      method:'Post',
      url:'/category/delete',
      data:{
        categoryId:id,
      },
      /* headers:{
        authorization:`Bearer ${token}`
      } */
      
    })
    //请求成功
    .then(response => {
     /*  console.log(response)
      console.log(response.data.msg); */
      if(response.data.status === 0){
        console.log(response)
        message.success('删除分类成功')
      }else{
        message.error(response.data.msg)
        console.log(response);
        
      }
    })
    .catch(err => {
      console.log(err)
      message.error('网络错误');
    })
  };

  return (
    <div>
      <button onClick = {handleClick1}>按钮1</button>
      <button onClick = {handleClick2}>按钮2</button>
      <button onClick = {handleClick3}>按钮3</button>
    </div>
  )
}