<template>
  <!--  用户中心-->
  <el-row>
    <el-col :span="22" :offset="1">
      <div id="userCenter">
        <el-row>
          <el-col :span="3">
            <div>
              <el-menu :default-active="defaultActive" active-text-color="#FF7800" router>
                <el-menu-item index="userInfo"><span class="title">个人信息</span></el-menu-item>
                <el-menu-item index="myOrder"><span class="title">我的订单</span></el-menu-item>
                <el-menu-item index="signingAddress"><span class="title">收货地址</span></el-menu-item>
                <el-menu-item index="recharge"><span class="title">钱包充值</span></el-menu-item>
                <el-menu-item index="favorites"><span class="title">我的收藏</span></el-menu-item>
                <el-menu-item index="browseRecords"><span class="title">浏览足迹</span></el-menu-item>
              </el-menu>
            </div>
          </el-col>
          <el-col :span="21">
            <div>
              <router-view></router-view>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-col>
  </el-row>

</template>

<script>
export default {
  name: "userCenter",
  computed: {
    defaultActive() {
      return this.$route.path.replace('/', '')
    }
  }
}
</script>

<style lang="less" scoped>
.el-menu-item:focus, .el-menu-item:hover {
  outline: 0;
  background-color: white;
}

#userCenter {
  margin-top: 30px;
  margin-bottom: 140px;

  & > .el-row {
    display: flex;

    & > div:nth-child(1) {
      border: 1px solid #E5E5E5;
      margin-right: 30px;
    }

    & div:nth-child(1) {
      //border: 1px solid #E5E5E5;

      ul {
        margin-right: 30px;
        border: 0;

        li {
          margin: 0;
          padding: 0 !important;
          text-align: left;

          span {
            padding-left: 50px;
            border-left: 4px solid #ffffff;
          }
        }

        //被激活的导航条
        .is-active {
          span {
            padding-left: 50px;
            border-left: 4px solid #FF7800;
          }
        }
      }
    }
  }
}

</style>
