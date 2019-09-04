import axios from 'axios'
import Vue from 'vue'
import qs from 'qs'

// import { MessageBox, Message } from 'element-ui'
// import store from '@/store'
// import { getToken } from '@/utils/auth'

axios.defaults.baseURL = 'http://abc.bjlitian.com:8111/api/'



axios.interceptors.request.use((config) => {
  if(config.method  === 'post'){
    config.data = qs.stringify(config.data);
  }
  return config;
},(error) =>{
  return Promise.reject(error);
});

Vue.prototype.$http = axios
// axios.interceptors.response.use((res) => {
//   // token 已过期，重定向到登录页面
//   if (res.date.code === 500) {
//     localStorage.clear()
//     router.replace({
//       path: '/sigin',
//       query: {redirect: router.currentRoute.fullPath} 
//     })
//   }
//   return res
// }, function(err) {
//   return Promise.reject(error) 
// })
axios.interceptors.response.use(response => { // >= 200 && < 400 的状态码进入这里
  // console.log('response => ', response)
  // return response
  // if(response.data.code == 200){
  // 将响应数据处理成统一的数据格式方便使用
   console.log('response => ', response)
   return response.data
  // return response.data.data
  // 如果返回的数据格式是对象
  // if (typeof response.data === 'object' && response.data.data) {
  //   return response.data.data
  // } else {
  //   return response.data
  // }
  //  }else {
  //   window.localStorage.removeItem('user_info')
  //   return response.data
  //  }
}, error => { // >= 400 的状态码会进入这里
  // console.dir(error)
  const status = error.response.status
  if (status === 401) {
    // 务必删除本地存储中的用户信息数据
    window.localStorage.removeItem('user_info')

    // 跳转到登录页面
    router.push({
      name: 'login'
    })
  }
  return Promise.reject(error)
})

// axios.interceptors.response.use(response => {
//   return response;
// },error => {
//   if (error.response) {
//    switch (error.response.status) {
//      // 返回401，清除token信息并跳转到登录页面
//      case 500:
//      console.log('错误')
//     //  localStorage.removeItem('token');
//     //  router.replace({
//     //    path: '/login'
//     //    //登录成功后跳入浏览的当前页面
//     //    // query: {redirect: router.currentRoute.fullPath}
//     //  })
//    }
//    // 返回接口返回的错误信息
//    return Promise.reject(error.response.data);
//  }
// });


export default axios
