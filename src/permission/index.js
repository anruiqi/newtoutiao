// 注册全局前置守卫
import router from '@/router'
// 进度条包
import progress from 'nprogress'
// 样式文件
import 'nprogress/nprogress.css'

router.beforeEach(function (to, from, next) {
  // 开启进度条
  progress.start()
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
router.afterEach(() => {
  // 处理 进度条关闭的问题
  // setTimeout(() => progress.done(), 300)
  progress.done()
})
