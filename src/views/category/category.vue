<template>
  <!--商品分类-->
  <el-row id="category">
    <el-col :span="22" :offset="1">
      <div class="grid-content ">
        <!--        内容-->
        <div>
          <el-row>
            <el-col :span="24">
              <div class="grid-content ">
                <!--                导航条-->
                <el-row class="no-margin-bottom">
                  <el-col :span="24">
                    <div class="grid-content category-name">
                      <div class='all'>全部结果</div>
                      <div class='arrow'></div>
                      <div class='keyword'>{{ classifyName }}</div>
                    </div>
                  </el-col>
                </el-row>
                <!--                导航条end-->
                <!--                内容-->
                <el-row>
                  <el-col :span="24">
                    <div class="grid-content bg-purple-dark my-padding">
                      <!--                      排序规则-->
                      <el-row class="no-margin-bottom">
                        <el-col :span="24">
                          <div class="grid-content collation">
                            <div>排序：</div>
                            <div :class="{activation : activation_sort ===1}" @click="defaultSort()">默认</div>
                            <div class="price-collation" :class="{activation : activation_sort ===2}"
                                 @click="priceSort()">价格
                              <div class='arr'>
                                <div class='up' :class="priceOrder=='asc'?'low':''"></div>
                                <div class='down' :class="priceOrder=='desc'?'high':''"></div>
                                <!--                                <div class='up'></div>-->
                                <!--                                <div class='down'></div>-->
                              </div>
                            </div>
                          </div>
                          <!--                          分割线-->
                          <el-divider class="no-margin-bottom no-margin-top"></el-divider>
                          <!--                          分割线end-->
                        </el-col>
                      </el-row>
                      <!--                      排序规则end-->
                      <el-row>
                        <el-col :span="24">
                          <div class="grid-content">
                            <!--                            分类商品内容-->
                            <!--                            标题-->
                            <h3 style="margin-bottom:80px;margin-top:50px;font-size: 24px;font-weight: bold">
                              {{ classifyName }}
                            </h3>
                            <!--                            标题end-->
                            <!--                            商品分类列表-->
                            <product-list :product-list="listProds"></product-list>
                            <!--                            商品分类列表end-->
                            <!--                            分类商品内容end-->
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </el-col>
                </el-row>
                <!--                内容end-->
              </div>
            </el-col>
          </el-row>
        </div>
        <!--        内容end-->
      </div>
    </el-col>
  </el-row>

</template>

<script>
import ProductList from "../../components/base/productList";
import {IMG_URL, getGoodsList} from '../../api/api'
import {createNamespacedHelpers} from 'vuex'

const {mapMutations, mapGetters} = createNamespacedHelpers('search')
export default {
  name: "category",
  components: {ProductList},
  data() {
    return {
      activation_sort: 1,//默认激活的排序
      classifyName: '',
      priceOrder: '',//排序图标
      queryParam: {
        sid: '',//分类id
        isIntegral: 0, //是否积分兑换商品
        priceOrder: '',//价格排序
        page: 1,//分页
        limit: 12,//分页
      },
      listProds: [],//商品分类数据
    }
  },
  computed: {
    ...mapGetters({
      Keyword: 'getKeywordVal'
    })
  },
  watch: {
    //监听搜索框变化
    Keyword(newVal, oldVal) {
      console.log(newVal)
      this.classifyName = newVal
      this.queryParam['keyword'] = newVal
      this.getlist(this.queryParam) //获取数据
    }
  }
  ,
  methods: {
    /*查询商品数据*/
    getlist(queryParam) {
      getGoodsList(queryParam).then(res => {
        // console.log(res)
        this.listProds = res.data.content
      })
    },
    // 默认排序
    defaultSort() {
      if (this.activation_sort === 1) {
        return
      }
      this.activation_sort = 1
      this.priceOrder = ''
      this.getlist(this.queryParam) //获取数据
    },
    // 价格排序
    priceSort() {
      this.activation_sort = 2
      if (this.priceOrder !== 'desc') {
        this.priceOrder = 'desc'
      } else {
        this.priceOrder = 'asc'
      }
      let map = {}
      Object.assign(map, this.queryParam)
      map['priceOrder'] = this.priceOrder
      this.getlist(map) //获取数据
    }
  },
  mounted() {
    /*分类查询商品列表*/
    if (this.$route.query.sid != null) {
      // console.log(this.$route.query.sid)
      //搜索词
      this.queryParam['sid'] = this.$route.query.sid
    }
    if (this.$route.query.name != null) {
      // console.log(this.$route.query.sid)
      //搜索词
      this.classifyName = this.$route.query.name
    }
    /*分类查询商品列表end*/
    this.getlist(this.queryParam) //获取数据
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

.bg-purple-dark {
  background: white;
  margin-bottom: 75px;
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

#category {
  background: #f0f0f0;
}

.category-name {
  height: 64px;
  text-align: left;

  .all {
    width: 64px;
    height: 64px;
    display: inline-block;
    margin-right: 20px;
    line-height: 64px;
  }

  .arrow {
    display: inline-block;
    background-image: url('../../../static/image/xiangyou@2x.png');
    width: 5px;
    height: 10px;
    margin-right: 20px;
  }

  .keyword {
    width: 64px;
    height: 64px;
    display: inline-block;
    line-height: 64px;
    vertical-align: top;
    //margin: 0 15px;
    color: #ff784f;

  }
}

.no-margin-bottom {
  margin-bottom: 0;
}

.no-margin-top {
  margin-top: 0;
}

.arr {
  vertical-align: middle;
  width: 12px;
  margin-left: 3px;

  .up {
    width: 0;
    height: 0;
    border: 6px solid transparent;
    border-bottom-color: #999999;
  }

  .down {
    width: 0;
    height: 0;
    border: 6px solid transparent;
    border-top-color: #999999;
    margin-top: 3px;
  }

  .high {
    border-top-color: #FF7800;
  }

  .low {
    border-bottom-color: #FF7800;
  }
}

.collation, .price-collation {
  display: flex;
  height: 63px;
  align-items: center;
}

.collation {
  & > div:nth-child(2) {
    margin-left: 20px;
    cursor: pointer;
  }

  & > div:nth-child(3) {
    margin: 0 20px;
    cursor: pointer;
  }
}

.my-padding {
  padding: 0 45px 30px;
}

.collation {
  .activation {
    color: #FF7800;
  }
}

</style>
