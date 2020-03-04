<template>
  <div class="layout-aside">
      <!-- //左侧导航组件 -->
      <div class="title">
          <img src="../../assets/img/logo_admin.png" alt="">
      </div>
      <!-- 导航菜单 -->
      <el-menu router="" background-color="#323745" text-color="#adafb5">
          <!-- 子菜单 -->
          <el-menu-item index='/home'>
              <i class='el-icon-s-home'></i>
              <span>首页</span>
          </el-menu-item>
          <el-submenu index="1">
              <!-- 二级菜单 -->
              <template slot='title'>
                  <i class='el-icon-s-grid'></i>
                  <span >内容管理</span>
              </template>
              <el-menu-item index='/home/publish'>发布文章</el-menu-item>
              <el-menu-item index='/home/articles'>内容列表</el-menu-item>
              <el-menu-item index='/home/comment'>评论列表</el-menu-item>
              <el-menu-item index='/home/material'>素材管理</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
              <!-- 二级菜单 -->
              <template slot='title'>
                  <i  class='el-icon-s-opportunity'></i>
                  <span >粉丝管理</span>
              </template>
              <el-menu-item index='/home/picture'>图文数据</el-menu-item>
              <el-menu-item index='/home/fansinfo'>粉丝概况</el-menu-item>
              <el-menu-item index='/home/fansphoto'>粉丝画像</el-menu-item>
              <el-menu-item index='/home/fanslist'>粉丝列表</el-menu-item>
          </el-submenu>
           <el-menu-item index='/home/account'>
              <i class='el-icon-user-solid'></i>
              <span>账户信息</span>
          </el-menu-item>
      </el-menu>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
.layout-aside {
    background-color: #2e2f32;
    height: 100vh;
    width: 230px;
    .title {
        text-align: center;
        padding: 10px 0;
        img {
            height: 35px;
        }
    }
    .el-menu {
        border-right: none;
    }
}
</style>
