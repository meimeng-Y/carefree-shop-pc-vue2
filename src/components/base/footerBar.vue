<template>
  <!--  页脚-->
  <div id="footerBar">
    <el-row>
      <!--    占位-->
      <el-col :span="1">
        <!--    占位-->
        <div class="grid-content "> <!--    占位--></div>
      </el-col>
      <!--    占位end-->
      <!--      内容区-->
      <el-col :span="22">
        <div class="grid-content ">
          <el-row>
            <el-col :span="8">
              <div class="grid-content ">
                <p class="title">客服电话</p>
                <p class="number">400 111 2222</p>
                <p class="time">08:00-22:00</p>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content ">
                <p class="title">服务支持</p>
                <p>7天无理由退货</p>
                <p>15免费换货</p>
                <p>预约维修服务</p>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content ">
                <p class="title">关于我们</p>
                <p class="cur-poi">了解我们</p>
                <p class="cur-poi">合作咨询</p>
                <p class="cur-poi">加入我们</p>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <!--      内容区end-->
      <!--    占位-->
      <el-col :span="1">
        <!--    占位-->
        <div class="grid-content "> <!--    占位--></div>
      </el-col>
      <!--    占位end-->
    </el-row>
  </div>
</template>

<script>
export default {
  name: "footerBar"
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

.bg-purple-dark {
  background: #99a9bf;
}


.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.title {
  height: 50px;
}

.number {
  font-size: 40px;
  margin: 0 0 12px;
}
</style>
