<template>
  <div class="login">
      <!-- 表单 -->
      <el-card class="login-card">
        <!-- 表单内容 -->
        <!-- 头部标题 -->
        <div class="title">
          <img src="../../assets/img/logo_index.png" alt="">
        </div>
        <!-- 表单组件 绑定model数据 绑定rules属性  ref属性-->
        <el-form ref="loginForm" :model="loginForm" :rules='loginRules' style="margin-top:20px">
         <!-- 表单容器 设置prop属性 -->
          <el-form-item prop="mobile" >
            <!-- 表单域   -->
            <el-input v-model="loginForm.mobile"  placeholder="请输入手机号"></el-input>
          </el-form-item>
          <!-- 验证码 设置prop属性 -->
          <el-form-item prop="code">
            <el-input v-model="loginForm.code"  style="width:60%" placeholder="请输入验证码"></el-input>
            <!-- 发送验证码 -->
            <el-button style="float:right" plain>发送验证码</el-button>
          </el-form-item>
          <!-- 勾选框 设置prop属性-->
          <el-form-item prop="checked">
            <el-checkbox v-model="loginForm.checked">我已阅读同意用户协议和隐私条款</el-checkbox>
          </el-form-item>
          <!-- 登录按钮 -->
          <el-form-item>
            <el-button @click="login" type="primary" style="width:100%">登录</el-button>
          </el-form-item>
        </el-form>
      </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 登录表单的数据
      loginForm: {
        mobile: '', // 手机号
        code: '', // 验证码
        checked: false // 是否同协议
      },
      // 表单的验证规则
      loginRules: {
        mobile: [{ required: true, message: '手机号不能为空' }, {
          pattern: /^1(3|4|5|7|8)\d{9}$/, // 手机正则
          message: '格式不正确'
        }], // 手机号
        code: [{ required: true, message: '验证码不能为空' }, {
          pattern: /^\d{6}$/, // 正则
          message: '格式不正确'
        }], // 验证码
        checked: [{
          validator: function (rule, value, callback) {
            value ? callback() : callback(new Error('同意协议'))
          }
        }] // 是否同意
      }
    }
  },
  methods: {
    login () {
      // 获取el-form对象实例
      //  this.$refs.loginForm 获取的就是el-form的对象实例
      // 第一种
      // this.$refs.loginForm.validate(function (isOK) {
      //   if (isOK) {
      //     console.log('校验通过')
      //   } else {
      //     console.log('校验未通过')
      //   }
      // }) // 方法
      // 第二种 promise
      this.$refs.loginForm.validate().then(() => {
        // 校验成功就传到 then
        this.$axios({
          url: '/authorizations', // 请求地址
          data: this.loginForm,
          method: 'post'
        }).then(result => {
          // 成功 之后打印结果
          window.localStorage.setItem('user-token', result.data.data.token)
          this.$router.push('/home')
        }).catch(() => {
          // 提示消息
          this.$message.error('用户名或者密码错误')
        })
      })
    }
  }
}
</script>

<style lang='less' scoped>
.login {
  height: 100vh; // 当前屏幕可视区域分成一百份
  display: flex;
  justify-content: center;
  align-items: center;
  &:before {
    content: '132';
    width: 100%;
    height: 100%;
    position: absolute;
    background-image: url(../../assets/img/beijing.jpg);
    filter: blur(2px);
    background-size: cover;
  }
  .login-card {
    background: rgba(0,0,0,0.5);
    z-index: 2;
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
