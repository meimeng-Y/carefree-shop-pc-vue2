<template>
  <!--猜你喜欢组件-->
  <div class="likeList">
    <div class="likeProTit">
      <el-divider class="likeListTit" content-position="center">猜你喜欢</el-divider>
      <span class="description">Guess you like it</span>
    </div>
    <div class="likeListBox" v-for="i in 4" :key="i">
      <el-image
        style="width: 224px; height: 224px"
        :src="url"
        fit="cover"></el-image>
      <div>
        小米(MI) MIX2
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "likeList",
  data() {
    return {
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
    }
  }
}
</script>

<style lang="less" scoped>
.likeListTit {
  div {
    font-size: 18px;
  }
}

.description {
  color: #666666;
  font-size: 12px;
}

.likeProTit {
  margin-bottom: 40px;
}

.likeListBox {
  margin-bottom: 30px;
}
</style>
