<template>
    <el-card>
        <bread-crumb slot='header'>
           <template slot="title">
               评论管理
           </template>
        </bread-crumb>
        <!-- 表格组件 -->
        <el-table :data="list">
            <el-table-column prop="title" width="600px"  label="标题"></el-table-column>
            <el-table-column :formatter="formatterBool" prop="comment_status" label="评论状态"></el-table-column>
            <el-table-column  prop="total_comment_count" label="总评论数"></el-table-column>
            <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
            <el-table-column  label="操作">
              <template slot-scope="obj">
                <el-button size="small" type='text'>修改</el-button>
                <el-button @click="openOrClose(obj.row)" size="small" type='text'>{{ obj.row.comment_status ? '关闭' : '打开'}}评论</el-button>
              </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: [

      ]
    }
  },
  methods: {
    //   获取评论
    getComment () {
      this.$axios({
        // 请求地址
        url: '/articles',
        params: {
          response_type: 'comment'
        }
      }).then(result => {
        // 返回的结果
        this.list = result.data.results
      })
    },
    // 格式化函数
    // row代表当前一行数据
    // column 代表当前列的信息
    // cellValue 代表当前单元格的值
    // index 代表当前的索引
    formatterBool (row, column, cellValue, index) {
      return cellValue ? '正常' : '关闭'
    },
    // 打开或关闭评论
    openOrClose (row) {
      const mess = row.comment_status ? '关闭' : '打开'
      this.$confirm(`是否${mess}评论`, '提示').then(() => {
        // 打开或关闭接口
        this.$axios({
          // 请求地址
          url: '/comments/status',
          // 请求类型
          method: 'put',
          params: {
            // 获取评论id 将BigNumber类型转换成字符串
            article_id: row.id.toString()
          },
          data: {
            // 状态是 打开还是关闭
            allow_comment: !row.comment_status
          }
        }).then(() => {
          this.$message.success(`${mess}评论成功`)
          // 重新获取数据
          this.getComment()
        }).catch(() => {
          this.$message.error(`${mess}评论失败`)
        })
      })
    }
  },
  created () {
    // 在钩子函数中获取数据
    this.getComment()
  }
}
</script>

<style>

</style>
