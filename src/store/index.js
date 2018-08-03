import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import boardList from './modules/boardList'
const store = new Vuex.Store({
  modules:{
    boardList

  },
  state: {
    userId: 777
  }
  
})

export default  store
