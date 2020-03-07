import Vue from 'vue'
import VueRouter from 'vue-router'
// 用一种简写的方式，代替
import Home from '@/views/home'
import Login from '@/views/login'
import SecondHome from '@/views/home/second_home'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // 强制跳转
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    // 二级路由
    children: [
      {
        path: '',
        // 默认二级路由组件
        component: SecondHome
      }, {
        // 评论列表地址
        path: 'comment',
        // 按需加载
        component: () => import('@/views/comment')
      }, {
        // 二级路由地址
        path: 'material',
        component: () => import('@/views/material')
      }, {
        path: 'articles',
        component: () => import('@/views/articles')
      }
    ]
  },
  {
    path: '/login',
    component: Login,
    name: 'login'

  }
  // {
  //   // 按需加载
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
