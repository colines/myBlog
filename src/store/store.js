import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    categoryType: 0,
    categoryId: 1,
    articleId: '',
    isContent:true,//是否加载文章列表
  },
  mutations: {
    setCategoryType(state, data) {
      state.categoryType = data;
    },
    setCategoryId(state, data) {
      state.categoryId = data;
    },
    setArticleId(state, data) {
      state.articleId = data;
    },
    setIsContent(state,data){
      state.isContent = data;
    }
  }
})
export default store
