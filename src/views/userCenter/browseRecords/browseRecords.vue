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
          <div id="father-box" class="select_icon_show"
               :class="{selected : value.selected === 1 , edit: !edit}"
               @click="selectPro(index,value.selected)">
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
              <span @click="unfavorite(value.pid)">
                删除足迹
              </span>
              <span @click="toProductDetail(item)">
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
import {getCollectAll, IMG_URL, postCollectDels, postCollectDel} from '../../../api/api'

export default {
  name: "browseRecords",
  data() {
    return {
      img_url: IMG_URL,//图片地址主机
      activeName: 'first',
      selectAll: 0,//是否全选
      edit: false,//显示批量操作按钮
      collectlist: [],//足迹列表
      queryType: 'foot',//查询的商品类型
    };
  },
  watch: {
    collectlist: {//监听全选
      handler: function (val) {
        this.selectAll = 1
        val.map(v => {
          if (v.selected === 0) {
            this.selectAll = 0
          }
        })
      },
      deep: true
    }
  },
  methods: {
    //获取初始数据
    init() {
      getCollectAll({
        type: this.queryType
      }).then(res => {
        console.log(res)
        // this.collectlist = res.data
        if (res.data.length > 0) {
          this.setMark(res.data)
        }
      })
    },
    //设置选中标识
    setMark(value) {
      this.collectlist = value.map(val => {
        val.selected = 0 //是否选中标识
        return val
      })
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 全选
    changeChecked() {
// console.log('全选按钮')
      this.collectlist.map(val => {
        this.$set(val, 'selected', this.selectAll)
      })
    },
    //单个选中
    selectPro(index, selected) {
      if (this.edit) {//如果没有进入批量选择，点击多选无效
        if (selected === 1) {
          this.collectlist[index].selected = 0
        } else {
          this.collectlist[index].selected = 1
        }
      }
    },
    // 批量取消选中收藏
    cancelFun() {
      let checkedCollectList = []
      this.collectlist.map(val => {
        if (val.selected === 1) {
          checkedCollectList.push(val.pid)
        }
      })
      if (checkedCollectList.length <= 0) {
        this.$message.warning('请选择删除内容')
        return
      }
      let listId = JSON.stringify(checkedCollectList).replace('[', '').replace(']', '')
      postCollectDels({
        category: this.queryType,
        ids: listId //字符串格式
      }).then(res => {
        console.log(res)
        if (res.status == 200) {
          this.$message.success('删除成功')
          //刷新数据
          this.init()
          this.saveList()
        }
      })
    },
    //批量操作后保存,重置所有选中
    saveList() {
      this.collectlist.map(val => {
        this.$set(val, 'selected', 0)
      })
      this.selectAll = 0
      this.edit = false
    },
    // 批量管理显示按钮
    showEdit() {
      if (this.collectlist.length === 0) {//收藏列表为空
        return
      }
      this.edit = true
    },
    // 取消单个收藏请求
    unfavorite(productId) {
      postCollectDel({
        id: productId,
        category: this.queryType
      }).then(res => {
        console.log(res)
        if (res.status == 200) {
          this.$message.success('取消成功')
          this.init()
        }
      })
    },
    // 跳转到商品详情
    toProductDetail(item) {
    }
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
    cursor: pointer;
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
  background-size: cover;
  z-index: 999;
}

.edit:before {
  display: none;
}

.selected:before {
  background: url("./../../../assets/images/edit.png");
  background-size: cover;
}
</style>
