import { dateFormat } from 'vux'
const getNormalTime = (millsecond) => dateFormat(millsecond, 'YYYY-MM-DD')
const msToDate = function (ms){
  return dateFormat(new Date(ms), 'YYYY-MM-DD HH') + ':00'
}

export {msToDate}

export default getNormalTime
