import Vue from 'vue'
import App from './App.vue'
import router from "@/router";
import store from '././store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.prototype.$fileBase='http://rwedg0k7t.bkt.clouddn.com/'
// console.log(Vue.prototype.$fileBase)
Vue.use(ElementUI)
Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
