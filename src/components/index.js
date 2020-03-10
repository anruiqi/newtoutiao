// 需要使用Vue.use的方式去注册
import LayoutHeader from './home/layout-header'
import LayoutAside from './home/layout-aside'
import BreadCrumb from './common/bread-crumb'
import VueQuillEditor from 'vue-quill-editor'
import CoverImage from './publish/cover-image'
import SelectImage from './publish/select-image'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  install: function (Vue) {
    //   注册全局组件 Vue 一旦注册 在任意位置都可以使用
    Vue.component('layout-header', LayoutHeader)
    Vue.component('layout-aside', LayoutAside)
    Vue.component('bread-crumb', BreadCrumb)
    // 注册 富文本编辑器
    Vue.use(VueQuillEditor)
    // 注册封面组件
    Vue.component('cover-image', CoverImage)
    Vue.component('select-image', SelectImage) // 选择图片组件
  }
}
