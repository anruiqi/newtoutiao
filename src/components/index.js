// 需要使用Vue.use的方式去注册
import LayoutHeader from './home/layout-header'
import LayoutAside from './home/layout-aside'
import BreadCrumb from './common/bread-crumb'
export default {
  install: function (Vue) {
    //   注册全局组件 Vue 一旦注册 在任意位置都可以使用
    Vue.component('layout-header', LayoutHeader)
    Vue.component('layout-aside', LayoutAside)
    Vue.component('bread-crumb', BreadCrumb)
  }
}
