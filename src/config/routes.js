/* 
  配置路由
*/
import Home from '../components/home';
import Category from '../containers/category';
import Product from '../containers/product';
import ProductFrom from '../containers/product/product-from';
import Role from '../containers/role';
import User from '../containers/user';


const routes=[
  {
    path:'/',
    component:Home,
    exact:true
  },
  {
    path:'/category',
    component:Category,
    exact:true
  },
  {
    path:'/product',
    component:Product,
    exact:true
  },
  {
    path:'/product/add',
    component:ProductFrom,
    exact:true
  },
  {
    path:'/product/update/:id',
    component:ProductFrom,
    exact:true
  },
  {
    path:'/role',
    component:Role,
    exact:true
  },
  {
    path:'/user',
    component:User,
    exact:true
  },
]
export default routes;