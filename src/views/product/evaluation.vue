<template>
  <!--用户评论组件-->
  <div id="evaluation">
    <div class="evaluation-top">
      <el-button @click="checkButton(0)" :class="{activateButton:  check_Button === 0}" round>
        全部（{{ evaluateData.sumCount }}）
      </el-button>
      <el-button @click="checkButton(1)" :class="{activateButton:  check_Button === 1}" round>
        好评（{{ evaluateData.goodCount }}）
      </el-button>
      <el-button @click="checkButton(2)" :class="{activateButton:  check_Button === 2}" round>
        中评（{{ evaluateData.inCount }}）
      </el-button>
      <el-button @click="checkButton(3)" :class="{activateButton:  check_Button === 3}" round>
        差评（{{ evaluateData.poorCount }}）
      </el-button>
    </div>

    <!--    用户评论内容-->
    <div class="evaluation-box" v-for="(val,index) in evaluateList " :key="index">
      <el-row :gutter="20" class="evaluation-content">
        <!--        头像+昵称-->
        <el-col :span="5" class="img_name">
          <el-image
            style="width: 80px; height: 80px"
            :src="img_url +'/'+ val.avatar"
            fit="cover"></el-image>
          {{ val.nickname }}
        </el-col>
        <!--        头像+昵称end-->
        <!--        具体内容-->
        <el-col :span="19" class="evaluation-content-right">
          <div class="evaluation-content-text">{{ val.comment }}</div>
          <div class="evaluation-content-img">
            <el-image
              v-if="val.pictures !== '' "
              style="width: 120px; height: 120px"
              :src="img_url + val.pictures"
              fit="cover"></el-image>
          </div>
          <div class="evaluation-content-date">{{ val.createTime }}</div>
        </el-col>
        <!--        具体内容end-->
      </el-row>
    </div>
    <!--    用户评论内容end-->
  </div>
</template>

<script>
import {getGoodsComment, getGoodsCommentCount, IMG_URL} from '../../api/api'

export default {
  name: "evaluation",
  data() {
    return {
      img_url: IMG_URL,//图片地址前缀
      check_Button: 0,//选中的评论类型，默认为 0 ，代表全部
      evaluateData: {},//评论的统计数据
      evaluateList: [],//评论的具体数据
      productId: '',//商品ID
      listPage: 1,//页码
      pageTotal: 0,//TODO 总条数用于分页
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    }
  },
  methods: {
    // 获取商品评价列表
    getEvaluateList() {
      //评论的具体数据
      getGoodsComment({
        id: this.productId,//评论地址参数
        way: {
          //评论路径参数
          page: this.listPage,
          limit: 5,
          type: this.check_Button
        }
      }).then(res => {
        this.evaluateList = res.data
      })
    },
    init() {
      //评论的具体数据
      this.getEvaluateList()
      //评论的统计数据
      getGoodsCommentCount({
        id: this.productId,//评论地址参数
      }).then(res => {
        this.evaluateData = res.data
      })
    },
    checkButton(index) {
      this.check_Button = index
      this.listPage = 1
      switch (index) {
        case 0:
          this.pageTotal = this.evaluateData.sumCount
          break
        case 1:
          this.pageTotal = this.evaluateData.goodCount
          break
        case 2:
          this.pageTotal = this.evaluateData.inCount
          break
        case 3:
          this.pageTotal = this.evaluateData.poorCount
          break
      }
      this.getEvaluateList()
    }
  },
  mounted() {
    let id = this.$route.query.productId
    this.productId = id
    this.init()
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
