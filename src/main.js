// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Cookies from 'js-cookie'
let Base64 = require('js-base64').Base64;
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'

// import '@/styles/globalScssVarables.scss';
// 使用rem布局，rem函数便于移动端快速开发布局
import '@/assets/rem.js'

//过滤器
import * as filters from '@/filters'; // 全局vue filter

Vue.use(Mint);
Vue.prototype.$http = axios
Vue.config.productionTip = false
// register global utility filters.
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
});

//引入公共样式 公共部门放入入口不要和其它组件耦合在一起
import '@/styles/ui-box.css';
// import '@/styles/common.scss';
import '@/styles/reset.css';
import '@/styles/const.scss';



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
