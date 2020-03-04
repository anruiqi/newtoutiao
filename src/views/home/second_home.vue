<template>
  <div class="second_home">
    <el-carousel class="el-carousel" indicator-position="outside">
    <el-carousel-item v-for="item in list" :key="item">
      <img :src="item" alt="">
    </el-carousel-item>
  </el-carousel>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [
        'http://www.pptbz.com/pptpic/UploadFiles_6909/201105/2011052107231180.jpg',
        'http://file06.16sucai.com/2015/1126/22ee57582d53a8ad1ea259bc3ab2be1e.jpg',
        'http://file06.16sucai.com/2016/0328/7529ff22140abc3d08e830fbd2b0072b.jpg',
        'http://b-ssl.duitang.com/uploads/item/201505/27/20150527142520_PN2vm.jpeg'
      ]
    }
  }
}
</script>

<style>
.second_home {
    height: calc(100vh - 60px);
    background-size: cover;
    background-image: url("https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1587015988,3168526286&fm=26&gp=0.jpg")
}
.el-carousel{
  width: 400px;
  margin: 0 auto;
}
</style>
