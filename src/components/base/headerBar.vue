<template>
  <!--搜索框-->
  <div id="headerBar">
    <el-row>
      <!--      logo-->
      <el-col :span="3" class="logo">
        <div class="grid-content ">
          <img src='@/assets/images/cereshop/home/eshop.png'>
        </div>
      </el-col>
      <!--      logo end-->
      <!--      搜索框-->
      <el-col :span="9" :offset="12" class="search">
        <div class="grid-content ">
          <el-input placeholder="请输入搜索商品" v-model="shopName" class="myinput" prefix-icon="el-icon-search">
            <template slot="append">搜索</template>
          </el-input>

        </div>
      </el-col>
      <!--      搜索框end-->
    </el-row>
  </div>
</template>

<script>
export default {
  name: "headerBar",
  data() {
    return {
      shopName: '',
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

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

#headerBar {
  height: 102px;
}

.search, .logo {
  height: 102px;
}

.search {
  .grid-content {
    margin: 25px 0;
  }

  /deep/ .el-input-group__append {
    background: #ff784f;
    color: white;
    border: 1px solid #FF7800;
  }
}

.logo {

  img {
    margin: 32px 15px 32px -60px;
  }
}

//搜索框
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}

.myinput {
  /deep/ .el-input__inner {
    height: 50px;
    border: 1px solid #FF7800;
  }
}
</style>
