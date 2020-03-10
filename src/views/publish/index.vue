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
          <!-- 将el-input换成 quill-editor即可 -->
          <quill-editor v-model="publishForm.content" style="height:300px" ></quill-editor>
        </el-form-item>
        <el-form-item label="封面" prop="cover" style="margin-top:120px;">
          <!-- 单选框组 -->
          <el-radio-group v-model="publishForm.cover.type" @change="changeType">
             <el-radio :label="1">单图</el-radio>
             <el-radio :label="3">三图</el-radio>
             <el-radio :label="0">无图</el-radio>
             <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 封面组件 -->
        <cover-image @selectTwoImg="receiveImg" :list="publishForm.cover.images"></cover-image>
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
          <el-button @click="publish(false)" type='primary'>发表</el-button>
          <el-button @click="publish(true)">存入草稿</el-button>
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
  // 采用watch来监听 $route
  watch: {
    // watch是监听data中的数据变化
    $route: function (to, from) {
      if (to.params.articleId) {
        // 获取数据
        this.getArticleById(to.params.articleId) // 获取文章id
      } else {
        // 如果不存在应该设置表单数据为空
        // 如果是发布文章就设置为空对象
        this.publishForm = {
          // 文章标题
          title: '',
          // 文章内容
          content: '',
          cover: {
            // -1 是自动 0是无图  1 是单图 3 是三图
            type: 0,
            // 字符串数组
            images: []
          },
          // 频道id
          channel_id: null
        }
      }
    }

  },
  methods: {
    // 接收cover-image传递过来的数据
    receiveImg (url, index) {
      // 删除替换元素
      this.publishForm.cover.images.splice(index, 1, url)
    },
    // 改变类型事件
    changeType () {
      if (this.publishForm.cover.type === 1) {
        // 单图模式
        this.publishForm.cover.images = ['']
      } else if (this.publishForm.cover.type === 3) {
        this.publishForm.cover.images = ['', '', '']
      } else {
        this.publishForm.cover.images = []
      }
    },
    getArticleById (id) {
      //  获取数据
      this.$axios({
        url: `/articles/${id}` // 请求地址
      }).then(result => {
        this.publishForm = result.data // 将数据赋值给表单数据
      })
    },
    getChannels () {
      this.$axios({
        // 获取频道数据
        url: '/channels'
      }).then(result => {
        // 将频道数据复制给本地
        this.channels = result.data.channels
      })
    },
    publish (draft) {
      // 调用 validate
      this.$refs.myForm.validate().then(() => {
        const { articleId } = this.$route.params
        this.$axios({
          // 根据场景决定用什么地址
          url: articleId ? `/articles/${articleId}` : '/articles',
          // 根据场景决定用什么类型
          method: articleId ? 'put' : 'post',
          params: {
            draft
          },
          data: this.publishForm
        }).then(() => {
          // 发布成功
          this.$message.success('发布成功')
          //   页面跳转到文章列表
          this.$router.push('/home/articles')
        }).catch(() => {
          // 发布失败
          this.$message.error('发布失败')
        })
        // this.$axios({
        //   // 请求类型
        //   method: 'post',
        //   //   请求地址
        //   url: '/articles',
        //   //   query参数
        //   params: { draft },
        //   //   请求体body参数
        //   data: this.publishForm
        // }).then(() => {
        //   // 发布成功
        //   this.$message.success('发布成功')
        //   //   页面跳转到文章列表
        //   this.$router.push('/home/articles')
        // }).catch(() => {
        //   // 发布失败
        //   this.$message.error('发布失败')
        // })
      })
    }
  },
  created () {
    this.getChannels()
    // articleId是 路由参数中定义的
    const { articleId } = this.$route.params
    // && 运算符 如果前面为true 才会执行后面的逻辑
    articleId && this.getArticleById(articleId)
  }
}
</script>

<style>

</style>
