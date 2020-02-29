<template>
  <div class="login">
      <!-- 表单 -->
      <el-card class="login-card">
        <!-- 表单内容 -->
        <!-- 头部标题 -->
        <div class="title">
          <img src="../../assets/img/logo_index.png" alt="">
        </div>
        <!-- 表单组件 -->
        <el-form style="margin-top:20px">
         <!-- 表单容器 -->
          <el-form-item>
            <!-- 表单域 -->
            <el-input placeholder="请输入手机号"></el-input>
          </el-form-item>
          <!-- 验证码 -->
          <el-form-item>
            <el-input style="width:60%" placeholder="请输入验证码"></el-input>
            <!-- 发送验证码 -->
            <el-button style="float:right" plain>发送验证码</el-button>
          </el-form-item>
          <!-- 勾选框 -->
          <el-form-item>
            <el-checkbox>我已阅读同意用户协议和隐私条款</el-checkbox>
          </el-form-item>
          <!-- 登录按钮 -->
          <el-form-item>
            <el-button type="primary" style="width:100%">登录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
.login {
  background-image: url(../../assets/img/beijing.jpg);
  height: 100vh; // 当前屏幕可视区域分成一百份
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-card {
    width: 440px;
    height: 340px;
    .title{
      text-align: center;
      img{
        height: 40px;
      }
    }
  }
}
</style>
