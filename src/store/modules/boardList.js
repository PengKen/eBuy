import * as API from '@/api/home'

// initial state
// shape: [{ id, quantity }]
const state = {
  boardList: [
    {
      userId: '',
      name: '',
      winRate: '',
      challengeState: '',// nothing : 无人挑战 playing：正在挑战
      honor: ''
    }
  ]
}

// getters
const getters = {
  // specificBoardListUser: (state, getters, rootState) => {
  //   return state.boardList.map(({ userId , name , challengeState ,winRate}) => {
  //     const boardListUser = state.boardList.find( boardListUser => boardListUser.userId === userId)
  //     return {
  //       ...boardListUser
  //     }
  //   })
  // },
  allBoardList: (state, getters, rootState) => {
    return state.boardList
  }
}



// actions
const actions = {
  async getBoardList ({ commit, state }) {
    let boardList = await API.getBoardList()

    commit('setBoardList', { boardList })
    return state
  },
  async setBoardListUserState ({commit , state }) {
    commit('setBoardListUserState', { boardListUser })
    return state
  }

}

// mutations
const mutations = {
  setBoardList (state, newBoardList) {
    state.boardList = newBoardList
  },
  setBoardListUserState (state , {userId, challenState }){
    const boardListUser = state.boardList.find(boardList => boardList.userId === userId)
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
