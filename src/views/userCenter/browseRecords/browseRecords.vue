<template>
  <!--  浏览足迹列表-->
  <div id="browseRecords">
    <!--    顶栏-->
    <div class="browseRecords-top">
      <div>
        浏览足迹
      </div>
      <el-button size="mini" v-if="!edit" @click="showEdit">批量管理</el-button>
      <div class="saveList" v-else>
        <el-checkbox v-model="selectAll" @change="changeChecked" :true-label='1' :false-label='0'>全选</el-checkbox>
        <span class="delete" @click="cancelFun">删除足迹</span>
        <span class="save" @click="saveList">保存</span>
      </div>
    </div>
    <!--    顶栏-->
    <div id="browseRecords-content">

      <el-row>
        <el-col v-for="(value,index) in collectlist"
                :key="value.pid"
                :span="4"
                :offset="index % 5===0 || index === 0?0:1" class="el-browseRecords-4">
          <div id="father-box" :class="multi_select_icon" @click="selectPro()">
            <div>
              <el-image
                style="width: 160px; height: 185px"
                :src="img_url+value.image"
                fit="cover"></el-image>
            </div>
            <div class="product-name">
              {{ value.storeName }}
            </div>
            <div class="price">
              ¥{{ value.price }}
            </div>
            <div class="btnBox">
              <span>
                删除足迹
              </span>
              <span>
                查看详情
              </span>
            </div>
          </div>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script>
import {getCollectAll, IMG_URL, postCollectDels} from '../../../api/api'

export default {
  name: "browseRecords",
  data() {
    return {
      img_url: IMG_URL,//图片地址主机
      activeName: 'first',
      selectAll: 0,//是否全选
      edit: false,//显示批量操作按钮
      multi_select_icon: 'select_icon_show',
      collectlist: [],//足迹列表
      queryType: 'foot',//查询的商品类型
    };
  },
  methods: {
    //获取初始数据
    init() {
      getCollectAll({
        type: this.queryType
      }).then(res => {
        console.log(res)
        this.collectlist = res.data
      })
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 全选
    changeChecked() {

    },
    //单个选中
    selectPro() {
      this.multi_select_icon = 'select_icon_show selected'
    },
    // 取消选中收藏
    cancelFun() {

    },
    saveList() {
      this.edit = false
    },
    // 批量管理
    showEdit() {

      // if (this.attentiondList.length === 0) {
      //   return
      // }
      this.edit = true
    },
  },
  mounted() {
    this.init()
  }
}
</script>

<style lang="less" scoped>
#browseRecords {
  .browseRecords-top {
    height: 56px;
    border: 1px solid #E5E5E5;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 25px;

    & div:nth-child(1) {
      color: #FF7800;
      font-size: 14px;
      font-weight: 500;
      height: 56px;
      line-height: 58px;
      border-bottom: 3px solid #FF7800;
    }

    button {
      color: white;
      background-color: #FF7800;
      border: 0;

      &:hover, &:focus {
        background-color: #FF7800;
      }

    }
  }
}

#browseRecords-content {
  padding: 20px;
  border: 1px solid #E5E5E5;
}

.btnBox {
  display: flex;
  //padding: 5px;
  span {
    font-size: 14px;
    width: 50%;
    height: 30px;
    line-height: 30px;
    border-top: 1px solid #E5E5E5;
    border-left: 1px solid #E5E5E5;
  }
}

.product-name {
  border-top: 1px solid #E5E5E5;
  margin: 10px 0;
  font-size: 14px;
  padding: 15px 15px 0;
  overflow: hidden;
  white-space: nowrap; //内容超出不换行
  text-overflow: ellipsis;
}

.price {
  margin-bottom: 16px;
}

.el-browseRecords-4 {
  margin-bottom: 30px;
}

#father-box {
  border: 1px solid #E5E5E5;
  position: relative;
}

.saveList {
  display: flex;
  align-items: center;

  span {
    margin-left: 36px;
    cursor: pointer;
    color: #333333;
    font-size: 14px;
  }

  span.save {
    width: 78px;
    height: 28px;
    background: #FF7800;
    color: #FFFFFF;
    text-align: center;
    line-height: 28px;
  }
}

.select_icon_show:before {
  content: "";
  background: url("./../../../assets/images/noEdit.png");
  width: 58px;
  height: 58px;
  position: absolute;
  right: 0;
  top: 0;
  display: block;
  background-size: contain;
  z-index: 999;
}

.selected:before {
  background: url("./../../../assets/images/edit.png");
  background-size: contain;
}
</style>
