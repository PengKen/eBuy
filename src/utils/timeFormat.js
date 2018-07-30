import { dateFormat } from 'vux'
const getNormalTime = dateFormat(new Date(), 'YYYY-MM-DD')
  // dateFormat(new Date(), 'YYYY-MM-DD HH:mm:ss')
const msToDate = function (ms){
  return dateFormat(new Date(ms), 'YYYY-MM-DD');
}

export {msToDate}

export default getNormalTime
