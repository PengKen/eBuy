import { dateFormat } from 'vux'
const getNormalTime = (millsecond = new Date().getTime()) => dateFormat(millsecond, 'YYYY-MM-DD')
const msToDate = function (ms){
  return dateFormat(new Date(ms), 'YYYY-MM-DD HH:mm')
}

export {msToDate}

export default getNormalTime
