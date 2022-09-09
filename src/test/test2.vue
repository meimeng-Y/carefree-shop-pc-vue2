<template>
  <div>
    <!-- swiper1 -->
    <swiper class="swiper gallery-top" :key='swiperOptionTopKey' :options="swiperOptionTop" ref="swiperTop">
      <swiper-slide v-for='(item,i) in imgList' :key="i">
        <img :src='item'/>
      </swiper-slide>
      <div class="swiper-button-next swiper-button-white" slot="button-next"></div>
      <div class="swiper-button-prev swiper-button-white" slot="button-prev"></div>
    </swiper>
    <!-- swiper2 Thumbs -->
    <swiper class="swiper gallery-thumbs" :key='swiperOptionThumbsKey' :options='swiperOptionThumbs' ref="swiperThumbs">
      <swiper-slide v-for='(item,i) in imgList' :key="i">
        <img :src='item'/>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script>

export default {
  name: 'test2',
  title: 'Thumbs gallery with Two-way control',

  data() {
    return {
      imgList: ['https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg', 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c2594117jpeg.jpeg', 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg', 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg', 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'], //图片列表
      swiperOptionTop: {
        centeredSlides: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
      },
      swiperOptionTopKey: Math.random().toString(36).substr(2),
      swiperOptionThumbs: {
        spaceBetween: 10,
        slidesPerView: 3,
        slideToClickedSlide: true,

      },
      swiperOptionThumbsKey: Math.random().toString(36).substr(2),
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.swiperOptionTop.thumbs = {
        swiper: this.$refs.swiperThumbs.$swiper,
        slideThumbActiveClass: 'slide-thumb-active',
      }
      this.swiperOptionTopKey = Math.random().toString(36).substr(2);//重新初始化top-swiper
    })
  }
}
</script>

<style lang="less" scoped>

</style>
