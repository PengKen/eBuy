import httpServer from '@/utils/http'

function getBoardList(){

  return httpServer('GET','/api/v1/boardList')

}

function postNewBattle(battelDetail) {

  return  httpServer('POST','/api/v1/battle', battelDetail)
}



export { getBoardList, postNewBattle }
