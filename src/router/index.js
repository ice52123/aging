import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: '登录',
      component: resolve => require(['../views/login.vue'], resolve),
    },
    {
      path: '/nowaging',
      name: 'nowaging',
      component: resolve => require(['../components/home.vue'], resolve),
      children: [
        {
          path: '/nowaging',
          component: resolve => require(['../views/nowaging.vue'], resolve)
        }
      ],
      meta:{
        keepAlive:false
      }
    },
    {
      path: '/data',
      name: 'data',
      component: resolve => require(['../components/home.vue'], resolve),
      children: [
        {
          path: '/data',
          component: resolve => require(['../views/data.vue'], resolve)
        }
      ],
      meta:{
        keepAlive:false
      }
    },
    {
      path: '/list',
      name: 'list',
      component: resolve => require(['../components/home.vue'], resolve),
      children: [
        {
          path: '/list',
          component: resolve => require(['../views/list.vue'], resolve)
        }
      ],
      meta:{
        keepAlive:false
      }
    },
  ],
  // mode: 'history',
})
