<template>
  <!--订单列表组件-->
  <div id="orderList">
    <!--    顶列-->
    <el-row>
      <el-col :span="7">
        <div class=" ">
          宝贝
        </div>
      </el-col>
      <el-col :span="3">
        <div class=" ">
          单价
        </div>
      </el-col>
      <el-col :span="3">
        <div class=" ">
          数量
        </div>
      </el-col>
      <el-col :span="3">
        <div class=" ">
          收货人
        </div>
      </el-col>
      <el-col :span="3">
        <div class=" ">
          实付款
        </div>
      </el-col>
      <el-col :span="2">
        <div class=" ">
          状态
        </div>
      </el-col>
      <el-col :span="3">
        <div class=" ">
          操作
        </div>
      </el-col>
    </el-row>
    <!--    顶列end-->

    <el-row id="commodity-lower" v-for="listval in orderList" :key="listval.id">
      <!--      订单时间+订单号-->
      <el-col :span="24" class="order-time">
        <div class="">
          <el-row>
            <el-col :span="5">
              <div class="">
                时间:{{ listval.createTime }}
              </div>
            </el-col>
            <el-col :span="5">
              <div class="">
                订单号:{{ listval.orderId }}
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <!--      订单时间+订单号end-->
      <!--      订单内容-->
      <el-col :span="24">
        <el-row id="commodity" v-for="commodity in listval.cartInfo" :key="commodity.id">
          <!--          商品名称+单价+数量布局-->
          <el-col :span="13">
            <div class="">
              <!--              商品名称+单价+数量内容-->
              <el-row id="commodity-left">
                <el-col :span="12" :offset="1">
                  <div class="img-title">
                    <el-image
                      style="width: 100px; height: 100px"
                      :src="img_url + commodity.productInfo.image"
                      fit="cover"></el-image>
                    <div class="img-title-p">
                      <p>{{ commodity.productInfo.storeName }}</p>
                      <p>{{ commodity.productInfo.attrInfo.sku }}</p>
                    </div>
                  </div>
                </el-col>
                <el-col :span="5">
                  <div class=" ">
                    ￥{{ commodity.productInfo.attrInfo.price }}
                  </div>
                </el-col>
                <el-col :span="5" :offset="1">
                  <div class="">
                    {{ commodity.cartNum }}
                  </div>
                </el-col>
              </el-row>
              <!--              商品名称+单价+数量内容end-->
            </div>
          </el-col>
          <!--          商品名称+单价+数量布局end-->
          <!--          收货人+实付款+状态+操作-->
          <el-col :span="11">
            <div id="commodity-right">
              <el-row>
                <el-col :span="6">
                  <div class="">{{ listval.realName }}</div>
                </el-col>
                <el-col :span="6">
                  <div class="">{{ listval.payPrice }}</div>
                </el-col>
                <el-col :span="6">
                  <div class="" v-if="listval.statusDto.type === '0' ">待付款</div>
                  <div class="" v-if="listval.statusDto.type === '1' ">待发货</div>
                  <div class="" v-if="listval.statusDto.type === '2' ">待收货</div>
                  <div class="" v-if="listval.statusDto.type === '3' ">待评价</div>
                  <div class="" v-if="listval.statusDto.type === '4' ">已完成</div>
                  <p class="orderDetails" @click="toOrderDetail(listval.unique)">订单详情</p>
                </el-col>
                <el-col :span="6">
                  <div class="commodity-button">
                    <el-button type="primary" size="small" v-if="listval.statusDto.type == 0">立即支付</el-button>
                    <el-button type="primary" size="small" v-if="listval.statusDto.type == 1">提醒发货</el-button>
                    <el-button type="primary" size="small" v-if="listval.statusDto.type == 2">确认收货</el-button>
                    <el-button type="text" size="small" v-if="listval.statusDto.type == 0">取消订单</el-button>
                    <el-button type="text" size="small" v-if="listval.statusDto.type == 4">删除订单</el-button>
                  </div>
                </el-col>
              </el-row>
            </div>
          </el-col>
          <!--          收货人+实付款+状态+操作end-->
        </el-row>
      </el-col>
      <!--      订单内容end-->
    </el-row>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="totalElements">
    </el-pagination>
  </div>
</template>

<script>
import {
  getOrderList,
  IMG_URL,
  postOrderConfirm,
  getAddress,
  postOrderCreate,
} from '../../api/api'

export default {
  name: "orderList",
  data() {
    return {
      img_url: IMG_URL,
      orderList: {},//订单数据
      totalElements: 0//总大小
    }
  },
  methods: {
    // 跳转到订单详情
    toOrderDetail(id) {
      this.$router.push({
        path: '/orderDetail',
        query: {
          key: id
        }
      })
    },
  },
  props: ['type'],
  mounted() {
    getOrderList({
      type: this.type,
      limit: 10,//页大小,默认为 10
      page: 1,//页码,默认为1
    }).then(res => {
      console.log(res)
      this.orderList = res.data.content
      this.totalElements = res.data.totalElements
    })
  }
}
</script>

<style lang="less" scoped>
#orderList {
  //background: #99a9bf;
  min-height: 60px;


  & > .el-row:nth-child(1) {
    height: 50px;
    background-color: #f1f2f7;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }

  .order-time {
    background-color: #f3f3f3;

    & > div > .el-row {
      height: 40px;
      display: flex;
      align-items: center;

      & div {
        font-size: 13px;
      }
    }
  }
}

#commodity-left {
  //background: cornflowerblue;
  display: flex;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid #E5E5E5;

  &:last-child {
    border-bottom: 0
  }
}

.img-title {
  display: flex;
  flex-direction: row;

  .img-title-p {
    font-size: 14px;
    font-weight: 400;
    margin-left: 12px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;

    & > p {
      display: inline;
      margin: 0;
    }

    & p:nth-child(2) {
      font-size: 13px;
      color: #999999;
    }
  }
}


#commodity {
  display: flex;
  align-items: center;
  //border: 1px solid #E5E5E5;
}

#commodity-right {
  height: 100%;

  & > .el-row {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

}

#commodity-lower {
  border: 1px solid #E5E5E5;
  margin-bottom: 20px;
}

.commodity-button {
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    margin: 5px;
  }
}

.el-pagination {
  margin-top: 40px;
}

.orderDetails {
  cursor: pointer;
}
</style>
