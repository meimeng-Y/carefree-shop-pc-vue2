import Vue from 'vue'

import filterPrice from './filterPrice'  //自定义的价格过滤器

let obj = {
    filterPrice,
}

for (let key in obj) {
    Vue.filter(key, obj[key])  //循环全局注册过滤器
}
