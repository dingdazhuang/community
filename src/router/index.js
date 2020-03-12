import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

import { shopRoutes } from './shopRoutes'
import { forumRoutes } from './fornmRoutes'
import { fictionRoutes } from './fictionRoutes'
import { centerRoutes } from './centerRoutes'

import store from '../store/index'

Vue.use(Router)

const routes = [
  {path: '/', redirect: '/draw'},
  {path: '/draw', component: () => import('@/views/common/Draw')},
  {path: '/center', component: () => import('@view/common/Center')},
  {
    path: '/login',
    component: () => import('@/views/common/Login')
  },
  {
    path: '/register',
    component: () => import('@/views/common/Register')
  },
  ...shopRoutes,
  ...forumRoutes,
  ...fictionRoutes,
  ...centerRoutes
]

export default new Router({
  // routes: [
  //   {
  //     path: '/',
  //     name: 'HelloWorld',
  //     component: HelloWorld
  //   }
  // ]
  routes,
  scrollBehavior(to, from, savePosition) {
    if (savePosition) {
      return savePosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savePosition = document.body.scrollTop || window.pageYOffset || document.documentElement.scrollTop
      }
      return {
        x: 0,
        y: to.meta.savePosition || 0
      }
    }

  }

})
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.getters.token) {
      next()
    } else {
      Toast({
        message: '您还未登陆',
        position: 'middle',
        duration: 2000
      })
      setTimeout(() => {
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      }, 2000)
    }
  } else {
    next()
  }
})