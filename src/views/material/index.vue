<template>
 <el-card>
     <!-- 放置面包屑 -->
     <bread-crumb slot='header'>
         <template slot='title'>
             素材管理
         </template>
     </bread-crumb>
     <!-- 上传图片组件 -->
     <el-row type='flex' justify="end">
        <el-upload :http-request="uploadImg" action="">
            <!-- 点击内容就会弹出选中文件 -->
            <el-button size="small" type="primary">上传素材</el-button>
         </el-upload>
     </el-row>

     <!-- 放置标签页 切换tabs页签的时候需要进行事件的监听 -->
     <el-tabs v-model="activeName" @tab-click="changeTab">
         <!-- 放置标签 label表示标签显示的名称 name 代表页签选中的值-->
         <el-tab-pane label="全部素材" name='all'>
             <!-- 内容  生成页面结构 -->
             <div class="img-list">
                 <!-- 对数据进行循环 -->
                 <el-card class="img-card" v-for="item in list" :key="item.id">
                     <!-- 放置图片 并赋值图片地址 -->
                     <img :src="item.url" alt="">
                     <!-- 操作栏 -->
                     <el-row class='operate' type='flex' align="middle" justify="space-around">
                         <i class='el-icon-star-on'></i>
                         <i class='el-icon-delete-solid'></i>
                     </el-row>
                 </el-card>
             </div>
         </el-tab-pane>
         <el-tab-pane label="收藏素材" name='collect'>
             <!-- 内容 -->
              <div class="img-list">
                 <!-- 对数据进行循环 -->
                 <el-card v-for="item in list" :key="item.id">
                     <!-- 放置图片 并赋值图片地址 -->
                     <img :src="item.url" alt="">
                 </el-card>
             </div>
         </el-tab-pane>
     </el-tabs>
     <!-- 分页组件 -->
     <el-row type='flex' justify="center" style='height:80px' align="middle">
       <!-- 放置分页组件 -->
       <el-pagination background
       :total="page.total"
       :current-page="page.currentPage"
       :page-size="pageSize"
       layout="prev, pager, next"
       @current-change="changePage"
       >

       </el-pagination>
     </el-row>
 </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 当前激活的页签 默认选中的素材
      activeName: 'all',
      // 全部素材的数据 和收藏的数据
      list: [],
      page: {
        // 默认页数
        currentPage: 1,
        // 当前总数
        total: 0,
        // 每页多少条
        pageSize: 10
      }
    }
  },
  methods: {
    uploadImg (params) {
      // params.file 就是需要上传的文件
      // 实例化一个FormData对象
      const data = new FormData()
      // 加入文件参数
      data.append('image', params.file)
      // 发送上传请求
      this.$axios({
        // 请求地址
        url: '/user/images',
        // 类型
        method: 'post',
        data
      }).then(() => {
        // 成功
        // 重新拉取数据
        this.getMaterial()
      }).catch(() => {
        // 失败
        this.$message.error('上传失败')
      })
    },
    changePage (newPage) {
      // 将页码复制个页码数据
      this.page.currentPage = newPage
      // 获取数据
      this.getMaterial()
    },
    // 获取素材数据
    getMaterial () {
      this.$axios({
        // 请求地址
        url: '/user/images',
        // get 参数 也就是query参数
        params: {
          // 获取不是收藏的数据 获取全部收藏数据
          collect: this.activeName === 'collect',
          // 取页码变量中的值 只要页码变量一遍 获取的数据也变
          page: this.page.currentPage,
          // 获取每页数量
          per_page: this.page.pageSize
        },
        // data参数 放的是body参数
        data: {}
      }).then(result => {
        // 将返回的数据 赋值到data中
        this.list = result.data.results
      })
    },
    chengeTab () {
      // 将页码重置成第一页
      this.page.currentPage = 1
      // 切换事件
      // 可已根据activeName决定获取哪方面的数据
      // 直接调用获取素材的方法
      this.getMaterial()
    }
  },
  created () {
    // 获取素材
    this.getMaterial()
  }
}
</script>

<style lang='less' scoped>
 .img-list {
     display: flex;
     flex-wrap:wrap;
     justify-content: center;
     .img-card {
         width: 220px;
         height: 240px;
         margin: 20px 40px;
         position: relative;
         img {
             width: 100%;
             height: 100%;
         }
         .operate {
             position: absolute;
             left:0;
             bottom:0;
             width: 100%;
             background: #f4f5f6;
             height: 30px;
             i {
                 font-size: 20px;
             }
         }
     }
 }
</style>
