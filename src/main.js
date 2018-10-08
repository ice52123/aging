// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import 'es6-promise/auto'
import router from './router'
import 'babel-polyfill' 
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import http from './assets/js/http'


Vue.config.productionTip = false
Vue.config.debug = true
Vue.use(ElementUI)
Vue.prototype.axios = http


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
