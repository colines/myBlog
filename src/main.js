// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import qs from 'qs'
import './assets/reset.css'
import './assets/iconfont.css'

Vue.config.productionTip = false
axios.defaults.withCredentials = true //解决sessionId不一致问题：跨域共享session
Vue.prototype.$qs = qs                //qs.stringify()将对象 序列化成URL的形式，以&进行拼接
Vue.prototype.axios = axios

axios.defaults.baseURL = ' https://easy-mock.com/mock/5cd8df18cf055a12fa434f41/api';
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
