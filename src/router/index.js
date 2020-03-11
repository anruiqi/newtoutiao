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
        // 评论列表页面
        path: 'comment',
        component: () => import('@/views/comment')
      }, {
        // 素材列表页面
        path: 'material',
        component: () => import('@/views/material')
      }, { // 文章列表页面
        path: 'articles',
        component: () => import('@/views/articles')
      }, { // 发布文章页面
        path: 'publish/:articleId?',
        component: () => import('@/views/publish')
      }, { // 账户信息页面
        path: 'account',
        component: () => import('@/views/account')
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
