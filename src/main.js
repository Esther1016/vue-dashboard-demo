// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios' //主要AJAX套件
import VueAxios from 'vue-axios' //將他轉為Vue的套件

import App from './App'
import router from './router'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)//Usage in Vue 2

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
