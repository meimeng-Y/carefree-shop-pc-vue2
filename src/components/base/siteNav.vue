<template>
  <!--  页面头部-->
  <div id="siteNav">
    <el-row>
      <el-col :span="12">
        <el-row>
          <!--    占位-->
          <el-col :span="2">
            <div class="grid-content "> <!--    占位--></div>
          </el-col>
          <!--    占位end-->
          <el-col :span="22">
            <div class="grid-content ">
              <div class="grid-content t_login">
                你好 请先 <span @click="loginBtn(2)">登录</span> 或 <span @click="loginBtn(1)">注册</span>
              </div>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="12">
        <el-row>
          <!--    占位-->
          <el-col :span="6">
            <div class="grid-content "><!--    占位--></div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content "><!--    占位--></div>
          </el-col>
          <!--    占位end-->
          <!--          内容区-->
          <el-col :span="4">
            <div class="grid-content ">
              <div class="item">
                <a class="hover-item" @click="">我的订单</a>
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content ">
              <div class="item">
                <a class="hover-item" @click="">购物车</a>
                <i class="ico-arrow el-icon-arrow-down"></i>
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content ">
              <div class="item item-select">
                <span class="hover-item">
                  <i class="iconfont icon-user"></i>
                  我的
                  <i class="ico-arrow el-icon-arrow-down"></i>
                </span>
                <div class="cart-box user-box">
                  <ul>
                    <li @click="goToUserInfo">个人信息</li>
                    <li @click="">我的订单</li>
                    <li @click="">收货地址</li>
                    <li @click="">钱包充值</li>
                  </ul>
                </div>
              </div>
            </div>
          </el-col>
          <!--          内容区end-->
          <!--    占位-->
          <el-col :span="2">
            <!--    占位-->
            <div class="grid-content "><!--    占位--></div>
          </el-col>
          <!--    占位end-->
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "siteNav",
  data() {
    return {}
  },
  methods: {
    //登录或注册
    loginBtn(type) {
      this.$router.push({path: '/login', query: {type: type}})
    },
    goToUserInfo() {
      this.$router.push({path: '/userInfo'})
    },
  }
}
</script>

<style lang="less" scoped>
.el-row {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  min-height: 36px;
}

#siteNav {
  line-height: 60px;

  .t_login {
    //font-size: 14px;
    text-align: left;

    & > span:hover {
      cursor: pointer;
    }

    span {
      color: #ff784f;
    }
  }

  .item {
    &:hover {
      background-color: #fff;

      & .user-box ul {
        display: block;
      }
    }

    cursor: pointer;
  }

  .user-box {
    position: relative;
    z-index: 100;
    background-color: #ffffff;

    ul {
      display: none;
      list-style: none;
      margin: 0;
      padding: 0;
      border-radius: 0px 0px 4px 4px;
      line-height: 32px;
    }

    li {
      list-style: none;
      padding-bottom: 6px;

      &:hover {
        background-color: #ffeee3;
      }
    }
  }
}
</style>
