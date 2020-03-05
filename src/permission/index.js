import router from '@/router'
// 注册全局前置守卫

router.beforeEach(function (to, from, next) {
  // 判断页面需要权限
  if (to.path.startsWith('/home')) {
    const token = window.localStorage.getItem('user-token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
