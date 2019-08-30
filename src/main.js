import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import Emiter from '@/mixins/emitter'
import UiDialog from '@/components/Dialog'
import UiPager from '@/components/Pager'

import '@/icons' // icon
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
import { mockXHR } from '../mock'
if (process.env.NODE_ENV === 'production') {
  mockXHR()
}

// set ElementUI lang to zh-CN
Vue.use(ElementUI, { size: 'small' })

// global mixin
Vue.mixin(Emiter)
// global components
Vue.component(UiPager.name, UiPager)
Vue.component(UiDialog.name, UiDialog)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  mounted() {
    // Prevent blank screen in Electron builds
    // https://nklayman.github.io/vue-cli-plugin-electron-builder/guide/commonIssues.html#blank-screen-on-builds-but-works-fine-on-serve
    if (process.env.IS_ELECTRON) {
      this.$router.push('/')
    }
  },
  render: h => h(App)
})
