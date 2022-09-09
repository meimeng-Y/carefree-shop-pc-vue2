<template>
  <!--  布局页面-->
  <el-container>
    <!--    头部-->
    <el-header>
      <site-nav></site-nav>
    </el-header>
    <!--    头部end-->
    <!--    中部-->
    <el-main>
      <el-row>
        <el-col :span="22" :offset="1">
          <div>
            <!--            搜索框-->
            <header-bar></header-bar>
          </div>
        </el-col>
      </el-row>
      <router-view></router-view>
      <!--
      统一路由宽度
        <el-row>
          <el-col :span="22" :offset="1">
            <div>

            </div>
          </el-col>
        </el-row>
       -->
    </el-main>
    <!--    中部end-->
    <!--    页脚-->
    <el-footer>
      <footer-bar></footer-bar>
    </el-footer>
    <!--    页脚end-->
  </el-container>
</template>

<script>
import SiteNav from "../components/base/siteNav";
import FooterBar from "../components/base/footerBar";
import HeaderBar from "../components/base/headerBar";

export default {
  name: "home",
  components: {FooterBar, SiteNav, HeaderBar}
}
</script>

<style lang="less" scoped>
.el-header, .el-footer {
  background-color: #f4f4f8;
  color: #333;
  padding: 0;
}

.el-footer {
  height: 100% !important;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
}

.el-main {
  color: #333;
  padding: 0;

}

body > .el-container {
  margin-bottom: 40px;
}
</style>
