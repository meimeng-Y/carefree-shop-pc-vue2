<template>
  <!--商品列表-->
  <el-row :gutter="10">
    <el-col :span="6" v-for="(val, index) in productList" :key="index">
      <el-card :body-style="{ padding: '0px' ,height: '446px' }" shadow="hover">
        <img :src='img_url + val.image'
             class="image">
        <div class="product_title">
          <!--          商品名称-->
          <span>{{ val.storeName }}</span>
        </div>
        <!--          价格-->
        <div class="price">
          <!--            当前价格-->
          <span class="presentPrice">￥{{ val.price | filterPrice }}</span>
          <!--            历史价格-->
          <span class="originalPrice">￥{{ val.otPrice | filterPrice }}</span>
        </div>
        <div class="line"></div>
        <div>
          <p class="productDesc">{{ val.storeInfo }}</p>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import {IMG_URL} from '../../api/api'

export default {
  name: "productList",
  data() {
    return {
      img_url: IMG_URL,//图片主机地址
    };
  },
  props: ['productList'],
}
</script>

<style lang="less" scoped>
.time {
  font-size: 13px;
  color: #999;
}


.button {
  padding: 0;
  float: right;
}

.image {
  height: 282px;
  width: 282px;
  display: block;
  margin: 0 auto 25px;
}

.line {
  width: 160px;
  height: 2px;
  background-color: #f0f0f0;
  margin: 15px auto;
}

.product_title {
  padding-bottom: 12px;

  span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: bold;
    font-size: 1rem;
  }
}

.price {
  .presentPrice {
    font-size: 18px;
    font-weight: bold;
    color: #ff7800;
  }

  .originalPrice {
    font-size: 16px;
    text-decoration: line-through;
    margin-left: 10px;
  }
}

.productDesc {
  color: #999999;
}

.el-col {
  margin-bottom: 28px;

  &:hover {
    cursor: pointer;
  }
}

</style>
