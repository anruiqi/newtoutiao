<template>
  <!-- 先放一个大容器  小容器只能放在大容器里-->
  <el-container>
    <!-- 左侧导航区域 -->
      <layout-aside></layout-aside>
    <!-- 右侧区域 -->
    <el-container>
      <!-- 顶部 -->
      <el-header>
        <!-- 顶部操作栏组件 -->
       <layout-header></layout-header>
      </el-header>
      <!-- 内容区域 -->
      <el-main>
        <!-- 二级路由容器 -->
        <router-view>
          内容
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
}
</script>

<style>
</style>
