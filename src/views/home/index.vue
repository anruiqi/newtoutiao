<template>
  <!-- 先放一个大容器  小容器只能放在大容器里-->
  <el-container>
    <!-- 左侧导航区域 -->
    <el-aside>
      <layout-aside></layout-aside>
    </el-aside>
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
import LayoutAside from '@/components/home/layout-aside'
import LayoutHeader from '@/components/home/layout-header'
export default {
  components: {
    'layout-aside': LayoutAside,
    'layout-header': LayoutHeader
  }
}
</script>

<style>

</style>
