<template>
  <!--猜你喜欢组件-->
  <div class="likeList">
    <div class="likeProTit">
      <el-divider class="likeListTit" content-position="center">猜你喜欢</el-divider>
      <span class="description">Guess you like it</span>
    </div>
    <div class="likeListBox" v-for="(val,index) in productList" :key="index" v-if="index < 4"
         @click="goProductDetail(val.id)"
    >
      <el-image
        style="width: 224px; height: 224px"
        :src="img_url + val.image"
        fit="cover"></el-image>
      <div>
        {{ val.storeName }}
      </div>
    </div>
  </div>
</template>

<script>
import {IMG_URL} from '../../api/api'

export default {
  name: "likeList",
  data() {
    return {
      img_url: IMG_URL,//图片地址前缀
    }
  },
  props: ['productList'],
  methods: {
    goProductDetail(id) {
      console.log(id)
      this.$router.push({
        name: 'productDetail',
        query: {
          productId: id
        }
      })
      this.$router.go(0)
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
  cursor: pointer;
}
</style>
