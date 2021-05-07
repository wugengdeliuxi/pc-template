import Vue from 'vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss'

import App from './App.vue'
import store from './store'
import router from './router'

import '@/icons' // icon
// import '@/permission' // permission control

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
  router,
  store
}).$mount('#app')
