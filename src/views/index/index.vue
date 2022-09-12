<template>
  <!--  主页-->
  <el-row>
    <el-col :span="22" :offset="1">
      <div class="grid-content ">
        <div id="index">
          <!--        商品分类名称 + 轮播图-->
          <el-row :gutter="20" class="first_line">
            <!--        商品分类名称-->
            <el-col :span="5">
              <!--        商品分类名称内容-->
              <div class="grid-content classificationName">
                <ul>
                  <li v-for="val in categorys" :key="val.id">
                    <!--              一级分类-->
                    <a>{{ val.cateName }}</a>
                    <p>
                      <template v-for="chil in val.children">
                        <!--              二级分类-->
                        <a :key="chil.id" @click="jumpCategory(chil.id,chil.cateName)">{{ chil.cateName }}</a>
                      </template>
                    </p>
                  </li>
                </ul>
              </div>
            </el-col>
            <!--        商品分类名称end-->
            <!--      轮播图-->
            <el-col :span="19">
              <div class="grid-content">
                <el-carousel height="470px">
                  <el-carousel-item v-for="(banner,index) in banners" :key="index">
                    <img style="width: 100%;height: 470px" :src="img_url+banner.pic"/>
                  </el-carousel-item>
                </el-carousel>
              </div>
            </el-col>
            <!--      轮播图end-->
          </el-row>
          <!--        商品分类名称 + 轮播图end-->
          <!--    精品推荐-->
          <el-row>
            <el-col :span="24">
              <div class="grid-content">
                <!--          标题-->
                <el-row>
                  <el-col :span="24">
                    <div class="grid-content recommended_title">
                      精品推荐
                    </div>
                  </el-col>
                </el-row>
                <!--          标题end-->
                <!--          内容-->
                <el-row>
                  <el-col :span="24">
                    <div class="grid-content ">
                      <!--                放组件-->
                      <product-list :product-list='BoutiqueLists'></product-list>
                    </div>
                  </el-col>
                </el-row>
                <!--          内容end-->
              </div>
            </el-col>
          </el-row>
          <!--    精品推荐end-->
          <!--    猜你喜欢-->
          <el-row>
            <el-col :span="24">
              <div class="grid-content">
                <!--          标题-->
                <el-row>
                  <el-col :span="24">
                    <div class="grid-content recommended_title">
                      猜你喜欢
                    </div>
                  </el-col>
                </el-row>
                <!--          标题end-->
                <!--          内容-->
                <el-row>
                  <el-col :span="24">
                    <div class="grid-content ">
                      <!--                放组件-->
                      <product-list :product-list='Likes'></product-list>
                    </div>
                  </el-col>
                </el-row>
                <!--          内容end-->
              </div>
            </el-col>
          </el-row>
          <!--    猜你喜欢end-->
        </div>
      </div>
    </el-col>
  </el-row>

</template>

<script>
import {getCategory, IMG_URL, getBoutiqueList, getLike, getBanner} from '../../api/api'
import ProductList from "../../components/base/productList";

export default {
  name: "index",
  components: {ProductList},
  data() {
    return {
      img_url: IMG_URL,//图片主机地址
      categorys: [],//分类数据
      category_children: [],//二级分类数据
      BoutiqueLists: [], //首页精品推荐
      Likes: [], //首页猜你喜欢
      banners: [],//轮播图信息
    }
  },
  methods: {
    //切换二级分类
    tab_item(id) {
      let newCategory = this.categorys.filter(item => item.id == id)
      // console.log(newCategory)
      this.category_children = newCategory[0].children
    },
    init() {
      //首页轮播图
      getBanner().then(res => {
        if (res.status == 200) {
          // console.log(res)
          this.banners = res.data
        }
      })
      //获取分类数据
      getCategory().then(res => {
        this.categorys = res.data //初始化分类数据
        this.tab_item(res.data[0].id)//初始化二级分类数据
      })
      //首页精品推荐
      getBoutiqueList().then(res => {
        if (res.status == 200) {
          // console.log(res)
          this.BoutiqueLists = res.data
        }
      })
      //首页猜你喜欢
      getLike().then(res => {
        if (res.status == 200) {
          // console.log(res)
          this.Likes = res.data
        }
      })
    },
    jumpCategory(id, name) {
      // console.log(id)
      this.$router.push({name: 'category', query: {sid: id, name: name}})
    }
  },
  mounted() {
    //获取首页数据
    this.init()
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

.classificationName {
  background: #2d2d31;
  height: 470px;
  margin-bottom: 30px;

  ul {
    list-style: none;
    margin: 0;
    padding: 16px 0;
    text-align: left;
    color: white;

    li {
      padding: 0 36px;

      & > a {
        &:hover {
          cursor: pointer;
        }
      }

      & > P {
        padding-left: 22px;
        font-size: 14px;
        color: #bbbbbb;

        a {
          margin-right: 18px;

          &:hover {
            cursor: pointer;
            color: #ff784f;
          }
        }
      }
    }
  }
}

.first_line {
  margin-bottom: 10px;
}

.recommended_title {
  font-size: 30px;
  color: #333333;
  font-weight: 600;
  text-align: left;
}
</style>
