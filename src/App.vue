<template>
  <div id="app">
    <keep-alive include="BattleIndex">
      <router-view/>
    </keep-alive>

    <transition name="silde-hide">
      <button-bar v-show="isShow" class="button"></button-bar>
    </transition>
    <x-dialog :show="isShowNotify" class="dialog-demo">
      <div class="img-box">
        <img :src="require('./assets/endTime.png')" style="max-width:100%">
      </div>
      <div class="note">您的比赛结束啦，快去对战平台看看战果吧</div>
      <button class="toBattle" @click="toBattle()">对战平台</button>
      <div @click="isShowNotify=false">
        <span class="vux-close"></span>
      </div>
    </x-dialog>

  </div>
</template>

<script>
  import Vue from 'vue'
  import ButtonBar from '@/components/ButtonBar'
  import { createConnect } from '@/api/battle/KLineData'
  import  { ConfirmPlugin,XDialog } from 'vux'
  import { mapGetters } from 'vuex'
  Vue.use(ConfirmPlugin)
export default {
  name: 'App',
  data () {
    return {
      isShow:true,
      showNotify:this.isShowNotify
    }
  },
  computed:{
    ...mapGetters([
      'expiredTime',
      'isShowNotify'
  ]),
    isShowNotify:{
      get(){
        return this.$store.state.isShowNotify
      },
      set(newVal){
        console.log(this)
        this.$store.dispatch('setShowNotify',newVal)
      }


    }
  },
  methods: {
    toBattle() {
      this.isShowNotify = false
      this.$router.push({ path: "/battle/battle", query: {} });
    }
  },
  watch:{
    showNotify(newVal){
      console.log("wtf")
      this.$store.dispatch('setShowNotify',newVal)
    }
  },
  created () {
    this.showNotify = this.isShowNotify

    createConnect()
    //建立K线websocket连接

    // prompt形式调用
    this.$vux.confirm.prompt('UserId', {
      onCancel () {},
      onConfirm: (userId) => {
        this.$store.dispatch('setUserInfo',userId)

      }
    })


  },
  components:{
    ButtonBar,
    XDialog
  },
  watch: {
    $route (to, from, next) {
      if (to.meta.index >= from.meta.index && to.meta.index > 0) {
        // 设置动画名称
          this.isShow = false
      } else {
        this.isShow = true
      }
    }
  }
}
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
html,body{
  height: 100%;
}
#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  @import '~vux/src/styles/close';

  .dialog-demo {
    .weui-dialog{
      border-radius: 8px;
      padding-bottom: 8px;
    }
    .dialog-title {
      line-height: 30px;
      color: #666;
    }
    .img-box {
      // height: 350px;
      overflow: hidden;
    }
    .vux-close {
      margin-top: 8px;
      margin-bottom: 8px;
    }
    .note {
      margin: 0.3rem 0;
    }
    .toBattle {
      color:white;
      background: orange;
      padding: 0.2rem 0.3rem;
      border-radius: 1rem;
      border: none;
      margin: 0.3rem;
    }
  }
  .button{

    width: 100%;
    position:absolute;
    bottom: 0;
    /*background:rgba();*/
  }
}
  .vux-toast-bottom{
    bottom: 2rem !important;
  }
  .silde-hide-enter-active,
  .silde-hide-leave-active
   {
    will-change: transform;
    /*will-change 会随过渡结束后整个类被移除的时候而被解绑，避免了过多cpu的浪费*/
    transition: all 500ms;
  }
  .silde-hide-enter {
    opacity: 0; //页面刚进来的时候，由0变成1
    /*定义进入过渡的开始状态。在元素被插入时生效，在下一个帧移除。
     * 只应用了一帧就被删除，肉眼看不出来透明度发生了变化
     * 即只有在第一帧的时候透明度为0，但也因此引发了过渡
     * translate同理
     * */
    transform: translate3d( 0,1.5rem, 0);
  }
  .slide-hide-enter-to{
    transform: translate3d(0,-1.5rem,0);
  }

  .silde-hide-leave-to {
    opacity: 0;//页面离开时由1变成0
    transform: translate3d( 0,1.5rem, 0);
  }

</style>
