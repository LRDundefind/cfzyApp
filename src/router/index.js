import Vue from 'vue'
import Router from 'vue-router'
import application from '@/view/index'
import home from './home/home'
import order from './order/order'
import orders from './orders/orders'
import logistics from './logistics/logistics'
import client from './client/client'
import my from './my/my'
import goods from './goods/goods'
import damage from './damage/damage'

// 登录注册验证密码相关的组件
import login from '@/view/login/login'
import forget from '@/view/login/forget'
import zhuce from '@/view/login/zhuce'
import xieyi from '@/view/login/xieyi'
import yanzheng from '@/view/login/yanzheng'
import setNewword from '@/view/login/setNewword'


Vue.use(Router)

export const routerControl = [
    {
        path: '/login',
        name: 'login',
        component: login
    },
    {
        path: '/forget',
        name: 'forget',
        component: forget
    },
    {
        path: '/zhuce',
        name: 'zhuce',
        component: zhuce
    },
    {
        path: '/xieyi',
        name: 'xieyi',
        component: xieyi
    },
    {
        path: '/yanzheng/:phone',
        name: 'yanzheng',
        component: yanzheng
    },
    {
        path: '/setNewword',
        name: 'setNewword',
        component: setNewword
    }
]

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'application',
            component: application,
            redirect: '/home',
            children: [
              ...home,
              ...order,
              ...orders,
              ...logistics,
              ...client,
              ...my,
              ...goods,
              ...damage,
            ],
            meta:{
                requireAuth: false,  // 添加该字段，表示进入这个路由是需要登录的,暂时设置为false，否则不能进入home
            }
        },
        ...routerControl,
    ]
  
})


router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requireAuth)){  // 判断该路由是否需要登录权限
        if (token) {  // 判断当前的token是否存在
          next();
        }
        else {
          next({
            path: '/login',
            query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
          })
        }
    }
    else {
        next();
    }
});

export default router;