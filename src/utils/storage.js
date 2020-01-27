/* 
* 封装localStorage的工具函数
*/
const localStorage = window.localStorage;
export function getItem(key){
  
  const value = localStorage.getItem(key);
  try{
    //读取
    return JSON.parse(value);
  }catch(e){
    return value;
  }
  
};

export function setItem(key, value){
  value = JSON.stringify(value);
  localStorage.setItem(key,value);
};

export function removeItem(key){
  localStorage.removeItem(key);
};