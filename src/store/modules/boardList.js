import * as API from '@/api/home'

// initial state
// shape: [{ id, quantity }]
const state = {
  boardList: [
    {
      userid:'',
      name:'',
      winrate:'',
      challengeState:''// nothing : 无人挑战 playing：正在挑战
    },

  ]
}

// getters
const getters = {
  specificBoardListUser: (state, getters, rootState) => {
    return state.boardList.map(({ userid , name , challengeState ,winrate}) => {
      const boardListUser = state.boardList.find( boardListUser => boardListUser.userid === userid)
      return {
        ...boardListUser
      }
    })
  },
  allBoardList: (state, getters, rootState) => {
    return state.boardList
  }
}



// actions
const actions = {
  async getBoardList ({ commit, state }) {
    let boardList = await API.getBoardList()
    commit('boardList/setBoardList', { boardList })
    return state
  },
  async setBoardListUserState ({commit , state }) {
    commit('boardList/setBoardListUserState', { boardListUser })
    return state
  }

}

// mutations
const mutations = {
  setBoardList (state, newBoardList) {
    state.boardList = newBoardList
  },
  setBoardListUserState (state , {userid, challenState }){
    const boardListUser = state.boardList.find(boardList => boardList.userid === userid)
    boardListUser.challenState = challenState
  }

}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
