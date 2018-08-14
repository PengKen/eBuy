import Vue from 'vue'
import Vuex from 'vuex'
import * as API from '@/api/home'
Vue.use(Vuex)
import boardList from './modules/boardList'
import battle from './modules/battle'
const store = new Vuex.Store({
  modules:{
    boardList,
    battle,
  },
  state: {
    userInfo:{
      userId: 0,
      honor:{url:'',title:''},
      challengeState:0,// 0:从未开始过任何战斗（expiredTime不会传过来） 1:玩过但已结束 2: 正在完
      name:'',
      portrait:'',
      winRate:1,
      expiredTime:undefined
    },

    isShowPopup:false// 全局定义popup的显示状态
  },
  actions:{
     setShowPopup({ commit, state },isShowPopup) {
      commit('setShowPopup',  isShowPopup )
      return state
    },
    async setUserInfo({commit,state},userId){
       if(userId !== 0){
         let userInfo = await  API.getUserInfo(userId)
         console.log(userInfo)
         commit('setUserInfo',userInfo)
         if(state.userInfo.expiredTime){


         }
         return state
       }
     }
  },
  mutations:{
    setShowPopup(state,isShowPopup){
      state.isShowPopup = isShowPopup
    },
    setUserInfo(state,userInfo){
      state.userInfo = userInfo
    }
  },
  getters:{
    isShowPopup: state => {
      return state.isShowPopup
    },
    userId: state => {
      return state.userInfo.userId
    },
    userInfo: state => {
      return state.userInfo
    },
    challengeState: state => {
      return state.userInfo.challengeState
    },
    expiredTime: state => {
      return state.userInfo.expiredTime
    }

  }

})

export default  store
