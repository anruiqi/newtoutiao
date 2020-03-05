// 封装请求工具 request.js
import axios from 'axios'
// 拦截器
// 配置axios的baseURL
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 配置公共的请求头地址
axios.interceptors.requesr.use(function (config) {
  // 成功执行第一个 config所有的请求信息
  // 从缓存中取token
  const token = localStorage.getItem('user-token')
  // 统一注入到token
  config.headers.Authorization = `Bearer ${token}`
  return config
}, function (error) {
  // 失败执行第二个
  return Promise.reject(error)
})
export default axios
