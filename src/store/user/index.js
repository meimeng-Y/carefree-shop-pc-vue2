export default {
  //搜索框
  state: {
    userInfo: window.localStorage.getItem('userInfo') != null ? JSON.parse(window.localStorage.getItem('userInfo')) : {} //用户信息
  },
  mutations: {
    setuserInfoVal(state, userInfo) {
      state.userInfo = userInfo
    }
  },
  getters: {
    getuserInfoVal(state) {
      return state.userInfo
    }
  },

}
