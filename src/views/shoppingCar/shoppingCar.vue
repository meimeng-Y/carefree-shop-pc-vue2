<template>
  <!--购物车页面-->
  <div id="shoppingCar">
    <el-row>
      <el-col :span="22" :offset="1">
        <div>
          <div class='total-pro'>全部商品 {{ cartList.length > 0 ? cartList.length : '' }}</div>
          <!--          标题-->
          <div class='trolley-title'>
            <p>
              <el-checkbox v-model="selectAll" @change='getAllProduct(selectAll)' :true-label='1'
                           :false-label='0'/>
              全选
            </p>
            <p><b>商品名称</b></p>
            <p>商品属性</p>
            <p>单价</p>
            <p>数量</p>
            <p>小计</p>
            <p>操作</p>
          </div>
          <!--          标题end-->
          <!--          购物车列表-->
          <div class="carList">
            <el-row v-for="val in cartList" :key="val.id" class="carListbox">
              <el-col :span="2">
                <el-checkbox v-model="val.checked" :true-label='1' :false-label='0'/>
              </el-col>
              <el-col :span="7">
                <div class="img_pname">
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="img_url + val.productInfo.image"
                    fit="cover"></el-image>
                  {{ val.productInfo.storeName }}
                </div>
              </el-col>
              <el-col :span="4">
                <div class="suk">
                  {{ val.productInfo.attrInfo.sku }}
                </div>
              </el-col>
              <el-col :span="3">
                <div>
                  ¥ {{ val.productInfo.attrInfo.price }}
                </div>
              </el-col>
              <el-col :span="3">
                <el-input-number v-model="val.cartNum"
                                 :min="1" :max="val.productInfo.attrInfo.stock"
                                 :step=1
                                 @change="onChange(val)"
                                 size='small'></el-input-number>
              </el-col>
              <el-col :span="3">
                <div>
                  <p v-if="val.productInfo.isShow === 1" class="price">
                    ¥ {{
                      val.cartNum * val.productInfo.attrInfo.price | filterPrice
                    }}
                  </p>
                  <p v-else class="fs20">(已下架)</p>
                </div>
              </el-col>
              <el-col :span="2">
                <el-button type="text" class="delBut" @click="delCar(val.id)">删除</el-button>
              </el-col>
            </el-row>
          </div>
          <!--          购物车列表end-->
          <div class='trolley-footer'>
            <div class='item'>
              <span @click='confirDelete()' class='hover' v-throttle>删除</span>
            </div>
            <div class='item'>
            </div>
            <div class='item'>
              已选商品
              <span>{{ checkList.length }}</span>
              件
            </div>
            <div class='item'>
              <p>
                合计 (不含运费) :
                <span> ¥ {{ totalProice }}</span>
              </p>
            </div>
            <div class="item hover" @click='submitOrder' v-throttle>
              结算
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {getCartList, IMG_URL, postCartDelList, postUpCartNum} from '@/api/api'
import computeProice from '../../util/compute'

export default {
  name: "shoppingCar",
  data() {
    return {
      img_url: IMG_URL,
      selectAll: 0,//全选
      checkList: [],//被选中的
      cartList: [],//有效购物车列表
      nocartList: [],//失效购物车列表
      totalProice: 0,// 商品总价
    }
  },
  watch: {
    //监听商品列表
    cartList: {
      handler(val) {
        let check = []
        let price = 0
        // console.log('监听商品列表')
        val.forEach(
          item => {
            if (item.checked === 1) {
              //被选中
              check.push(item.id)
              //计算总价
              price += computeProice(item.cartNum, item.productInfo.attrInfo.price)
            }
          }
        )
        this.checkList = check
        this.totalProice = price
        if (check.length === (this.cartList.length + this.nocartList.length)) {
          this.selectAll = 1
        } else {
          this.selectAll = 0
        }
      },
      deep: true
    },
  },
  methods: {
    init() {
      this.getCart()
    },
    //批量删除
    confirDelete() {
      if (this.checkList <= 0) return this.$message.warning('请选中需要删除的商品')
      postCartDelList({
        ids: this.checkList
      }).then(res => {
        if (res.status === 200) {
          this.$message.success('删除成功')
          this.getCart()
        }
      })
    },
    // 删除单个商品
    delCar(id) {
      postCartDelList({
        ids: [id]
      }).then(res => {
        if (res.status === 200) {
          this.$message.success('删除成功')
          this.getCart()
        }
      })
    },
    // 结算
    submitOrder() {
      this.$router.push({
        name: 'placeOrder',
        query: {
          cartIds: this.checkList.toString()
        }
      })
    },
    //修改购物车数量
    onChange(val) {
      if (val.cartNum > 0 && val.cartNum != null) {
        postUpCartNum({
          number: val.cartNum,
          id: val.id
        }).then(res => {
          console.log(res)
        })
      }
    },
    //获取购物车列表
    getCart() {
      getCartList().then(res => {
        // console.log(res)
        this.cartList = res.data.valid //有效购物车列表
        this.nocartList = res.data.invalid //失效购物车列表

        if (this.cartList.length) {//为每个列表添加选中标识
          this.cartList = this.cartList.map(item => {
            this.$set(item, 'checked', 0) //强制vue监听 checked 这个属性
            return item
          })
        }

      })
    },
    // 全选
    getAllProduct(val) {
      // console.log(val)
      this.cartList.forEach(value => {
        value.checked = val
      })

    }
  },
  mounted() {
    this.init()
  }

}
</script>

<style lang="less" scoped>
.total-pro {
  font-size: 20px;
  font-weight: bold;
  color: #FF7800;
  margin-bottom: 20px;
  text-align: left;
}

.trolley-title {
  display: flex;
  background-color: #F1F2F7;
  height: 54px;
  line-height: 54px;
  padding: 0 0px;

  p {
    margin: 0;
    color: #333;
    font-size: 16px;
    flex: 2;
    text-align: center;

    &:nth-child(2) {
      flex: 7;
      text-align: left;

      b {
        font-weight: normal;
        padding-left: 60px;
      }
    }

    &:nth-child(3) {
      flex: 4;
    }

    &:nth-child(4), &:nth-child(5), &:nth-child(6) {
      flex: 3;
    }

  }

  /deep/ .el-checkbox {
    margin-right: 5px;
  }
}

.carListbox {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 36px 0;
  border: 1px solid #E5E5E5;
  border-top: 0;
}

.img_pname {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.suk {
  font-size: 16px;
  color: #999;
}

.price {
  color: #FF7800;
  font-weight: bold;
}

.delBut {
  font-size: 1rem;
  font-weight: 400;
  color: #000000;
}

#shoppingCar {
  margin-bottom: 100px;
  margin-top: 60px;
}

.trolley-footer {
  margin: 60px 0 100px;
  background-color: #F1F2F7;
  height: 80px;
  display: flex;
  font-size: 16px;
  align-items: center;
  color: #333;

  .hover:hover {
    cursor: pointer;
  }

  .item {
    flex: 1;

    &:nth-child(1) {
      padding-left: 40px;
    }

    &:nth-child(4) {
      span {
        color: #FF7800;
        font-size: 20px;
      }
    }

    &:nth-child(4) {
      flex: 3;
      padding-right: 15px;

      p {
        text-align: right;
        line-height: normal;

        span {
          color: #FF7800;
          font-size: 20px;
        }
      }
    }

    &:nth-child(n-2) {
      line-height: 40px;
    }

    &:last-child {
      width: 100px;
      text-align: center;
      font-size: 20px;
      color: #fff;
      background-color: #FF7800;
      line-height: 80px;
    }

    /deep/ .el-checkbox {
      margin-right: 5px;
    }
  }
}
</style>
