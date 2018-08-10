import * as API from '@/api/home'
import timeFormat from '@/utils/'
// initial state
// shape: [{ id, quantity }]
const state = {
  KLineRawData:
    [ 'obj', //产品id
      'name',  // 产品名称
      'time', //日期（单位 ： 秒）
      'open', //开盘价
      'height', //最高价
      'low', //最低价
      'close'//收盘价]
    ]
}

// getters
const getters = {
  KLineData: (state, getters, rootState) => {
    return state.KLineRawData.map(( data ) => {
      return [ data[3], data[4], data[5], data[6] ]
    })
  },
  KLineTime: (state , getters ,rootState ) => {
    return state.KLineRawData.map( (data) => {
      return timeFormat( data[2] * 1000 )
    } )
  }
}



// actions
const actions = {
  setKLineData({ commit, state }, KLineData) {
      commit('setBoardList',  KLineData )
      return state
  }

}

// mutations
const mutations = {
  setKLineData (state, KLineData) {
    state.boardList = KLineData
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
