<template>
  <!--商品详情页-->
  <div id="productDetail">
    <el-row>
      <el-col :span="22" :offset="1">
        <div class="top-box">
          <!--        轮播图-->
          <div class="swiper-box" style="height: 560px">
            <!-- swiper1 -->
            <swiper :options="swiperOptionTop" class="gallery-top" ref="swiperTop">
              <swiper-slide v-for="(item, index) in storeInfoVal.sliderImageArr" :key="index"
                            :style="{backgroundImage: 'url('+img_url + item +')'}" class="box-right">
                <!--                {{ index + "right" }} 用来调试查看第几张图片-->
              </swiper-slide>

            </swiper>
            <!-- swiper2 Thumbs -->
            <div class="swiperThumbsLeft">
              <div class="thumbsBox">
                <swiper :options="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs">
                  <swiper-slide v-for="(item, index) in storeInfoVal.sliderImageArr" :key="index"
                                :style="{backgroundImage: 'url(' +img_url + item +')'}">
                    <div style="width: 100%; height: 100%;" @click="thumbsClick(index)" class="box-left">
                      <!--                      {{ index }} 用来调试查看第几张图片-->
                    </div>
                  </swiper-slide>
                </swiper>
                <div class="swiper-button-prev swiper-button-white iconfont" slot="button-prev"></div>
                <div class="swiper-button-next swiper-button-white iconfont" slot="button-next"></div>
              </div>
            </div>
          </div>
          <!--        轮播图end-->
          <!--        商品信息-->
          <div class="proDuctInfo">
            <h3 class="productTit">{{ storeInfoVal.storeName }}</h3>
            <p class="introduction">{{ storeInfoVal.storeInfo }}</p>
            <!--          价格-->
            <div class="priceDataInfo">
              <div class="promotionInfo">
                <span>价格:</span>
                <!--                默认显示第一个规格-->
                <span>￥{{ skuInfo.price }}</span>
                <span>￥{{ skuInfo.otPrice }}</span>
              </div>
            </div>
            <!--          价格end-->
            <!--          商品规格-->
            <div class='sku-box'>
              <ul v-for="(product,pIndex) in productAttr" :key="pIndex">
                <li>
                  <!--                  规格的名称-->
                  <p class="proDescribeTit">{{ product.attrName }}</p>
                  <p>
                  <span v-for="(val,aIndex) in product.attrValue" :key="aIndex"
                        :class="{'selected-item': val.check}"
                        @click='selectSku(pIndex, aIndex)'
                  >
                    <!--                    规格名称-->
                   {{ val.attr }}
                  </span>
                  </p>
                </li>
              </ul>
            </div>
            <!--          商品规格end-->
            <!--          商品数量-->
            <div class="productNumber">
              <div class="proDescribeTit">数量</div>
              <el-input-number v-model="num" @change="handleChange" :min="1" :max="skuInfo.stock"></el-input-number>
              <span>库存{{ skuInfo.stock }}件</span>
            </div>
            <!--          商品数量end-->
            <!--          底部按钮-->
            <div class="btnBox">
              <div class="buyBox" v-if="">
                <span @click="clickAddCart">加入购物车</span>
                <span @click='buyGood'>购买</span>
              </div>
              <div class="noStock" v-if="false">
                <span>已售空</span>
              </div>
              <div class="favoritesBtn" @click="collect">
                <!--              未收藏图标-->
                <img class="favoritesBtn-icon"
                     src="../../../static/image/sc0.png" alt="" v-show="!userCollect">
                <!--              收藏图标-->
                <img class="favoritesBtn-icon"
                     src="../../../static/image/sc1.png" alt="" v-show="userCollect">
                <span>收藏</span>
              </div>
            </div>
            <!--          底部按钮end-->
          </div>
          <!--        商品信息end-->
        </div>
        <!--        页面下部-->
        <div class="productDetail">
          <!--        页面下部 宝贝详情+商品评论-->
          <div class="detailTabs">
            <span :class="{compActive: currentComp === 'detailData'}"
                  @click="clickSwitchTab(type = 'detailData')">宝贝详情</span>
            <span :class="{compActive: currentComp === 'evaluation'}"
                  @click="clickSwitchTab(type = 'evaluation')">商品评论</span>
          </div>
          <div class="detailBox clearfix">
            <div class="detailInfoBox">
              <div v-show="currentComp==='detailData'">
                <div class="detailBox">
                  <!--                  解析数据库中的html标签数据-->
                  <div class="detailCont" v-html="replaceImgSrc(img_url,storeInfoVal.description)">
                    <!--                    显示的图片详情 通过v-html进行插入-->
                  </div>
                </div>
              </div>
              <div v-show="currentComp==='evaluation'">
                <!--用户评论组件-->
                <evaluation></evaluation>
              </div>
            </div>
            <div class="likeProductBox">
              <!--猜你喜欢组件-->
              <like-list :product-list="Likes"></like-list>
            </div>
          </div>
          <!--        页面下部 宝贝详情+商品评论end-->
        </div>
        <!--        页面下部end-->

      </el-col>
    </el-row>
  </div>
</template>

<script>

import LikeList from "./likeList";
import Evaluation from "./evaluation";
import {getGoodsDetail, IMG_URL, postCollectAdd, postCollectDel, postCartAdd, getLike} from '../../api/api'

export default {

  name: "productDetail",
  components: {Evaluation, LikeList},
  data() {
    return {
      currentComp: 'detailData',//显示的内容，默认显示详情
      //右边的轮播图设置
      swiperOptionTop: {
        spaceBetween: 10,//轮播图的距离之间设置距离
        loop: false,//首尾循环
        loopedSlides: 20//在启用loop（首尾循环）后，可以看到的轮播图的个数
      },
      //左边的轮播图设置
      swiperOptionThumbs: {
        // 设置点击箭头
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        direction: 'vertical',
        spaceBetween: 10,
        slidesPerView: 3,//设置slider容器能够同时显示的slides数量
        loop: false,//首尾循环
        freeMode: false, //true:拖到哪就是哪
        loopedSlides: 20,
        centeredSlides: true,//居中幻灯片。设定为true时，当前的active slide 会居中，而不是默认状态下的居左。
        watchSlidesVisibility: true,
        slideToClickedSlide: true,
      },
      Likes: [], //猜你喜欢
      num: 1,//步进器
      img_url: IMG_URL,//图片地址前缀
      productId: '',//商品ID
      storeInfoVal: {}, //商品信息
      productAttr: [],//商品规格
      productValue: {},//商品规格组合
      specSelected: [], // 选中的规格
      skuInfo: {}, // 选中的规格信息
      userCollect: false, //收藏状态

    }
  },
  watch: {
    // 监听规格参数变化
    specSelected(val) {
      let sku = ''
      val.forEach(
        item => {
          sku += item.attr + ','
        })
      sku = sku.substring(0, sku.length - 1) //将最后一个的 , 去掉
      let specification = this.productValue
      this.skuInfo = specification[sku]
    }
  },
  methods: {
    init() {
      //猜你喜欢
      getLike().then(res => {
        if (res.status == 200) {
          // console.log(res)
          this.Likes = res.data
        }
      })

      let id = this.$route.query.productId
      this.productId = id
      getGoodsDetail({
        id
      }).then(res => {
        // console.log(res)
        //商品的基本信息
        this.storeInfoVal = res.data.storeInfo
        //商品规格详情
        this.productValue = res.data.productValue
        //商品规格
        this.productAttr = res.data.productAttr
        // 规格 默认选中第一条
        this.productAttr.forEach(item => {
          item.attrValue[0].check = true
          this.specSelected.push(item.attrValue[0])
        })
        //判断是否收藏
        if (this.storeInfoVal.userCollect) {
          //收藏
          this.userCollect = true
        } else {
          //未收藏
          this.userCollect = false
        }
      })
    },
    //解析html标签
    replaceImgSrc(basePrefix, questionContent) {
      if (questionContent) {
        questionContent = questionContent.replace(new RegExp(/<img [^>]*src=['"]([^'"]+)[^>]*>/gi), function (match, capture) {
          match = match.replace(new RegExp(capture, 'g'), basePrefix + capture)
          return match
        })
        return questionContent
      }
    },
    handleChange(value) {
      console.log(value);
    },
    // 轮播图
    thumbsClick(index) {
      console.log(index)
    },
    // 加入购物车
    clickAddCart() {
    },
    // 购买
    buyGood() {
      this.$router.push({
        path: '/placeOrder',
        query: {
          cartId: 6666
        }
      })
    },
    // 收藏
    collect() {
      if (!this.userCollect) {
        postCollectAdd({
          id: this.productId,
          category: 'collect'
        }).then(res => {
          console.log(res)
          if (res.status == 200) {
            this.$message.success('收藏成功')
            this.userCollect = !this.userCollect
          }
        })
      } else {
        postCollectDel({
          id: this.productId,
          category: 'collect'
        }).then(res => {
          console.log(res)
          if (res.status == 200) {
            this.$message.success('取消成功')
            this.userCollect = !this.userCollect
          }
        })
      }
    },
    //更改显示的内容
    clickSwitchTab(type) {
      this.currentComp = type
    },
    // 选择规格sku
    selectSku(pIndex, aIndex) {
      this.specSelected = [] //清空选中的规格
      this.productAttr.forEach((item, index) => {
        if (pIndex === index) {
          //判断要修改的列与被点击的列相同
          for (let i = 0; i < item.attrValue.length; i++) {
            if (i === aIndex) {
              item.attrValue[i].check = true
            } else {
              item.attrValue[i].check = false
            }
          }
        }
      })
      //添加新选中的规格
      this.productAttr.forEach(item => {
        for (let i = 0; i < item.attrValue.length; i++) { //遍历规格的种类
          if (item.attrValue[i].check) {//将选中的添加到选中的规格集合中
            this.specSelected.push(item.attrValue[i])
          }
        }
      })
    }
  },
  mounted() {
    this.init()
    this.$nextTick(() => {
      //左右轮播图互相控制
      this.swiperTop = this.$refs.swiperTop.swiper
      this.swiperThumbs = this.$refs.swiperThumbs.swiper
      this.swiperTop.controller.control = this.swiperThumbs
      this.swiperThumbs.controller.control = this.swiperTop
    })
  },
}
</script>

<style lang="less" scoped>
.swiper-box {
  width: 580px;
  position: relative;
  margin-right: 50px;
  float: left;

  .swiper-slide {
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;

  }

  .gallery-top {
    height: 100% !important;
    width: 440px;
    position: absolute;
    right: 0;
  }

  .swiperThumbsLeft {
    width: 120px;
    position: absolute;
    left: 0;
    top: 10%;
    box-sizing: border-box;
    padding: 10px 0;
    height: 80%;

    .thumbsBox {
      width: 100%;
      height: 100%;
      position: relative;

      .swiper-button-prev,
      .swiper-button-next {
        position: absolute;
        left: 45px;
        background: none;
        width: 32px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        background: #999999;
        color: #FFFFFF;
      }

      .swiper-button-prev {
        position: absolute;
        top: -30px;
      }

      .swiper-button-next {
        position: absolute;
        top: initial;
        bottom: -50px;
      }
    }
  }

  .gallery-thumbs {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .gallery-thumbs .swiper-slide {
    width: 100%;
    opacity: 0.7;
  }

  .gallery-thumbs .swiper-slide-active {
    opacity: 1;

    box-sizing: border-box;
  }
}

.proDuctInfo {
  width: 640px;
  float: right;
  text-align: left;

  .productTit {
    font-size: 22px;
    color: #333333;
  }

  .introduction {
    color: #999999;
    font-size: 14px;
    line-height: 30px;
    margin: 10px 0;
  }

  .priceDataInfo {
    background: #FFF8F2;
    height: auto;

    .promotionInfo {
      padding: 16px 16px 20px 16px;

      span:nth-child(1) {
        font-size: 16px;
        color: #999999;
      }

      span:nth-child(2) {
        font-size: 22px;
        color: #FF7800;
      }

      span:nth-child(3) {
        font-size: 16px;
        color: #666666;
        text-decoration: line-through;
      }
    }
  }

  .proDescribeTit {
    color: #000000;
    font-size: 16px;
    margin: 18px 0;
  }

  .sku-box {
    ul {
      list-style: none;
      padding: 0;

      li {
        p {
          &:nth-child(2) {
            span {
              display: inline-block;
              padding: 0 10px;
              height: 32px;
              line-height: 32px;
              text-align: center;
              color: #666666;
              font-size: 18px;
              background: #EFEFEF;
              margin-right: 20px;
              margin-bottom: 15px;
              cursor: pointer;
            }
          }
        }
      }
    }
  }

  .btnBox {
    display: flex;
    align-items: center;
    margin-top: 30px;

    .buyBox {
      display: flex;

      span {
        width: 135px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 16px;
        color: #FF7800;
        border: 1px solid #FF7800;
        margin-right: 10px;

        &:hover {
          cursor: pointer;
        }
      }

      span:nth-child(2) {
        background: #FF7800;
        color: #FFFFFF;
      }
    }

    .favorites {
      display: flex;

      .StartGroup {
        width: 135px;
        height: 40px;
        background: #FF7800;
        display: block;
        color: #FFFFFF;
        text-align: center;
        line-height: 40px;
        cursor: pointer;
      }

      .oddBuy {
        width: 135px;
        height: 40px;
        display: block;
        box-sizing: border-box;
        color: #FF7800;
        border: 1px solid #FF7800;
        margin-right: 10px;
        text-align: center;
        line-height: 40px;
        cursor: pointer;
      }
    }

    .noStock {
      display: flex;

      span {
        width: 135px;
        height: 40px;
        background: #999999;
        display: block;
        color: #FFFFFF;
        text-align: center;
        line-height: 40px;
      }
    }

    .favoritesBtn {
      width: 40px;
      height: 38px;
      background: #FFFFFF;
      border: 1px solid #CCCCCC;
      text-align: center;
      margin-left: 10px;
      cursor: pointer;

      i {
        color: #666666;
        display: block;
        margin-top: 2px;
      }

      span {
        display: block;
        font-size: 12px;
        color: #999999;
      }
    }
  }
}

.favoritesBtn-icon {
  width: 18px;
  height: 18px;
  margin-top: 1px;
}

.top-box {
  height: 560px;
  margin-bottom: 60px;
}

.productDetail {
  .detailTabs {
    margin-bottom: 30px;
    height: 46px;
    line-height: 46px;
    border: 1px solid #E5E5E5;
    background: #F6F6F6;
    display: flex;

    span {
      padding: 0 30px;
      border-right: 1px solid #E5E5E5;
      cursor: pointer;
      color: #333333;
      font-size: 16px;
    }

    .compActive {
      background: #FFFFFF;
    }
  }
}

.detailBox {
  margin-bottom: 100px;

  .detailInfoBox {
    width: 890px;
    float: left;
    min-height: 1200px;
    border-right: 1px solid #CACACA;
  }

  /deep/ .detailCont img { // 修改v-html渲染的样式
    max-width: 100%;
    height: auto;
  }

  /deep/ .detailCont ul { // 修改v-html渲染的样式
    list-style-type: none;
  }

  .likeProductBox {
    width: 280px;
    float: left;
    padding-left: 44px;
  }
}

.selected-item {
  background: #FF7800 !important;
  color: #FFFFFF !important;
}
</style>
