import Vue from 'vue'
import Router from 'vue-router'
import home from "../views/home";
import index from "../views/index/index"
import category from "../views/category/category";
import login from "../views/login/login";
import userCenter from "../views/userCenter/userCenter";
import userInfo from "../views/userCenter/userInfo/userInfo";
import myOrder from "../views/userCenter/myOrder/myOrder";
import signingAddress from '../views/userCenter/signingAddress/signingAddress'
import recharge from '../views/userCenter/recharge/recharge'
import favorites from '../views/userCenter/favorites/favorites'
import browseRecords from '../views/userCenter/browseRecords/browseRecords'
import productDetail from '../views/product/productDetail'
import placeOrder from '../views/placeOrder/placeOrder'
import test from "../test/test";
import test2 from "../test/test2";

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      children: [
        // 首页
        {
          path: '/index',
          name: 'index',
          component: index,
          meta: {
            // logoText: '',
            // searchVisible: true
          }
        },
        // 商品分类
        {
          path: '/category',
          name: 'category',
          component: category,
          meta: {
            // logoText: '',
            // searchVisible: true
          }
        },
        {
          path: '/userCenter',
          name: 'userCenter',
          component: userCenter,
          meta: {
            // logoText: '',
            // searchVisible: true
          },
          children: [
            //用户信息
            {
              path: '/userInfo',
              name: 'userInfo',
              component: userInfo,
              meta: {
                // logoText: '',
                // searchVisible: false
              }
            },
            //我的订单
            {
              path: '/myOrder',
              name: 'myOrder',
              component: myOrder,
              meta: {
                // logoText: '',
                // searchVisible: false
              }
            },
            //地址信息
            {
              path: '/signingAddress',
              name: 'signingAddress',
              component: signingAddress,
              meta: {
                // logoText: '',
                // searchVisible: false
              }
            },
            //钱包充值
            {
              path: '/recharge',
              name: 'recharge',
              component: recharge,
              meta: {
                // logoText: '',
                // searchVisible: false
              }
            },
            //收藏的商品列表
            {
              path: '/favorites',
              name: 'favorites',
              component: favorites,
              meta: {
                // logoText: '',
                // searchVisible: false
              }
            },
            //足迹列表
            {
              path: '/browseRecords',
              name: 'browseRecords',
              component: browseRecords,
              meta: {
                // logoText: '',
                // searchVisible: false
              }
            },

          ]
        },
        // 商品详情
        {
          path: '/productDetail',
          name: 'productDetail',
          component: productDetail,
          meta: {
            // logoText: '',
            // searchVisible: true
          }
        },
        // 下单页面
        {
          path: '/placeOrder',
          name: 'placeOrder',
          component: placeOrder,
          meta: {
            // logoText: '',
            // searchVisible: true
          }
        }
      ],
    },
    // 登录
    {
      path: '/login',
      name: 'login',
      component: login
    },
    // 测试
    {
      path: '/test',
      name: 'test',
      component: test
    },
    // 测试
    {
      path: '/test2',
      name: 'test2',
      component: test2
    },
  ]
})

/*进入路由之前*/
router.beforeEach((to, from, next) => {
  let loginInfo = window.localStorage.getItem('userInfo')//用户信息
  let token = window.localStorage.getItem('token')//用户token
  //console.log('islogin', islogin)
  /*判断是否需要token*/
  if (to.meta.isToken) {
    if (loginInfo == null && token == null) {
      console.log('没有token,被拦截')
      return next("/login")
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
