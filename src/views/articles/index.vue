<template>
<!-- 面包屑  -->
  <el-card>
      <bread-crumb slot='header'>
       <template slot='title'>文章列表</template>
      </bread-crumb>
      <!-- 搜索工具栏 -->
      <!-- 表单容器 -->
      <el-form style="padding-left:50px">
          <!-- 单选框组 -->
          <el-form-item label="文章状态:">
              <!-- 单选框选项 -->
              <el-radio-group v-model="searchForm.status">
                  <el-radio :label="5">全部</el-radio>
                  <el-radio :label="0">草稿</el-radio>
                  <el-radio :label="1">待审核</el-radio>
                  <el-radio :label="2">审核通过</el-radio>
                  <el-radio :label="3">审核失败</el-radio>
              </el-radio-group>
          </el-form-item>
          <!-- 选择器 -->
          <el-form-item label="频道类型:">
              <el-select placeholder="请选择频道" v-model="searchForm.channel_id">
                  <!-- 下拉选项 -->
                  <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
          </el-form-item>
          <!-- 日期范围选择组件 -->
          <el-form-item label="日期范围:">
              <el-date-picker v-model="searchForm.dateRange" type='daterange'></el-date-picker>
          </el-form-item>
      </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
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
      //   专门接收频道数据
      channels: []
    }
  },
  methods: {
    //   获取频道数据
    getChannels () {
      this.$axios({
        url: '/channels'
      }).then(result => {
        //   获取频道接口返回的数据
        this.channels = result.data.channels
      })
    }
  },
  created () {
    this.getChannels()
  }
}
</script>

<style>

</style>
