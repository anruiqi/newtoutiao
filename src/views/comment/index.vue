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
                <el-button size="small" type='text'>修改</el-button>
                <el-button size="small" type='text'>关闭评论</el-button>
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
