<template>
  <div id="app">
    <keep-alive include="BattleIndex">
      <router-view/>
    </keep-alive>

    <transition name="silde-hide">
      <button-bar v-show="isShow" class="button"></button-bar>
    </transition>


  </div>
</template>

<script>
  import Vue from 'vue'
  import ButtonBar from '@/components/ButtonBar'
  import { createConnect } from '@/api/battle/Kline'
  import  { ConfirmPlugin } from 'vux'
  Vue.use(ConfirmPlugin)
export default {
  name: 'App',
  data () {
    return {
      isShow:true
    }


  },
  created () {
    createConnect() //建立K线websocket连接
    // prompt形式调用
    this.$vux.confirm.prompt('UserId', {
      onCancel () {},
      onConfirm: (userId) => {
        this.$store.dispatch('setUserInfo',userId)
      }
    })


  },
  components:{
    ButtonBar
  },
  watch: {
    $route (to, from, next) {
      if (to.meta.index > from.meta.index) {
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
