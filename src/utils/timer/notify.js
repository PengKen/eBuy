import Worker from './deadLine.worker'
var deadLineWorker =  new Worker();
function handler(endTime,dispatch, commit) {
  deadLineWorker.postMessage(endTime)
  deadLineWorker.onmessage = function (e) {
    console.log(e.data)
    if(e.data === 'TIME_IS_UP'){
      /*
       * 比赛结束了
      */
      if(localStorage.hasShowNotify==="false"){
        dispatch('setShowNotify',true).then(state => {
          //开启动弹窗,并在本地记录已经开启过弹窗，下次不再弹出
          localStorage.hasShowNotify = "true"
          //比赛结束后，要手动更新challengeState
          commit('setChallengeState',1)//1表示玩过且已结束

        })
      }

    }else{

    }
  }
}

export default handler
