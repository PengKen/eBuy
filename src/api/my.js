import httpServer from '@/utils/http'

function getReceivedMsg(userId){
  return httpServer('GET','/api/v1/eBuy/receiveMessageList/'+userId)
}

function getSendMsg(userId){
    return httpServer('GET','/api/v1/eBuy/sendMessageList/'+userId)
}

function postStartBattle(BattleDetail) {
    return httpServer('POST','/api/v1/eBuy/startBattle/', BattleDetail)
}

function getMyBattles(userId, selectTime) {
    return httpServer('GET','/api/v1/eBuy/myBattles/'+userId+'?selectTime='+selectTime)
}

function getMyFocus(userId) {
    return httpServer('GET','/api/v1/eBuy/selectFocus/'+userId)
}
export { getReceivedMsg, getSendMsg, postStartBattle, getMyBattles, getMyFocus }
