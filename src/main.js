import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
// 导入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 导入粒子效果
import VueParticles from 'vue-particles'
// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

// 配置axios的Vue原型
Vue.prototype.$axios = axios
// 网络请求根路径
axios.defaults.baseURL = 'http://47.112.219.215:7800'
// 跨域问题
axios.defaults.timeout = 500000;
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.baseURL = "/api";

// Vue.prototype.$message = Message

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueParticles)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
