/* 
  自定义登录校验
*/

//自定义登录校验
export const validator = (rule,value,callback)=>{
  //console.log(rule,value);
  //console.log(rule.field);
  const reg = /^\w+$/;
  const name = rule.field === 'username'?'用户名':'密码';
  if(!value){
    //自掉用函数==>代表登录成功
    callback();
  }else if(value.length < 4){
    callback(`${name}长度最短为4个字符`);
  }else if(value.length > 15){
    callback(`${name}长度不能超过为15个字符`);
  }else if(!reg.test(value)){//检测value的值
    callback(`${name}只能是字母、数字、下划线`);
  }
  //不管怎么样都会触发回调函数
  /* 
    如果callback回调函数有参数就说明校验失败了
    如果callback回调函数没有阐述就说明校验成功了   
  */
  callback();
}