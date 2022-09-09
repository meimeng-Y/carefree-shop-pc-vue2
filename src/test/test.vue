<template>
  <div class="theSwiper">
    <swiper :options="swiperOption">
      <swiper-slide> I'm Slide 1</swiper-slide>
      <swiper-slide> I'm Slide 2</swiper-slide>
      <swiper-slide> I'm Slide 3</swiper-slide>
      <swiper-slide> I'm Slide 4</swiper-slide>
      <swiper-slide>I'm Slide 5</swiper-slide>
      <swiper-slide>I'm Slide 6</swiper-slide>
      <swiper-slide>I'm Slide 7</swiper-slide>
      <swiper-slide>I'm Slide 8</swiper-slide>

      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      swiperOption: {
        loop: false, //首尾循环
        //不想自动滚动，只需注释掉autoplay属性即可
        // autoplay: {
        //   delay: 600,
        //   stopOnLastSlide: false, //true表示滚动到最后一页后停止滚动
        //   disableOnInteraction: false, //true：交互后，不继续滚动
        // },
        // centeredSlides: true, //true:当前板块居中
        slidesPerView: 1, //页面中的板块数量

        freeMode: false, //true:拖到哪就是哪
        spaceBetween: 30, //板块间隔
        grabCursor: false, //true：鼠标为抓手
        // slidesPerGroup: 3, //多少个板块为1组。
        // 显示分页
        pagination: {
          el: ".swiper-pagination",
          clickable: true, //true：点击底部小圆点可以跳转页面
          type: "fraction", //当前页显示 1/7
        },
        // 设置点击箭头
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
    };
  },
  computed: {},
  created() {
  },
  mounted() {
  },
  filters: {},
  methods: {},
  watch: {},
}
</script>

<style lang="less" scoped>
.theSwiper {
  width: 500px;

  .swiper-container {
    position: relative;
    height: 200px;
    background: rgba(0, 0, 0, 0.137);
    border: 1px solid white;

    .swiper-slide {
      line-height: 200px;
      color: rgb(255, 255, 255);
      background-color: rgba(30, 103, 212, 0.116);
      font-size: 16px;
      text-align: center;
    }
  }
}
</style>
