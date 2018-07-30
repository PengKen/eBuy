import httpServer from '@/utils/http'

function getBattleList(state, userId) {
    return httpServer('Get','/api/v1/eBuy/battleList?state=' + state + "&userId=" + userId);
}

function postInsertFocus(focusInfo) {
    return  httpServer('POST','/api/v1/eBuy/insertFocus', focusInfo);
}

function deleteFocus(userId, battleId) {
  return  httpServer('POST','/api/v1/eBuy/deleteFocus/' + userId + '?battleId=' + battleId);
}

export {getBattleList, postInsertFocus, deleteFocus}