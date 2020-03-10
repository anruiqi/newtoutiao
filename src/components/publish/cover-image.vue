<template>
  <div class="cover-image">
      <!-- v-for循环 -->
      <div @click="openDialog(index)" v-for="(item,index) in list" :key="index" class="cover-image-item">
          <img :src="item ? item : defaultImg" alt="">
      </div>
      <!-- 采用element-ui的弹层组件 -->
      <el-dialog :visible="dialogVisible" @close="dialogVisible=false">
          <!-- 监听谁的自定义事件 就在谁的标签上写v-on /@ -->
          <select-image @selectOneImg="receiveImg"></select-image>
      </el-dialog>
  </div>
</template>

<script>
export default {
  // 接收传递的参数
  props: ['list'],
  data () {
    return {
      // 默认图片 需要先将其转成变量
      defaultImg: require('../../assets/img/adsadsad.jpg'),
      // 控制弹层的显示或者隐藏
      dialogVisible: false,
      // 用来记录当前点击了哪个索引
      selectIndex: -1
    }
  },
  methods: {
    // 点击图片时弹出一个层
    openDialog (index) {
      // 显示弹层
      this.dialogVisible = true
      // 记录点击了哪一张图片
      this.selectIndex = index
    },
    // 接收传递的地址
    receiveImg (url) {
      // 再次传递
      this.$emit('selectTwoImg', url, this.selectIndex)
      // 关闭弹层
      this.dialogVisible = false
    }
  }
}
</script>

<style lang='less' scoped>
.cover-image {
    display: flex;
    margin: 20px 100px;
    .cover-image-item {
        border: 1px solid #ccc;
        width: 250px;
        height: 250px;
        padding: 20px;
        img {
            width:100%;
            height: 100%;
        }
    }
}
</style>
