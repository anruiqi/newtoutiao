<template>
  <el-card>
      <bread-crumb slot='header'>
         <template slot='title'>发布文章</template>
      </bread-crumb>
        <!-- 表单组件  标题宽度设置于 el-form组件-->
      <el-form ref="myForm" :model='publishForm' :rules="publishRules" style="margin-left:50px" label-width="100px">
        <el-form-item label="标题" prop="title">
          <!-- 输入框 -->
          <el-input v-model="publishForm.title" placeholder="请输入您的标题" style="width:60%"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <!-- 多行输入 -->
          <el-input v-model="publishForm.content" placeholder="请输入您的内容" type='textarea' :rows="4"></el-input>
        </el-form-item>
        <el-form-item label="封面" prop="cover">
          <!-- 单选框组 -->
          <el-radio-group v-model="publishForm.cover.type">
             <el-radio :label="1">单图</el-radio>
             <el-radio :label="3">三图</el-radio>
             <el-radio :label="0">无图</el-radio>
             <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道" prop="channel_id">
           <!-- select选择器 -->
              <el-select placeholder="请选择频道" v-model="publishForm.channel_id">
              <!-- 下拉选项 v-for 循环生成 el-option-->
              <!-- label 显示值  value 保存值 -->
              <el-option v-for="item in channels" :label="item.name" :value="item.id"  :key="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <!-- 放置两个按钮 -->
          <el-button @click="publish" type='primary'>发表</el-button>
          <el-button>存入草稿</el-button>
        </el-form-item>

      </el-form>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 接收频道数据
      channels: [],
      publishForm: {
        //   文章标题
        title: '',
        //   文章内容
        content: '',
        cover: {
          // -1是自动 0是无图 1是单图 3是三图
          type: 0,
          images: []
        },
        // 频道id
        channel_id: null
      },
      //   表单校验规则
      publishRules: {
        //   teigger: blur离开焦点校验
        title: [{ required: true, message: '文章标题不能为空', teigger: blur },
          { min: 5, max: 30, message: '标题不行', teigger: blur }],
        content: [{ required: true, message: '文章内容不能为空' }],
        channel_id: [{ required: true, message: '频道内容不能为空' }]
      }
    }
  },
  methods: {
    getChannels () {
      this.$axios({
        // 获取频道数据
        url: '/channels'
      }).then(result => {
        // 将频道数据复制给本地
        this.channels = result.data.channels
      })
    },
    publish () {
      // 调用 validate
      this.$refs.myForm.validate()
    }
  },
  created () {
    this.getChannels()
  }
}
</script>

<style>

</style>
