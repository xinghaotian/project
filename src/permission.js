import router from './router'
import store from './store'
// import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
// import { getToken } from '@/utils/auth' // get token from cookie
// import getPageTitle from '@/utils/get-page-title'

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
  // const userInfo = window.localStorage.getItem('user_info')

  // 如果是非 /login 页面，判断其登录状态
  // if (to.path !== '/login') {
  //   // 如果没有登录，让其跳转到登录页
  //   if (!userInfo) {
  //     next({ path: '/login' })
  //   } else {
  //     // 如果登录了，则允许通过
  //     next()
  //   }
  // } else {
  //   // 如果登录了，就不允许访问登录页了
  //   if (userInfo) {
  //     next(false)
  //   } else {
  //     // 没有登录，才允许访问登录页
  //     next()
  //   }
  // }
})
// NProgress.configure({ showSpinner: false }) // NProgress Configuration

// const whiteList = ['/login'] // no redirect whitelist

// router.beforeEach(async(to, from, next) => {
//   // start progress bar
//   NProgress.start()

//   // set page title
//   document.title = getPageTitle(to.meta.title)

//   // determine whether the user has logged in
//   const hasToken = getToken()

//   if (hasToken) {
//     if (to.path === '/login') {
//       // if is logged in, redirect to the home page
//       next({ path: '/' })
//       NProgress.done()
//     } else {
//       const hasGetUserInfo = store.getters.name
//       if (hasGetUserInfo) {
//         next()
//       } else {
//         try {
//           // get user info
//           await store.dispatch('user/getInfo')

//           next()
//         } catch (error) {
//           // remove token and go to login page to re-login
//           await store.dispatch('user/resetToken')
//           Message.error(error || 'Has Error')
//           next(`/login?redirect=${to.path}`)
//           NProgress.done()
//         }
//       }
//     }
//   } else {
//     /* has no token*/

//     if (whiteList.indexOf(to.path) !== -1) {
//       // in the free login whitelist, go directly
//       next()
//     } else {
//       // other pages that do not have permission to access are redirected to the login page.
//       next(`/login?redirect=${to.path}`)
//       NProgress.done()
//     }
//   }
// })

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
