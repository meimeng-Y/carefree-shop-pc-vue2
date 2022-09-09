// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css';
//引入全局过滤器
import './filters'

Vue.use(ElementUI);
Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = false

// 防止连点
Vue.directive('throttle', {
  inserted(el, binding) {
    el.addEventListener('click', () => {
      el.style.pointerEvents = 'none'
      if (!el.disabled) {
        setTimeout(() => {
          el.style.pointerEvents = 'auto'
        }, binding.value || 2000)
      }
    })
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
