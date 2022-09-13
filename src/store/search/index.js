export default {
  //搜索框
  state: {
    keyword: '' //搜索词
  },
  mutations: {
    setKeywordVal(state, keyword) {
      state.keyword = keyword
    }
  },
  getters: {
    getKeywordVal(state) {
      return state.keyword
    }
  },
  namespaced: true
}
