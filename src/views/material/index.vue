<template>
 <el-card>
     <!-- 放置面包屑 -->
     <bread-crumb slot='header'>
         <template slot='title'>
             素材管理
         </template>
     </bread-crumb>
     <!-- 放置标签页 -->
     <el-tabs v-model="activeName">
         <!-- 放置标签 label表示标签显示的名称 name 代表页签选中的值-->
         <el-tab-pane label="全部素材" name='all'>
             <!-- 内容 -->
             全部素材
         </el-tab-pane>
         <el-tab-pane label="收藏素材" name='collect'>
             <!-- 内容 -->
             收藏素材
         </el-tab-pane>
     </el-tabs>
 </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 当前激活的页签 默认选中的素材
      activeName: 'all'
    }
  }
}
</script>

<style>

</style>
