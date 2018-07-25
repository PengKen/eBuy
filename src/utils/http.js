import axios from 'axios'
import qs from 'qs'
import Vue from 'vue'
import  { LoadingPlugin, ToastPlugin } from 'vux'
// Vue.use(vuxToastPlugin)
// Vue.use(LoadingPlugin )
Vue.use(ToastPlugin, {position: 'bottom'})
axios.interceptors.request.use(config => {
  // Vue.$vux.loading.show({
  //   text: 'Loading'
  // })
  return config
}, error => {
  return Promise.reject(error)
})
// axios.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8';
const baseURL = 'http://192.168.8.101:3000';
axios.interceptors.response.use(response => {
  // this.$vux.loading.hide()
  return response
}, error => {
  return Promise.resolve(error.response)
})

function errorState(response) {
  //隐藏loading
  console.log(response)
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response.data
    // 如果不需要除了data之外的数据，可以直接 return response.data
  }else{
   Vue.$vux.toast.show({
      text: '网络异常'
    })
  }

}

function successState(res) {
  //隐藏loading
  //统一判断后端返回的错误码
  if(res.data.errCode == '000002'){
    Vue.prototype.$msg.alert.show({
      title: '提示',
      content: res.data.errDesc||'网络异常',
      onShow () {
      },
      onHide () {
        console.log('确定')
      }
    })
  }else if(res.data.errCode != '000002'&&res.data.errCode != '000000') {
    Vue.prototype.$msg.alert.show({
      title: '提示',
      content: res.data.errDesc||'网络异常',
      onShow () {

      },
      onHide () {
        console.log('确定')
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
    params:Object.assign(Public, data),
    data:qs.stringify(Object.assign(Public, data)),
    headers: {
      // 'X-Requested-With': 'XMLHttpRequest'
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
        console.log(res)
        // successState(res)
        resolve(res.data)
      }
    ).catch(
      (response) => {
        // errorState(response)
        reject(response)
      }
    )

  })
  return promise
}

export default httpServer
