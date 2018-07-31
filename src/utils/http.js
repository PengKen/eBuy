import axios from 'axios'
import qs from 'qs'
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
axios.interceptors.request.use(config => {
  Vue.$vux.loading.show({
    text: 'Loading'
  })
  return config
}, error => {
  return Promise.reject(error)
})
const baseURL = process.env.API_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';
/* 设置拦截 */
axios.interceptors.response.use(response => {
  Vue.$vux.loading.hide()
  return response
}, error => {
  Vue.$vux.loading.hide()
  errorState(error)
  return Promise.reject(error)
})

function errorState(response) {
  try{
    console.log(response)
  }catch (err){
    console.log(err)
  }

  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response.data
    // 如果不需要除了data之外的数据，可以直接 return response.data
  }else if((response && (response.status >= 500))){
    Vue.$vux.toast.show({
      ...defaultToastMsg,
      text:'服务器异常，请等待修复'
    })
  }else {
    Vue.$vux.toast.show({
      ...defaultToastMsg
    })
  }

}

function successState(res) {
  //隐藏loading
  //统一判断后端返回的错误码
  if (res.data.errCode == '000002') {
    Vue.prototype.$msg.alert.show({
      title: '提示',
      content: res.data.errDesc || '网络异常',
      onShow() {
      },
      onHide() {
        console.log('确定')
      }
    })
  } else if (res.data.errCode != '000002' && res.data.errCode != '000000') {
    Vue.prototype.$msg.alert.show({
      title: '提示',
      content: res.data.errDesc || '网络异常',
      onShow() {

      }
    })
  }
}
const httpServer = (method = 'GET', url, data) => {

  let Public = { //公共参数
    'srAppid': ""
  }

  let httpDefaultOpts = { //http默认配置
    method,
    baseURL: baseURL + url,
    timeout: 10000,
    data,
    // data:qs.stringify(data),
    headers: {
      'X-Requested-With': 'XMLHttpRequest'
    }
  }

  if(method=='GET'){
    delete httpDefaultOpts.data
  }else{
    delete httpDefaultOpts.params
  }

  let promise = new Promise(function(resolve, reject) {
    axios(httpDefaultOpts).then(
      (res) => {
        resolve(res.data)
      }
    ).catch(
      (err) => {
        // console.log(err.response.data)
        reject(err)
      }
    )

  })
  return promise
}

export default httpServer;
