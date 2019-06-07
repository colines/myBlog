// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store'
import axios from 'axios'
import moment from 'moment'
import Utils from './assets/js/utils'
// import qs from 'qs'
import ClipboardJS from 'clipboard'
import {Icon,Badge,message,Button,Radio,Modal,Card,List,Avatar,Spin,Collapse,Comment,Carousel,Tooltip,Tag, Input} from 'ant-design-vue'
import './assets/css/reset.css'
import './assets/css/iconfont.css'
import './assets/css/github-markdown.min.css'
import './assets/css/highlight.min.css'
import './assets/css/catalog.css'

Vue.config.productionTip = false
// axios.defaults.withCredentials = true //解决sessionId不一致问题：跨域共享session
// Vue.prototype.qs = qs                //qs.stringify()将对象 序列化成URL的形式，以&进行拼接
Vue.prototype.axios = axios
Vue.prototype.moment = moment
Vue.prototype.ClipboardJS = ClipboardJS
Vue.prototype.Utils = Utils
Vue.prototype.$ip = Utils.productIp()
moment.locale('zh-cn');
Vue.use(Comment);
Vue.use(Avatar);
Vue.use(Modal);
Vue.use(Input);
Vue.use(message);
Vue.use(Spin);
Vue.use(Button);
Vue.use(Icon);
Vue.use(List);
Vue.use(Tooltip);

// Vue.prototype.$qs = qs
Vue.prototype.$message = message
Vue.prototype.$EventBus = new Vue()
axios.defaults.baseURL = 'http://10.79.3.57:8080/myblog'
Vue.prototype.home = 'http://localhost:8080/#/'
// axios.defaults.baseURL = 'http://172.21.105.48:8080/myblog'
// axios.defaults.baseURL = 'http://10.5.13.35:8080/myblog'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
