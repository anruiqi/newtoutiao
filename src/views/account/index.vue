<template>
  <el-card>
      <!-- 账户信息 -->
      <bread-crumb slot='header'>
        <template slot='title'>账户信息</template>
      </bread-crumb>
      <!-- 放置表单容器 -->
      <el-form ref="myForm" :model="formData" :rules="rules" label-width="100px">
        <!-- 表单域 -->
        <el-form-item prop="name" label="用户名">
          <el-input v-model="formData.name" style="width:30%"></el-input>
        </el-form-item >
        <!-- 表单域 -->
        <el-form-item label="简介">
          <el-input v-model="formData.intro" style="width:30%"></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input v-model="formData.email" style="width:30%"></el-input>
        <el-form-item label="手机号">
          <el-input v-model="formData.mobile" disabled style="width:30%"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="saveUser" type='primary'>保存</el-button>
        </el-form-item>
      </el-form>
      <!-- 头像 -->
      <el-upload action="" :http-request="uploadImg" :show-file-list="false">
        <img class='head-upload' :src="formData.photo ? formData.photo : defaultImg" alt="">
      </el-upload>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        name: '',
        intro: '',
        photo: '',
        email: '',
        mobile: ''
      },
      rules: {
        name: [{ required: true, message: '用户名不能为空', trigger: 'blur' },
        // min 字符最低 长度 max标识最大长度
          { min: 1, max: 7, message: '用户名的长度为1-7位', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { pattern: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/, message: '邮箱格式不正确', trigger: 'blur' }
        ]
      },
      defaultImg: require('../../assets/img/adsadsad.jpg') // 头像变量
    }
  },
  methods: {
    // 获取用户个人资料
    getUserInfo () {
      this.$axios({
        url: '/user/profile'
      }).then(result => {
        // 将数据赋值给表单数据
        this.formData = result.data
      })
    },
    // 保存用户
    saveUser () {
      // 手动校验表单数据
      this.$refs.myForm.validate().then(() => {
        //  如果校验成功 会进入到then
        // 调用保存接口
        this.$axios({
          // 地址
          url: '/user/profile',
          // 类型
          method: 'patch',
          data: this.formData
        }).then(() => {
          this.$message.success('保存用户信息成功')
        }).catch(() => {
          this.$message.error('保存用户信息失败')
        })
      })
    },
    // 上传图片
    uploadImg (params) {
      // params.file
      const data = new FormData()
      data.append('photo', params.file)
      this.$axios({
        url: '/user/photo',
        method: 'patch',
        data // 要传递的参数
      }).then(result => {
        this.formData.photo = result.data.photo
      })
    }
  },
  created () {
    // 调用方法
    this.getUserInfo()
  }
}
</script>

<style lang='less' scoped>
 .head-upload {
    position: absolute;
    right: 350px;
    top:160px;
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }
</style>
