<template>
  <!--我的订单-->
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick" id="tab-top">
      <el-tab-pane label="待付款" name="first">
        <!--suppress HtmlUnknownAttribute -->
        <div v-loading="loading" element-loading-text="拼命加载中">
          <order-list :type="0" v-if="activeName === 'first' " @clicksetloding='setloding'></order-list>
        </div>
      </el-tab-pane>
      <el-tab-pane label="待发货" name="second">
        <!--suppress HtmlUnknownAttribute -->
        <div v-loading="loading" element-loading-text="拼命加载中">
          <order-list :type="1" v-if="activeName === 'second' " @clicksetloding='setloding'></order-list>
        </div>
      </el-tab-pane>
      <el-tab-pane label="待收货" name="third">
        <!--suppress HtmlUnknownAttribute -->
        <div v-loading="loading" element-loading-text="拼命加载中">
          <order-list :type="2" v-if="activeName === 'third' " @clicksetloding='setloding'></order-list>
        </div>
      </el-tab-pane>
      <el-tab-pane label="待评价" name="fourth">
        <!--suppress HtmlUnknownAttribute -->
        <div v-loading="loading" element-loading-text="拼命加载中">
          <order-list :type="3" v-if="activeName === 'fourth' " @clicksetloding='setloding'></order-list>
        </div>
      </el-tab-pane>
      <el-tab-pane label="已完成" name="fifth">
        <!--suppress HtmlUnknownAttribute -->
        <div v-loading="loading" element-loading-text="拼命加载中">
          <order-list :type="4" v-if="activeName === 'fifth' " @clicksetloding='setloding'></order-list>
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
      activeName: 'first',
      loading: true //遮罩层开关
    };
  },
  methods: {
    handleClick(tab, event) {
      //导航条点击事件
      // console.log(tab, event);

    },
    setloding(message) {
      this.loading = message
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
