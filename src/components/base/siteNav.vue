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
              <div v-show="ifLogoin" class="welcome" @mouseleave="isShowOut = false" @mouseover="isShowOut = true">
                欢迎你 {{ userinfo.nickname }}
                <span class="iconfont hoverShowOut"></span>
                <div v-show="isShowOut" class="outLogin" @click="outLoginBtn">退出登录</div>
              </div>
              <div v-show="!ifLogoin" class="grid-content t_login">
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
                <a class="hover-item" @click="$router.push('/myOrder')">我的订单</a>
              </div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content ">
              <div class="item">
                <a class="hover-item" @click="goToShopCart">购物车</a>
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
                    <li @click="$router.push('/userInfo')">个人信息</li>
                    <li @click="$router.push('/myOrder')">我的订单</li>
                    <li @click="$router.push('/signingAddress')">收货地址</li>
                    <li @click="$router.push('/recharge')">钱包充值</li>
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
import {loginOut} from '../../api/api'
import {mapGetters} from 'vuex'

export default {
  name: "siteNav",
  data() {
    return {
      isShowOut: false,//显示退出登录按钮
      ifLogoin: false,//是否登录
      nickname: '',//用户昵称
    }
  },
  computed: {
    //命名空间映射
    ...mapGetters({
      userinfo: 'getuserInfoVal'
    }),
  },
  methods: {
    //登录或注册
    loginBtn(type) {
      this.$router.push({path: '/login', query: {type: type}})
    },
    goToUserInfo() {
      this.$router.push({path: '/userInfo'})
    },
    outLoginBtn() {
      loginOut().then(res => {
        if (res.status === 200) {
          window.localStorage.removeItem('token')
          window.localStorage.removeItem('userInfo')
          this.$message.success(res.data)
          location.reload()
        }
      })
    },
    //跳转购物车
    goToShopCart() {
      this.$router.push({path: '/shoppingCar'})
    }
  },
  mounted() {
    if (window.localStorage.getItem('token') != null) {
      this.ifLogoin = true
    }
    if (window.localStorage.getItem('userInfo') != null) {
      let user = JSON.parse(window.localStorage.getItem('userInfo'))

      this.nickname = user.nickname
    }
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

      .hover-item {
        color: #FF7800;
      }

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

  .welcome {
    position: relative;
    width: 150px;

    .outLogin {
      position: absolute;
      width: 100%;
      z-index: 999;
      background: #FFFFFF;
      text-align: center;
      cursor: pointer;
      box-shadow: 0 0 20px #cccccc;
    }
  }
}

</style>
