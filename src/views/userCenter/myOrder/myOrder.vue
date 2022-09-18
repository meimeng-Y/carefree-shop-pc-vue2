<template>
  <!--我的订单-->
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick" id="tab-top">
      <el-tab-pane label="待付款" name="first" v-loading="">
        <order-list :type="0" v-if="activeName === 'first' "></order-list>
      </el-tab-pane>
      <el-tab-pane label="待发货" name="second">
        <order-list :type="1" v-if="activeName === 'second' "></order-list>
      </el-tab-pane>
      <el-tab-pane label="待收货" name="third">
        <order-list :type="2" v-if="activeName === 'third' "></order-list>
      </el-tab-pane>
      <el-tab-pane label="待评价" name="fourth">
        <order-list :type="3" v-if="activeName === 'fourth' "></order-list>
      </el-tab-pane>
      <el-tab-pane label="已完成" name="fifth">
        <div v-loading="true" style="height: 60px">
          <order-list :type="4" v-if="activeName === 'fifth' "></order-list>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import OrderList from "../../../components/base/orderList";

export default {
  name: "myOrder",
  components: {OrderList},
  data() {
    return {
      activeName: 'first'
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
#tab-top {
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
</style>
