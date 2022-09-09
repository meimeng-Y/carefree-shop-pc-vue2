<template>
  <!--订单列表组件-->
  <div id="orderList">
    <!--    顶列-->
    <el-row>
      <el-col :span="7">
        <div class=" ">
          宝贝
        </div>
      </el-col>
      <el-col :span="3">
        <div class=" ">
          单价
        </div>
      </el-col>
      <el-col :span="3">
        <div class=" ">
          数量
        </div>
      </el-col>
      <el-col :span="3">
        <div class=" ">
          收货人
        </div>
      </el-col>
      <el-col :span="3">
        <div class=" ">
          实付款
        </div>
      </el-col>
      <el-col :span="2">
        <div class=" ">
          状态
        </div>
      </el-col>
      <el-col :span="3">
        <div class=" ">
          操作
        </div>
      </el-col>
    </el-row>
    <!--    顶列end-->

    <el-row id="commodity-lower">
      <!--      订单时间+订单号-->
      <el-col :span="24" class="order-time">
        <div class="">
          <el-row>
            <el-col :span="5">
              <div class="">
                时间:2022-09-06 17:53:28
              </div>
            </el-col>
            <el-col :span="5">
              <div class="">
                订单号:1567088582298959872
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <!--      订单时间+订单号end-->
      <!--      订单内容-->
      <el-col :span="24">
        <el-row id="commodity">
          <!--          商品名称+单价+数量布局-->
          <el-col :span="13">
            <div class="">
              <!--              商品名称+单价+数量内容-->
              <el-row id="commodity-left" v-for="i in 2" :key="i">
                <el-col :span="12" :offset="1">
                  <div class="img-title">
                    <el-image
                      style="width: 100px; height: 100px"
                      src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                      fit="cover"></el-image>
                    <div class="img-title-p">
                      <p>浪漫姐妹 秋冬毛呢西装外套</p>
                      <p>xxl</p>
                    </div>
                  </div>
                </el-col>
                <el-col :span="5">
                  <div class=" bg-purple-dark">
                    ￥1280.00
                  </div>
                </el-col>
                <el-col :span="5" :offset="1">
                  <div class="">
                    1
                  </div>
                </el-col>
              </el-row>
              <!--              商品名称+单价+数量内容end-->
            </div>
          </el-col>
          <!--          商品名称+单价+数量布局end-->
          <!--          收货人+实付款+状态+操作-->
          <el-col :span="11">
            <div id="commodity-right">
              <el-row>
                <el-col :span="6">
                  <div class="">收货人</div>
                </el-col>
                <el-col :span="6">
                  <div class="">实付款</div>
                </el-col>
                <el-col :span="6">
                  <div class="">待付款</div>
                </el-col>
                <el-col :span="6">
                  <div class="commodity-button">
                    <el-button type="primary" size="small">立即支付</el-button>
                    <el-button type="text" size="small">删除订单</el-button>
                  </div>

                </el-col>
              </el-row>
            </div>
          </el-col>
          <!--          收货人+实付款+状态+操作end-->
        </el-row>
      </el-col>
      <!--      订单内容end-->
    </el-row>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="1000">
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "orderList"
}
</script>

<style lang="less" scoped>
#orderList {
  //background: #99a9bf;
  min-height: 60px;

  & > .el-row:nth-child(1) > .el-col:nth-child(1) > div {
    background: #99a9bf;
  }

  & > .el-row:nth-child(1) > .el-col:nth-child(3) > div {
    background: #99a9bf;
  }

  & > .el-row:nth-child(1) > .el-col:nth-child(5) > div {
    background: #99a9bf;
  }

  & > .el-row:nth-child(1) > .el-col:nth-child(7) > div {
    background: #99a9bf;
  }

  & > .el-row:nth-child(1) {
    height: 50px;
    background-color: #f1f2f7;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }

  .order-time {
    background-color: #f3f3f3;

    & > div > .el-row {
      height: 40px;
      display: flex;
      align-items: center;

      & div {
        font-size: 13px;
      }
    }
  }
}


.bg-purple-dark {
  background: #999999;
}

#commodity-left {
  //background: cornflowerblue;
  display: flex;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid #E5E5E5;

  &:last-child {
    border-bottom: 0
  }
}

.img-title {
  display: flex;
  flex-direction: row;

  .img-title-p {
    font-size: 14px;
    font-weight: 400;
    margin-left: 12px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;

    & > p {
      display: inline;
      margin: 0;
    }

    & p:nth-child(2) {
      font-size: 13px;
      color: #999999;
    }
  }
}


#commodity {
  display: flex;
  align-items: center;
  //border: 1px solid #E5E5E5;
}

#commodity-right {
  height: 100%;

  & > .el-row {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

}

#commodity-lower {
  border: 1px solid #E5E5E5;
}

.commodity-button {
  display: flex;
  flex-direction: column;
  align-items: center;

  button {
    margin: 5px;
  }
}

.el-pagination {
  margin-top: 40px;
}
</style>
