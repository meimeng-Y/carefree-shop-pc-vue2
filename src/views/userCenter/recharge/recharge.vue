<template>
  <!--  充值方案-->
  <div id="recharge">
    <el-tabs v-model="activeName" @tab-click="handleClick" id="tab-top">
      <el-tab-pane label="充值方案" name="recharge">
        <div class="rechargeItem-box">
          <div class="rechargeItem" v-for="i in 7">
            <div class="rechargeItemTop">
              <img src="../../../assets/images/indexLogo.png" alt="">
              <span><i>￥</i>{{ 1000 }}</span>
              <span>使用条件：充值￥{{ 1000 }} 赠送￥{{ 1000 }}</span>
              <div class="rechargeType">充值</div>
            </div>
            <div class="rechargeItemBot" @click="">
              立即使用
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "recharge",
  data() {
    return {
      activeName: 'recharge'
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
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
  border-radius: 20px;
  margin-bottom: 20px;
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
  justify-content: space-between;
  padding: 0 30px;
}

#tab-top {
  border: 1px solid #E5E5E5;
}
</style>
