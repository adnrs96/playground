import Vue from 'vue'
import plugin from '@storyscript/vue'
import '@storyscript/vue/dist/vue.storyscript.esm.css'
import store from '@app/store'

Vue.use(plugin, { store })
