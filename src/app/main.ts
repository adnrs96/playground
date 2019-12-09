import Vue from 'vue'
import Studio from '@app/Studio.vue'
import router from '@app/router'
import store from '@app/store'
import directives from '@internal/directives'
import '@internal/plugins'
import '@editor/plugins'
import '@app/registerServiceWorker'
import '@/assets/styles/tailwind.scss'

Vue.config.productionTip = false
directives.register()

new Vue({
  router,
  store,
  render: h => h(Studio)
}).$mount('#studio')
