import Vue from 'vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss'
import GlobalTable from '@/components/Base/GlobalTable'
import GlobalSearch from '@/components/Base/GlobalSearch'

import App from './App.vue'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

Vue.use(ElementUI)
Vue.component('GlobalTable', GlobalTable)
Vue.component('GlobalSearch', GlobalSearch)

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
  router,
  store
}).$mount('#app')
