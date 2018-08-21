import Vue from 'vue'
import Vuex from 'vuex'
import * as API from '@/api/home'
Vue.use(Vuex)
import boardList from './modules/boardList'
import battle from './modules/battle'
import notify from '@/utils/timer/notify'
const store = new Vuex.Store({
  modules:{
    boardList,//排行榜
    battle,//对战
  },
  state: {
    userInfo:{
      userId: 0,
      honor:{url:'',title:''},
      challengeState:0,// 0:从未开始过任何战斗（expiredTime不会传过来） 1:玩过但已结束 2: 正在完
      name:'',
      portrait:'',
      winRate:1,
      endTime:null
    },
    isShowNotify:false,
    isShowPopup:false,// 全局定义popup的显示状态
    battleSetting: {
      situation: 'BattleHall',
      curUser:0
    }
  },
  actions:{
     setShowPopup({ commit, state },isShowPopup) {
      commit('setShowPopup',  isShowPopup )
      return state
    },
    async setShowNotify({ commit, state },isShowNotify){
      commit('setShowNotify',  isShowNotify)
      return state
    },
    async setUserInfo({commit,state,dispatch},userId){
       if(userId !== 0){
         let userInfo = await  API.getUserInfo(userId)
         commit('setUserInfo',userInfo)
         if(state.userInfo.challengeState > 0){
           /*
              客户端自行倒计时
            */
           notify(userInfo.endTime.time,dispatch,commit)
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
    },
    setShowNotify(state, isShowNotify){
      state.isShowNotify = isShowNotify
    },
    setChallengeState(state,newChallengeState){
      state.userInfo.challengeState = newChallengeState
    },
    setBattleSetting(state, situation, challengeUser){
      state.battleSetting.situation = situation
      state.battleSetting.challengeUser = challengeUser
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
    },
    isShowNotify: state => {
      return state.isShowNotify
    },
    battleSetting: state => {
      return state.battleSetting
    }
  }

})

export default  store
