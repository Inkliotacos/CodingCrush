import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'
import { IconsPlugin } from 'bootstrap-vue'
Vue.use(IconsPlugin)

Vue.config.productionTip = false

// set auth header
Axios.defaults.headers.common.Authorization = `Bearer ${store.state.token}`

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
