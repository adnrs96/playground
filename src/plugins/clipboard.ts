import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'

VueClipboard.config.autoSetContainer = true
VueClipboard.config.appendToBody = false
Vue.use(VueClipboard)
