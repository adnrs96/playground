import Vue from 'vue'
import Studio from '@/Studio.vue'
import router from '@/router'
import store from '@/store'
import directives from '@/directives'
import '@/plugins'
import '@/registerServiceWorker'
import '@/assets/styles/tailwind.scss'

Vue.config.productionTip = false
directives.register()

new Vue({
  router,
  store,
  render: h => h(Studio)
}).$mount('#studio')
