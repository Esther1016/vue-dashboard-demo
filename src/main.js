// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import axios from 'axios'; //主要AJAX套件
import VueAxios from 'vue-axios'; //將他轉為Vue的套件
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap';
import VeeValidate from 'vee-validate';
import zhTW from 'vee-validate/dist/locale/zh_TW';
import VueI18n from 'vue-i18n';


import App from './App';
import router from './router';
import './bus';
import currencyFilter from './filters/currency';

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);//Usage in Vue 2

Vue.component('Loading',Loading);
Vue.filter('currency', currencyFilter);
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'zhTW'
})
Vue.use(VeeValidate, {
  events: 'input|blur', //這是為了讓使用者離開該欄位時觸發驗證
  i18n,
  dictionary: {
    zhTW
  }
})

axios.defaults.withCredentials = true;//將cookie存到前端

/* eslint-disable no-new */
new Vue({
  i18n,
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

//由於目前的執行環境非為vue的元件內,而是在router下.因此無法直接使用this.$http,需替換成axios

router.beforeEach((to, from, next) => {
  if(to.meta.requiresAuth){  //當要到達的頁面需要驗證時,檢查是否持續登入
    const api = `${process.env.APIPATH}/api/user/check`;
      const vm = this;
      axios.post(api).then((response) => {
        console.log(response.data);
        if (response.data.success) { //若在登入狀態直接放行,無則進入登入頁
          next();
        }else{
          next({
            path:'/login'
          })
        }
      });
  }else{
    next();
  }
})
