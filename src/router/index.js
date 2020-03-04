import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home' // 用一种简写的方式，代替
import Login from '@/views/login'
import SecondHome from '@/views/home/second_home'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home' // 强制跳转
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    // 二级路由
    children: [
      {
        path: '',
        component: SecondHome // 默认二级路由组件
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
