<template>
  <!--用户评论组件-->
  <div id="evaluation">
    <div class="evaluation-top">
      <el-button @click="checkButton(0)" :class="{activateButton:  check_Button === 0}" round>全部（1）</el-button>
      <el-button @click="checkButton(1)" :class="{activateButton:  check_Button === 1}" round>好评（1）</el-button>
      <el-button @click="checkButton(2)" :class="{activateButton:  check_Button === 2}" round>中评（0）</el-button>
      <el-button @click="checkButton(3)" :class="{activateButton:  check_Button === 3}" round>差评（0）</el-button>
    </div>

    <!--    用户评论内容-->
    <div class="evaluation-box" v-for="i in 2 " :key="i">
      <el-row :gutter="20" class="evaluation-content">
        <!--        头像+昵称-->
        <el-col :span="5" class="img_name">
          <el-image
            style="width: 80px; height: 80px"
            :src="url"
            fit="cover"></el-image>
          姓名
        </el-col>
        <!--        头像+昵称end-->
        <!--        具体内容-->
        <el-col :span="19" class="evaluation-content-right">
          <div class="evaluation-content-text">具体内容</div>
          <div class="evaluation-content-img">
            <el-image
              style="width: 120px; height: 120px"
              :src="url"
              fit="cover" v-for="i in 10" :key="i"></el-image>
          </div>
          <div class="evaluation-content-date">日期</div>
        </el-col>
        <!--        具体内容end-->
      </el-row>
    </div>
    <!--    用户评论内容end-->
  </div>
</template>

<script>
export default {
  name: "evaluation",
  data() {
    return {
      check_Button: 0,
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    }
  },
  methods: {
    checkButton(item) {
      this.check_Button = item
    }
  }
}
</script>

<style lang="less" scoped>

.evaluation-top {
  padding: 20px 0;
  display: flex;
  border-bottom: 1px solid #E5E5E5;
  margin-right: 12px;

  .el-button:focus, .el-button:hover {
    color: #606266;
    border-color: #DCDFE6;
    background-color: white;
  }

}

.activateButton {
  border: 1px solid #FF7800;
  color: #FF7800;

  &:focus {
    border: 1px solid #FF7800 !important;
    color: #FF7800 !important;
  }
}

.evaluation-box {
  margin-right: 20px;

  /deep/ .img_name {
    display: flex;
    flex-direction: column;
    align-items: center;

    div {
      margin-bottom: 15px;
    }
  }

  .evaluation-content {
    margin-top: 25px;
    border-bottom: 1px solid #E5E5E5;
  }
}

.evaluation-content-text {
  margin-bottom: 15px;
  max-width: 440px;
}

.evaluation-content-img {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;

  div {
    margin-right: 20px;
    margin-bottom: 10px;
  }
}

.evaluation-content-right {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.evaluation-content-date {
  margin-bottom: 20px;
}
</style>
