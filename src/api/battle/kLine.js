import Vue from 'vue'
import  { LoadingPlugin, ToastPlugin } from 'vux'
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)
const defaultToastMsg = {
  type:'text',
  position:'bottom',
  text: '胸得，你的网络不太行哦～～',
  width:'80%',
  time:3000
}
var webSocket = null
var getKlineData = null

function createConnect() {
  try{
     webSocket = new webSocket(process.env.WEBSOCKET)
     Vue.$vux.loading.show({
      text: '正在加载'
    })
    webSocket.onerror = function (event) {
      Vue.$vux.loading.hide()
      Vue.$vux.toast.show({
        ...defaultToastMsg,
        text:'拉取数据失败～'
      })
    }
    webSocket.onmessage = function (event) {
       if(event.data.indexof('heartbeat') === -1){
         getKlineData(event.data.result.datas)
       }
       hearbeat()
     }
    webSocket.onopen = function () {
      login();
      Vue.$vux.loading.hide()
    }
  }catch(err){
    Vue.$vux.toast.show({
      ...defaultToastMsg,
      text:'拉取数据失败～'
    })
  }

}

function login() {
  webSocket.send('/User/login?User=asdfdsf&pwd=pwa&termtypoe=html5')
}


function hearbeat() {
  /*
    接收到消息后要发送消息，避免服务端主动断开连接
   */
  webSocket.send("/heartbeat/ans?time=2018")
}

function dynamicData(obj,getKLineData){
  this.getKLineData = getKLineData
  /*
      获取某样产品的日K线
   */
  webSocket.send('/gwsvr/kline?market=G1&obj=' + obj +  '&kltype=day')
}

export { dynamicData, createConnect}
