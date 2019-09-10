import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import '@/icons' // icon
import '@/permission' // permission control
import BaiduMap from 'vue-baidu-map'

Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'YOUR_APP_KEY'
})
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

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })

Vue.config.productionTip = false
Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = el.dataset.title
  }
})

router.beforeEach((to, from, next) => {

  const userInfo = window.localStorage.getItem('user_info')

  // 如果是非 /login 页面，判断其登录状态
  if (to.path !== '/login') {
    // 如果没有登录，让其跳转到登录页
    if (!userInfo) {
      next({ path: '/login' })
    } else {
      // 如果登录了，则允许通过
      next()
    }
  } else {
    // 如果登录了，就不允许访问登录页了
    if (userInfo) {
      next(false)
    } else {
      // 没有登录，才允许访问登录页
      next()
    }
  }
})
router.afterEach((to, from) => {
})
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
