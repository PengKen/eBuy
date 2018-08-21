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

function getMyBattles(userId, state) {
    return httpServer('GET','/api/v1/eBuy/myBattles/'+userId+'?state='+state)
}

function getMyFocus(userId) {
    return httpServer('GET','/api/v1/eBuy/selectFocus/'+userId)
}

function readMsg(battleId) {
    return httpServer('GET','/api/v1/eBuy/readMessage/'+battleId)
}
export { getReceivedMsg, getSendMsg, postStartBattle, getMyBattles, getMyFocus, readMsg }
