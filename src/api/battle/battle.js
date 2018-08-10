import httpServer from '@/utils/http'

function getCurrentBattle(userId) {
    return httpServer('Get','/api/v1/eBuy/currentBattle/' + userId,null,true);
}

function getProductDetail(productId) {
    return httpServer('Get','/api/v1/eBuy/singleProduct/' + productId);
}

function getProductAccount(userId, productId) {
    return httpServer('Get','/api/v1/eBuy/singleProductAccount/' + userId + '?productId=' + productId);
}

function postBuyProduct(transactionInfo) {
    return httpServer('Post','/api/v1/eBuy/buyProduct', transactionInfo);
}
function postSellProduct(transactionInfo) {
    return httpServer('Post','/api/v1/eBuy/sellProduct', transactionInfo);
}

function getUserAccount(userId) {
    return httpServer('Get','/api/v1/eBuy/myAccounts/' + userId);
}
export {getCurrentBattle, getProductDetail, getProductAccount, postBuyProduct, postSellProduct, getUserAccount}