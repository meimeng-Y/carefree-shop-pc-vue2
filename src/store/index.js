import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedstate from 'vuex-persistedstate'
import search from './search'
import user from './user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  modules: {
    search: search,
    user: user
  },
  plugins: [
    // veux持久化配置
    createPersistedstate({
      key: 'rabbitstore-client',
      paths: []
    })
  ]
})
