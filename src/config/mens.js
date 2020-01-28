/* 
  定义菜单列表每个菜单
*/
const menus = [
  {
    title:'首页',
    Icon:'home',
    path:'/'
  },
  {
    title:'商品',
    Icon:'appstore',
    path:'/products',
    children:[
      {
        title:'分类管理',
        Icon:'bars',
        path:'/category'
      },
      {
        title:'商品管理',
        Icon:'tool',
        path:'/product'
      }
    ]
  },
  {
    title:'用户管理',
    Icon:'user',
    path:'/user'
  },
  {
    title:'权限管理',
    Icon:'safety',
    path:'/role'
  },
  {
    title:'图形图表',
    Icon:'area-chart',
    path:'/charts',
    children:[
      {
        title:'柱状图',
        Icon:'bar-chart',
        path:'/charts/bar'
      },
      {
        title:'饼状图',
        Icon:'pie-chart',
        path:'/charts/pie'
      },
      {
        title:'折线图',
        Icon:'line-chart',
        path:'/charts/line'
      }
    ]
  }
]
//暴露出去
export default menus;