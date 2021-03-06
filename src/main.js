// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import VueLazyload from 'vue-lazyload'
import * as axios from 'api/api'
require('./mock/')

Vue.prototype.axios = axios

const DefaultLogo = reqiure('common/images/icons/LOGO(1).png')
Vue.prototype.DefaultLogo = DefaultLogo
Vue.use(VueLazyload, {
  preload: 1.3,
  loading: DefaultLogo
})

Vue.config.productionTip = false

import fastClick from 'fastclick'
import 'lib-flexible'
import './common/js/reset'

import './common/css/self-icons.css'
import './common/css/reset.css'

fastClick.attach(document.body)

import { Indicator, Toast } from 'mint-ui'
window.Indicator = Indicator
window.Toast = Toast


Vue.prototype.preSrc = 'http://221.123.178.232/smallgamesdk/Public/Uploads/'
Vue.prototype.HOST = process.env.NODE_ENV === 'development' ? 'http://shop-test.73776.com' : ''
Vue.prototype.NON_ICON = require('./common/images/icons/none.jpg')
Vue.prototype.DefaultAvatar = require('./common/images/global/user.jpg')
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
// 日历 签到 mockjs <i class="icon" />  <router-link :event="['click']">
