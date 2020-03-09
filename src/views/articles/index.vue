<template>
<!-- 面包屑  -->
  <el-card class="articles">
      <bread-crumb slot='header'>
       <template slot='title'>文章列表</template>
      </bread-crumb>
      <!-- 搜索工具栏 -->
      <!-- 表单容器 -->
      <el-form style="padding-left:50px">
          <!-- 单选框组 -->
          <el-form-item label="文章状态:">
              <!-- 单选框选项 -->
              <el-radio-group v-model="searchForm.status" @change="changeCondition">
                  <el-radio :label="5">全部</el-radio>
                  <el-radio :label="0">草稿</el-radio>
                  <el-radio :label="1">待审核</el-radio>
                  <el-radio :label="2">审核通过</el-radio>
                  <el-radio :label="3">审核失败</el-radio>
              </el-radio-group>
          </el-form-item>
          <!-- 选择器 -->
          <el-form-item label="频道类型:">
              <!-- <el-select @change="changeCondition" placeholder="请选择频道" v-model="searchForm.channel_id"> -->
                <el-select placeholder="请选择频道" v-model="searchForm.channel_id">
                  <!-- 下拉选项 -->
                  <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
          </el-form-item>
          <!-- 日期范围选择组件 -->
          <el-form-item label="日期范围:">
              <el-date-picker type='daterange'  value-format="yyyy-MM-dd" v-model="searchForm.dateRange"></el-date-picker>
          </el-form-item>
      </el-form>
      <!-- 主体结构 -->
      <el-row class="total" type="flex" align="middle">
          <span>共找到1000条符合条件的内容</span>
      </el-row>
      <div class="article-item" v-for="item in list" :key="item.id.toString()">
          <!-- 左侧内容 -->
          <div class="left">
            <!-- 设置文章封面信息 -->
              <img :src="item.cover.images.length ? item.cover.images[0] : defaultImg" alt="">
              <div class="info">
                <span>{{item.title}}</span>
                <el-tag :type=" item.status | filterType"  class="tag">{{item.status | filterStatus }}</el-tag>
                <span class="date">{{item.pubdate}}</span>
              </div>
          </div>
          <!-- 右侧内容 -->
          <div class="right">
              <span><i class="el-icon-edit"></i>修改</span>
              <span><i class="el-icon-delete"></i>删除</span>
          </div>
      </div>
       <!-- 放置分页组件 -->
       <el-row type='flex' justify="center" style='height:80px' align="middle">
             <!-- 分页组件 -->
             <el-pagination
              :current-page="page.currentPage"
              :page-size="page.pageSize"
              :total="page.total"
              @current-change="changePage"
               background  layout='prev,pager,next'>
             </el-pagination>
       </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      page: {
        // 当前页码
        currentPage: 1,
        // 接口要求每页 10-50条之间
        pageSize: 10,
        // 总数
        total: 0
      },
      // 定义表单数据对象
      searchForm: {
        //   文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除，不传为全部 / 先将 5 定义成 全部
        // 默认为全部状态
        status: 5,
        // 没有任何频道
        channel_id: null,
        // 日期范围
        dateRange: []
      },
      //  专门接收频道数据
      channels: [],

      list: [], // 获取文章列表数据
      defaultImg: require('../../assets/img/adsadsad.jpg')
    }
  },
  watch: {
    searchForm: {
      // 深度检测searchForm中的数据变化
      deep: true,
      //  统一调用改变条件方法
      handler () {
        this.page.currentPage = 1 // 只要条件变化 就变成第一页
        this.changeCondition() // this 指向当前组件实例
      }
    }
  },
  filters: {
    filterStatus (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'
      }
    },
    filterType (value) {
      switch (value) {
        case 0:
          return 'warning'
        case 1:
          return 'info'
        case 2:
          return ''
        case 3:
          return 'danger'
      }
    }
  },
  methods: {
    // 改变页码事件
    changePage (newPage) {
      // 最新的页码
      this.page.currentPage = newPage
      // 直接调用改变事件的方法
      this.changeCondition()
    },
    changeCondition () {
      // 当触发此方法的时候 表单数据已经变成最新的了
      // 组装条件 params
      const params = {
        // 如果条件改变 就回到第一页
        page: this.page.currentPage,
        per_page: this.page.pageSize,
        // 文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除，不传为全部
        status: this.searchForm.status === 5 ? null : this.searchForm.status,
        // 就是表单的数据
        channel_id: this.searchForm.channel_id,
        begin_pubdate: this.searchForm.dateRange && this.searchForm.dateRange.length ? this.searchForm.dateRange[0] : null,
        end_pubdate: this.searchForm.dateRange && this.searchForm.dateRange.length > 1 ? this.searchForm.dateRange[1] : null
      }
      // 通过接口传入
      this.getArticles(params) // 直接调用获取方法
    },
    //   获取频道数据
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        //   获取频道接口返回的数据
        this.channels = result.data.channels
      })
    },
    // 获取文章列表
    getArticles (params) {
      this.$axios({
      // 请求地址
        url: '/articles',
        params
      }).then(result => {
      // 获取文章列表
        this.list = result.data.results
      })
    }
  },
  created () {
    this.getChannels()
    // 获取文章数据
    this.getArticles()
  }

}
</script>

<style lang='less' scoped>
    .articles {
        .total {
            height: 60px;
            border-bottom: 1px solid #ccc;
        }
        // 对文章循环 进行样式编写
        .article-item {
            display: flex;
            justify-content: space-between;
            padding: 20px 0;
            border-bottom: 1px solid #ccc;
            .left {
                display: flex;
                img {
                    width: 180px;
                    height: 100px;
                    border-radius: 4px;
                }
                .info {
                    display: flex;
                    flex-direction: column;
                    height: 100px;
                    justify-content: space-around;
                    margin-left: 10px;
                    .date {
                        color: #999;
                        font-size: 12px;
                    }
                    .tag {
                        width: 60px;
                        text-align: center;
                    }
                }
            }
            .right {
                span {
                    font-size: 12px;
                    margin-right: 8px;
                    cursor: pointer;
                    user-select: none;
                }
            }
        }
    }
</style>
