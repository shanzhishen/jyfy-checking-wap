import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './quasar'

// 兼容低版本手机axios
require('es6-promise').polyfill();

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
