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
import shoppingCar from "../views/shoppingCar/shoppingCar";
import orderDetail from "../views/orderDetail/orderDetail";

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
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
          meta: {}
        },
        // 商品分类
        {
          path: '/category',
          name: 'category',
          component: category,
          meta: {}
        },
        // 用户中心
        {
          path: '/userCenter',
          name: 'userCenter',
          component: userCenter,
          meta: {
            isToken: true,
          },
          children: [
            //用户信息
            {
              path: '/userInfo',
              name: 'userInfo',
              component: userInfo,
              meta: {
                isToken: true,
              }
            },
            //我的订单
            {
              path: '/myOrder',
              name: 'myOrder',
              component: myOrder,
              meta: {
                isToken: true,
              }
            },
            //地址信息
            {
              path: '/signingAddress',
              name: 'signingAddress',
              component: signingAddress,
              meta: {
                isToken: true,
              }
            },
            //钱包充值
            {
              path: '/recharge',
              name: 'recharge',
              component: recharge,
              meta: {
                isToken: true,
              }
            },
            //收藏的商品列表
            {
              path: '/favorites',
              name: 'favorites',
              component: favorites,
              meta: {
                isToken: true,
              }
            },
            //足迹列表
            {
              path: '/browseRecords',
              name: 'browseRecords',
              component: browseRecords,
              meta: {
                isToken: true,
              }
            },

          ]
        },
        // 商品详情
        {
          path: '/productDetail',
          name: 'productDetail',
          component: productDetail,
          meta: {}
        },
        // 下单页面
        {
          path: '/placeOrder',
          name: 'placeOrder',
          component: placeOrder,
          meta: {
            isToken: true,
          }
        },
        // 购物车
        {
          path: '/shoppingCar',
          name: 'shoppingCar',
          component: shoppingCar,
          meta: {
            isToken: true,
          }
        },
        //我的订单
        {
          path: '/orderDetail',
          name: 'orderDetail',
          component: orderDetail,
          meta: {
            isToken: true,
          }
        },
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
    if (to.path === '/') {
      // 重定向到首页
      return next("/index")
    } else {
      next()
    }
  }
})

export default router
