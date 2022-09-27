<template>
  <!--  充值方案-->
  <div id="recharge">
    <el-tabs v-model="activeName" @tab-click="handleClick" id="tab-top">
      <el-tab-pane label="充值方案" name="recharge">
        <div class="rechargeItem-box" v-if="isShow">
          <div class="rechargeItem" v-for="val in rechargePriceWays" :key="val.id">
            <div class="rechargeItemTop">
              <img src="../../../assets/images/indexLogo.png" alt="">
              <span><i>￥</i>{{ val.value.price }}</span>
              <span>使用条件：充值￥{{ val.value.price }} 赠送￥{{ val.value.give_price }}</span>
              <div class="rechargeType">充值</div> <!--   充值图标-->
            </div>
            <div class="rechargeItemBot" @click="rechargeBut(val.id)">
              立即使用
            </div>
          </div>
        </div>
        <!--    没有内容时的空状态时占位提示-->
        <el-empty description="没有充值方案" v-if="!isShow">
        </el-empty>
        <!--    没有内容时的空状态时占位提示end-->
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {getRechargeIndex, postRechargeTest} from '../../../api/api'

export default {
  name: "recharge",
  data() {
    return {
      activeName: 'recharge',
      rechargePriceWays: [], //充值方案全部
      isShow: true,//控制没有内容时的空状态时占位提示
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    //模拟充值
    rechargeBut(id) {
      postRechargeTest({
        rechar_id: id.toString()
      }).then(res => {
        if (res.status === 200) {
          this.$message.success(res.data)
        } else {
          this.$message.warning(res.data)
        }
      })
    },
  },
  mounted() {
    //获取充值方案
    getRechargeIndex().then(res => {
      if (res.status === 200) {
        if (res.data.rechargePriceWays.length > 0) {
          console.log(res)
          this.rechargePriceWays = res.data.rechargePriceWays
        } else {
          this.isShow = false
          return
        }
        this.isShow = true
      } else {
        this.$message.warning('获取数据失败')
      }
    })
  }
}
</script>

<style lang="less" scoped>
#recharge {
  /deep/ .el-tabs__nav-scroll {
    border: 1px solid #E5E5E5;
  }

  /deep/ .el-tabs__nav {
    margin-top: 6px;
    margin-left: 20px;
    height: 48px;

    .el-tabs__active-bar {
      background-color: #FF7800;
    }

    .is-active {
      color: #FF7800;
    }

    .el-tabs__item:hover {
      color: #FF7800;
    }

  }
}

.rechargeItem {
  width: 290px;
  overflow: hidden;
  border-radius: 25px;
  margin-bottom: 20px;
  margin-right: 30px;
}

.rechargeItemTop {
  background: #fd5b5b;
  color: #ffffff;
  position: relative;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;


  img {
    position: absolute;
    top: 40%;
    opacity: 0.2;
  }

  span {
    font-size: 14px;
    display: block;
    margin-bottom: 25px;
    cursor: pointer;
  }

  & > span:nth-of-type(1) {
    font-size: 28px;

    i {
      font-size: 14px;
      margin-right: 10px;
    }
  }

  .rechargeType {
    position: absolute;
    background: #FFFFFF;
    color: #fd5b5b;
    width: 100px;
    height: 40px;
    top: 1px;
    right: -30px;
    line-height: 40px;
    transform: rotate(45deg);
  }
}

.rechargeItemBot {
  background: #f3f3f3;
  color: #333333;
  height: 40px;
  line-height: 40px;
  cursor: pointer;
}

.rechargeItem-box {
  display: flex;
  flex-wrap: wrap;
  padding: 0 30px;
}

#tab-top {
  border: 1px solid #E5E5E5;
}

#recharge, #tab-top {
  height: 100%;
}
</style>
