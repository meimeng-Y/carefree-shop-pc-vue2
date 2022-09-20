<template>
  <!--订单购买界面-->
  <el-row>
    <el-col :span="22" :offset="1">
      <div class="outer-box">
        <div class="poTitle">请选择收货地址</div>
        <!--          地址盒子-->
        <div class="poAddress-box">
          <!--          地址盒子内容-->
          <div class="poAddListTit">
            <span>收件人信息</span>
            <el-link type="primary">新增地址</el-link>
          </div>
          <div class="poAddList-content-box">
            <div class="showMoreBox" :class="{showMoreAdd: showMoreAddress}">
              <div class="addressItem" v-for="(item,index) in address" :key="index" @click="selectAddress(item.id)"
                   :class="{addressActive : currentAddressId === item.id}"
              >
                <span class="userName">{{ item.realName }}</span>
                <span class="addressInfo">{{ item.province + item.city + item.district }}</span>
                <span class="phone">{{ item.phone }}</span>
              </div>
            </div>
            <div class="openMore" @click="openMoreAdd">
              展开更多<i></i>
            </div>
          </div>
          <!--          地址盒子内容end-->
        </div>
        <!--          地址盒子end-->
        <!--        订单信息盒子-->
        <div class="order-information-box">
          <div class="poTitle">
            请确认订单信息
          </div>
          <div>
            <!--            信息标题栏-->
            <el-row class="orderInfoTit">
              <el-col :span="8">
                <div class="">商品</div>
              </el-col>
              <el-col :span="4">
                <div class="">商品属性</div>
              </el-col>
              <el-col :span="4">
                <div class="">单价</div>
              </el-col>
              <el-col :span="4">
                <div class="">数量</div>
              </el-col>
              <el-col :span="4">
                <div class="">小计</div>
              </el-col>
            </el-row>
            <!--            信息标题栏end-->
            <!--            信息内容栏-->
            <el-row class="shopOrder" v-for="val in cartInfo" :key="val.id">
              <el-col :span="8">
                <div class="commodity">
                  <el-image
                    style="width: 80px; height: 80px"
                    :src="img_url+val.productInfo.image"
                    fit="cover"></el-image>
                  {{ val.productInfo.storeName }}
                </div>
              </el-col>
              <el-col :span="4">
                <div class="">{{ val.productInfo.attrInfo.sku }}</div>
              </el-col>
              <el-col :span="4">
                <div class="">￥{{ val.productInfo.attrInfo.price }}</div>
              </el-col>
              <el-col :span="4">
                <div class="">{{ val.cartNum }}</div>
              </el-col>
              <el-col :span="4">
                <div class="">￥{{ val.productInfo.attrInfo.price * val.cartNum }}</div>
              </el-col>
            </el-row>
            <!--            信息内容栏end-->
          </div>
        </div>
        <!--        订单信息盒子end-->
        <!--        其他备注盒子-->
        <div class="remarksInfo">
          <el-input
            type="textarea"
            :rows="4"
            resize="none"
            placeholder="如有其他要求，请备注。"
            v-model="textarea">
          </el-input>
        </div>
        <!--        其他备注盒子end-->
        <!--        选择支付方式盒子-->
        <div class="payList-box">
          <div class="payTit">
            选择支付方式
          </div>
          <div class="payList">
            <span class="payActive">
              钱包支付
            </span>
          </div>
        </div>
        <!--        选择支付方式盒子end-->
        <div class="placeOrderBtn">
          <span>运费：{{ priceGroup.storeFreePostage === 1 ? '免运费' : '需要运费' }}</span>
          <span>需付款：<b>￥{{ totalPrice }}</b></span>
          <el-button @click="orderSubmit" type="primary" v-throttle>提交订单</el-button>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import {getAddress, IMG_URL, postOrderConfirm, postOrderCreate} from '../../api/api'

export default {
  name: "placeOrder",
  data() {
    return {
      img_url: IMG_URL,
      textarea: '',
      showMoreAddress: false,//将地址进行显示或隐藏
      currentAddressId: '', // 选中地址id
      orderKey: '',//订单的标识（ID)
      cartInfo: [],//商品信息数据
      userInfo: {},//用户信息
      totalPrice: 0,//总价
      priceGroup: {},//订单的汇总信息
      address: [],//地址信息
    }
  },
  methods: {
    // 展开更多地址
    openMoreAdd() {
      this.showMoreAddress = !this.showMoreAddress
    },
    // 选择地址
    selectAddress(item) {
      console.log(item)
      this.currentAddressId = item
    },
    // 提交订单
    orderSubmit() {
      postOrderCreate({
        addressId: this.currentAddressId,//地址的ID
        couponId: 0,//优惠券ID,功能为实现
        key: this.orderKey,//确认订单的key
        payType: 'yue',//支付方式 TODO 不知为何写死
        shipping_type: '1',//配送方式 1=快递 ，2=门店自提
        useIntegral: 0, //使用积分 1-表示使用
        mark: '',//备注
        from: 'h5',//来源
        pinkId: 0,//拼团id 0没有拼团
      }).then(res => {
        // console.log(res)
        if (res.status === 200) {
          this.$message.success(res.msg)
          setTimeout(() => {
            //跳转的订单列表
            this.$router.replace('/myOrder')
          }, 3000)

        } else {

          this.$toast.fail(res.msg)
        }
      })
    }
  },
  mounted() {
    let ids = []
    let cartIds = this.$route.query.cartIds
    console.log(cartIds)
    ids = cartIds.split(',')
    postOrderConfirm({
      cartId: ids
    }).then(res => {
      // console.log(res)
      this.cartInfo = res.data.cartInfo
      this.userInfo = res.data.userInfo
      this.orderKey = res.data.orderKey
      this.priceGroup = res.data.priceGroup
      this.totalPrice = this.priceGroup.totalPrice
      //获取地址
      getAddress().then(res => {
        // console.log(res)
        this.address = res.data
      })
    })
  }
}
</script>

<style lang="less" scoped>
.poTitle {
  font-size: 16px;
  font-weight: bold;
  color: #333333;
  margin-bottom: 20px;
  text-align: left;
}

.poAddress-box {
  border: 1px solid #E5E5E5;
  padding: 20px;
  margin-bottom: 20px;
}

.poAddListTit {
  display: flex;
  justify-content: space-between;
}

.addressItem {
  display: flex;

}

.poAddList-content-box {
  margin-top: 20px;
  margin-left: 50px;
}

.openMore {
  display: flex;
}

.showMoreBox {
  //只显示一个地址，溢出隐藏其他地址
  height: 45px;
  overflow: hidden;

  .addressActive {
    .userName {
      border: 1px solid #FF7800;
    }
  }
}

.addressItem {
  display: flex;
  align-items: center;
  margin-bottom: 14px;

  span {
    color: #666666;
    font-size: 14px;
  }

  .userName {
    width: 147px;
    height: 31px;
    line-height: 31px;
    text-align: center;
    border: 1px solid #CCCCCC;
    border-radius: 2px;
    margin-right: 15px;
    cursor: pointer;
  }
}

.openMore {
  font-size: 12px;
  color: #666666;
  cursor: pointer;
}

.showMoreAdd {
  height: auto;
}

.orderInfoTit {
  background: #FCFCFC;
  border: 1px solid #E5E5E5;
  margin-bottom: 25px;
  height: 44px;
  line-height: 44px;
}

.shopOrder {
  padding: 30px 0;
  border: 1px solid #E5E5E5;
  display: flex;
  align-items: center;
}

.commodity {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 80px;

  div {
    margin-right: 20px;
  }
}

.remarksInfo {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  background: #F7F7F7;

  .el-textarea {
    padding: 25px;
  }
}

.order-information-box {
  margin-bottom: 50px;
}

.payList-box {
  text-align: left;
  margin-bottom: 50px;

  .payList {
    display: flex;
    margin: 20px 0 0 50px;

    span {
      color: #666666;
      font-size: 16px;
      font-weight: 400;
      display: flex;
      align-items: center;
      cursor: pointer;
      position: relative;
    }

    .payActive {
      padding: 10px 15px;
      margin-right: 15px;
      border: 1px solid #FF7800;
    }
  }
}

.placeOrderBtn {
  margin-bottom: 20px;
  width: 100%;
  background: #F7F7F7;
  padding: 30px;
  box-sizing: border-box;
  text-align: right;

  span {
    display: block;
    margin-bottom: 20px;
    font-size: 14px;
    color: #333333;
  }

  span:nth-child(3) {
    font-size: 18px;

    b {
      color: #FF7800;
    }
  }

  button {
    background-color: #FF7800;
    border: 0;
  }
}
</style>
