<template>
  <!--  订单详情页-->
  <div id="orderDetail">
    <el-row>
      <el-col :span="22" :offset="1">
        <div>
          <!--        导航条-->
          <div class="head">
            <div class="goOrder" @click=''>我的订单</div>
            <div>
              <i class="el-icon-arrow-right"> </i>
            </div>
            <div>订单详情</div>
          </div>
          <!--        导航条end-->
          <!--          流程图-->
          <div class="process">
            <div class="process-left">
              <div>
                订单号：{{ order.orderId }}
              </div>
              <div>
                <div v-if="order.statusDto && order.statusDto.type==0">
                  <p>等待付款</p>
                  <el-button plain size="small" @click="closeOrder(order.orderId)">
                    取消订单
                  </el-button>
                  <el-button plain size="small" @click="getUrl">付款</el-button>
                </div>
                <div v-if="order.statusDto && order.statusDto.type==1">
                  <p>待发货</p>
                </div>
                <div v-if="order.statusDto && order.statusDto.type==2">
                  <p>待收货</p>
                </div>
                <div class="box mar-top-40" v-if="order.statusDto && order.statusDto.type==3">
                  <p>待评价</p>
                </div>
                <div v-if="order.statusDto && order.statusDto.type==4">
                  <p>已完成</p>
                </div>
              </div>
            </div>
            <div class="process-right">
              <el-steps :active="active_img" align-center>
                <el-step title="提交订单" icon="el-icon-tickets"></el-step>
                <el-step title="付款成功" icon="el-icon-wallet"></el-step>
                <el-step title="等待收货" icon="el-icon-shopping-cart-full"></el-step>
                <el-step title="完成" icon="el-icon-folder-checked"></el-step>
              </el-steps>
            </div>
          </div>
          <!--          流程图end-->
          <!--          订单详细信息-->
          <div class="orderInfo">
            <div class="address war-box">
              <div>
                收货信息
              </div>
              <div>
                <p>收货地址:{{ order.userAddress }}</p>
                <p>收货人：{{ order.realName }}</p>
                <p>收货电话：{{ order.userPhone }}</p>
              </div>
            </div>
            <div class="info war-box">
              <div>订单信息</div>
              <div>
                <p>订单号:{{ order.orderId }}</p>
                <p>创建时间：{{ order.createTime }}</p>
                <p>备注：{{ order.remark }}</p>
              </div>
            </div>
            <div class="order-nav">
              <span>宝贝</span>
              <span>宝贝属性</span>
              <span>状态</span>
              <span>数量</span>
              <span>单价</span>
            </div>
            <!--            商品数据-->
            <div class="product-data" v-for="val in order.cartInfo " :key="val.id">
              <div>
                <img :src="img_url+val.productInfo.image">
                <p>{{ val.productInfo.storeName }}</p>
              </div>
              <div>{{ val.productInfo.attrInfo.sku }}</div>
              <div>
                <div v-if="order.statusDto && order.statusDto.type==0">待付款</div>
                <div v-if="order.statusDto && order.statusDto.type==1">待发货</div>
                <div v-if="order.statusDto && order.statusDto.type==2">待收货</div>
                <div v-if="order.statusDto && order.statusDto.type==3">已完成</div>
              </div>
              <div>{{ val.cartNum }}</div>
              <div class="price">¥{{ val.productInfo.attrInfo.price }}</div>
            </div>
            <!--            商品数据end-->
            <!--            商品总价-->
            <div class="Overview">
              <p>商品总价：<span class="right" style="color:#FF7800;">¥{{ order.totalPrice }}</span></p>
              <p>运费：<span class="right">￥{{ order.payPostage }}</span></p>
              <p v-if="order.statusDto && order.statusDto.type==0">
                需付款：
                <span class="right" style="color:#FF7800;">
                  ¥{{ order.payPrice }}
                </span>
              </p>
              <p v-if="order.statusDto && order.statusDto.type!=0">
                实付款：
                <span class="right" style="color:#FF7800;">
                  ¥{{ order.payPrice }}
                </span>
              </p>
            </div>
            <!--            商品总价end-->
          </div>
          <!--          订单详细信息end-->
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {getOrderDetail, IMG_URL, postOrderCancel} from "../../api/api";

export default {
  name: "orderDetail",
  data() {
    return {
      img_url: IMG_URL,
      order: {},//订单详情信息
      active_img: 1
    }
  },
  methods: {
    //取消订单
    closeOrder(val) {
      postOrderCancel({
        id: val.toString()
      }).then(res => {
        console.log(res)
      })
    },
    //付款
    getUrl() {

    }
  },
  mounted() {
    let key = this.$route.query.key
    console.log(key)
    getOrderDetail({
      key: key
    }).then(res => {
      console.log(res)
      this.order = res.data
      this.active_img = Number(res.data.statusDto.type)
    })
  }
}
</script>

<style lang="less" scoped>
.head {
  height: 50px;
  display: flex;
  align-items: center;
}

.process {
  height: 290px;
  display: flex;
  flex-direction: row;
  border: 1px solid #E5E5E5;
  margin-bottom: 20px;

  .process-left {
    flex: 2;
    display: flex;
    align-items: center;
    flex-direction: column;
    border-right: 1px solid #E5E5E5;

    & > div:nth-of-type(1) {
      padding: 50px 0;
      font-weight: bold;
      font-size: 16px;
    }

    & > div:nth-of-type(2) {
      padding-top: 20px;
      color: #FF7800;
      font-weight: bold;
      font-size: 24px;
    }
  }

  .process-right {
    flex: 6;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}

.goOrder {
  cursor: pointer;
}

.orderInfo {
  display: flex;
  flex-direction: column;
  border: 1px solid #E5E5E5;
  margin-bottom: 55px;
}

.war-box {
  display: flex;
  flex-direction: column;
  padding: 25px;

  & div:nth-child(1) {
    text-align: left;
  }

  & div:nth-child(2) {
    margin-left: 25px;
    display: flex;

    p {
      flex: 1;
    }
  }
}

.address {
  border-bottom: 1px solid #E5E5E5;
}

.order-nav {
  height: 40px;
  display: flex;
  align-items: center;
  background-color: #EDEDED;

  span {
    flex: 1;
    font-size: 12px;
  }

  & span:nth-child(1) {
    flex: 3;
  }
}

.product-data {
  display: flex;
  align-items: center;
  padding: 25px 0;
  border-bottom: 1px solid #E5E5E5;

  & > div:nth-child(1) {
    img {
      width: 80px;
      height: 80px;
    }

    display: flex;
    align-items: center;
    margin-left: 25px;
  }

  & > div {
    flex: 1;
  }

  & > div:nth-child(1) {
    flex: 3;
  }
}

.price {
  color: #FF7800;
  font-weight: bold;
}

.Overview {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 25px;

  p {
    width: 250px;
    font-size: 20px;
    color: #666666;
    font-weight: 400;
    display: flex;
    justify-content: space-around;
    margin: 0;
  }

  & p:last-child {
    margin-top: 20px;
  }
}
</style>
