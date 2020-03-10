<template>
  <!-- 还是通过页签形式来显示 el-tabs -->
   <el-tabs v-model="activeName">
       <!-- name不能重复 name表示当前标签页的标识 -->
    <el-tab-pane label="素材库" name="material">
        <!-- 查询全部的素材 -->
        <!-- v-for循环遍历list数据 -->
        <div class='select-image-list'>
            <!-- 循环 -->
            <el-card v-for="item in list" :key="item.id" class='img-card'>
                <!-- 显示素材图片 -->
                <img @click="clickImg(item.url)" :src="item.url" alt="">
            </el-card>
        </div>
        <!-- 分页 -->
        <el-row type='flex' justify="center" style="height:80px" align="middle">
               <!-- 分页组件 -->
               <!-- layout特别注意 名字不能写错 写错全死了 -->
               <el-pagination background  layout="prev, pager, next"
               :total="page.total"
               :current-page="page.currentPage"
               :page-size="page.pageSize"
               @current-change="changePage"
               ></el-pagination>
        </el-row>
    </el-tab-pane>
    <el-tab-pane label="上传素材" name="upload">上传素材</el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      // 当前激活的变量
      activeName: 'material',
      // 素材列表数据
      list: [],
      page: {
        // 第几页
        currentPage: 1,
        // 每页多少条
        pageSize: 8,
        // 总条数
        total: 0
      }
    }
  },
  methods: {
    getAllImg () {
      this.$axios({
        url: '/user/images',
        params: {
          // 查询全部的素材 所以这里给一个false
          collect: false,
          // 当前页码
          page: this.page.currentPage,
          // 每页多少条
          per_page: this.page.pageSize
        }
      }).then(result => {
        // 获取全部素材的数据
        this.list = result.data.results
        // 将总数赋值给页码变量
        this.page.total = result.data.total_count
      })
    },
    // 改变页码
    changePage (newPage) {
      // 赋值新页码
      this.page.currentPage = newPage
      // 重新获取数据
      this.getAllImg()
    },
    // 点击图片时触发
    clickImg (url) {
    //   需要将url参数传递给上层组件
    // 将url参数传出去
      this.$emit('selectOneImg', url)
    }
  },
  created () {
    // 获取所有的数据
    this.getAllImg()
  }
}
</script>

<style lang='less' scoped>
.select-image-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .img-card {
        width: 150px;
        height: 150px;
        margin: 20px 0;
        img {
            width: 100%;
            height: 100%;
        }
    }
}
</style>
