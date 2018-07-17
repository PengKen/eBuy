import httpServer from '@/utils/http'

function getBoardList(){
  return httpServer('GET','eBuy/all')

}

export { getBoardList }
