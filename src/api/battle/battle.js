import httpServer from '@/utils/http'

function getCurrentBattle(userId) {
    return httpServer('Get','/api/v1/eBuy/currentBattle/' + userId,null,true);
}


export {getCurrentBattle}