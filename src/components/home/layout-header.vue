<template>
      <!-- elemenyUI组件 -->
      <el-row class='layout-header' type='flex' align="middle">
          <el-col class='left' :span="12">
              <!-- 图标 -->
              <i class='el-icon-s-fold'></i>
              <span>江苏传智播客</span>
          </el-col>
          <!-- 右侧列 -->
          <el-col class="right " :span="12">
              <!-- 再放一个组件 -->
              <el-row type='flex' justify="end" align="middle">
                <img :src="userInfo.photo" alt="">
                <!-- 下拉菜单 -->
                <el-dropdown trigger='click' @command="clickExit">
               <!-- 显示的内容 -->
               <span>{{ userInfo.name}}</span>
                <!-- 下拉内容需要做具名插槽dropdown -->
                <el-dropdown-menu slot="dropdown" >
                   <!-- 下拉选项 el-dropdown-item 作为下拉选项组件 -->
                    <el-dropdown-item command="info">个人信息</el-dropdown-item>
                    <el-dropdown-item command="git">git地址</el-dropdown-item>
                    <el-dropdown-item command="lgout">退出</el-dropdown-item>
                </el-dropdown-menu>
           </el-dropdown>
              </el-row>
          </el-col>
      </el-row>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {} // 用户信息
    }
  },
  methods: {
    clickExit (command) {
      // 处理三种情况
      if (command === 'info') {
        // 点击了个人信息
      } else if (command === 'git') {
        // 如果点击了git地址就跳转到git仓库
        window.location.href = 'https://github.com/shuiruohanyu/94-heimatoutiaopc'
      } else {
        // 退出系统 1. 删除token 2. 跳转回登录页
        // 删除localstorage中某个选项
        window.localStorage.removeItem('user-token')
        this.$router.push('/login') // 跳回登录页
      }
    }
  },
  created () {
    const token = localStorage.getItem('user-token') // 从缓存中取token
    // 获取用户的个人信息
    this.$axios({
      url: '/user/profile', // 请求地址
      headers: {
        Authorization: `Bearer ${token}`
      } // 请求头参数
    }).then(result => {
      // 如果加载成功将数据赋值给 userInfo
      this.userInfo = result.data.data
    })
  }
}
</script>

<style lang='less' scoped>
    .layout-header {
        height: 60px;
        .left {
            i {
                font-size: 20px;
            }
        }
        .right {
            img {
                width:40px;
                height:40px;border-radius: 50%;
                margin-right: 4px;
            }
        }
    }
</style>
