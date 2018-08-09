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
      if()
    }
    webSocket.onopen = function () {
      login();
      Vue.$vux.loading.hide()
    }
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

function dynamic(obj){
  /*
      获取某样产品的dont
   */
  webSocket.send('/gwsvr/interest?market=G1&obj=1300')
}
