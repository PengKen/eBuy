import { dateFormat } from 'vux'
const getNormalTime = dateFormat(new Date(), 'YYYY-MM-DD')
  // dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss')
export default getNormalTime
