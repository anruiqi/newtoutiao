/* eslint-disable no-undef */
// 封装请求工具 request.js
import axios from 'axios'
import router from '@/router'
// 引入处理大数字的包
import JSONBig from 'json-bigint'
// 拦截器
// 配置axios的baseURL
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 配置公共的请求头地址
// 对axios返回的数据进行自定义处理 用json-bigint
axios.defaults.transformResponse = [function (data) {
  return data ? JSONBig.parse(data) : {}
}]
axios.interceptors.request.use(function (config) {
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

// 响应拦截器
axios.interceptors.response.use(function (response) {
  // 成功时执行
  return response.data ? response.data : {}
}, function (error) {
  // 失败时执行
  // 删除钥匙
  if (error.response.status === 401) {
    localStorage.removeItem('user-token')
    // 返回登录页
    router.push('/login')
  }
  return Promise.reject(error)
})
export default axios
