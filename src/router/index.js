import Vue from 'vue';
import Router from 'vue-router';
import LoginPage from '@/pages/login';
import HomePage from '@/pages/home';
import GoodsListPage from '@/pages/good-list';
import GoodsDetailPage from '@/pages/good-detail';
import OrderCreatePage from '@/pages/order-create';
import OrderDetailPage from '@/pages/order-detail';
import OrderListPage from '@/pages/order-list';
import CartPage from '@/pages/cart';
import ProfilePage from '@/pages/profile';
import userModel from '../models/user.model';
Vue.use(Router)

const router = new Router({
  // mode: 'history',  // 去掉路由地址的#【刷新页面404，需要服务端的支持】
  routes: [
    {
      path: '/',  // 默认进入路由[写在第一个]
      redirect: '/home'   //重定向
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/home',
      name: 'home',
      component: HomePage
    },
    {
      path: '/good-list',
      name: 'good-list',
      component: GoodsListPage
    },
    {
      path: '/good-detail',
      name: 'good-detail',
      component: GoodsDetailPage
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartPage
    },
    {
      path: '/order-create',
      name: 'order-create',
      component: OrderCreatePage
    },
    {
      path: '/order-detail',
      name: 'order-detail',
      component: OrderDetailPage
    },
    {
      path: '/order-list',
      name: 'order-list',
      component: OrderListPage
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfilePage
    },
    {
      path: '*',   // 错误路由[写在最后一个]
      redirect: '/home'   //重定向
    }
  ]
});

// 全局路由守卫
router.beforeEach((to, from, next) => {
  // to: Route: 即将要进入的目标 路由对象
  // from: Route: 当前导航正要离开的路由
  // next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
  // A跳转到B，B页面停留在A页面的滚动位置；解决方法：将scrollTop设置为0
  window.scroll(0, 0);
  // nextRoute: 设置需要路由守卫的路由集合
  const nextRoute = ['home', 'good-detail', 'cart', 'profile'];
  let isLogin = userModel.isLogin;  // 是否登录
  // 未登录状态；当路由到nextRoute指定页时，跳转至login
  if (nextRoute.indexOf(to.name) >= 0) {  
    if (isLogin == 0) {
      router.push({ name: 'login' })
    }
  }
  // 已登录状态；当路由到login时，跳转至home 
  if (to.name === 'login') {
    if (isLogin == 1) {
      router.push({ name: 'home' });
    }
  }
  next();
});

export default router;