import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
 
  state: {
        user: JSON.parse(window.localStorage.getItem('user_info'))
  },
  // mutations 类似于组件中的 methods
  // 记住一个原则：修改 state 永远通过 mutation 函数修改，不要在组件中去 this.$store.state.xxx = xxx
  // 函数自己定义，函数默认接收一个参数 state，也就是容器中的 state
  // 我们可以在 mutation 函数中去 state.xxx = xxx
  mutations: {
    // changeUser (state, data) {
    //   // // 修改容器中的用户信息。对象拷贝，将 data 中的数据成员拷贝到 state.user 中
    //   Object.assign(state.user, data)

    //   // 将修改之后的用户信息保存到本地存储
    //   // window.localStorage.setItem('user_info', JSON.stringify(data))
    // }
  }
  ,
  modules: {
    app,
    settings
  },
  getters
})

export default store
