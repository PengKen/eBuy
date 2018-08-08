import httpServer from '@/utils/http'

function getBoardList(){

    return httpServer('GET','/api/v1/eBuy/boardList')

}

function postNewBattle(battelDetail) {

  return  httpServer('POST','/api/v1/eBuy/battle', battelDetail)
}

 function getPersonalBattle(userId, selectTime) {

  return httpServer('Get','/api/v1/eBuy/userBattles/'+userId+"?selectTime="+selectTime)
}


function getUserInfo(userId) {
  return httpServer('Get','/api/v1/eBuy/userInfo/'+userId)
}

export { getBoardList, postNewBattle, getPersonalBattle,getUserInfo }
