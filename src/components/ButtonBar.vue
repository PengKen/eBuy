<template>
  <div id="button-bar">
    <ul class="wrapper">
      <router-link :to="{ name: 'Home', params: {}}" >
        <li>
          <i class="icon iconfont icon-home-copy"></i>
          <div class="name">首页</div>
        </li>
      </router-link>

      <router-link :to="{ name: 'Battle', params: {}}">
        <li>
          <i class="icon iconfont icon-duizhanpingtai"></i>
          <div class="name">对战平台</div>
        </li>
      </router-link>
        <li class="ball" @click="setBattle()">
          <x-icon type="ios-plus-empty" size="30"></x-icon>
          <div class="new-battle">摆擂</div>
        </li>
      <router-link :to="{ path:'/battlehall', params: {}}">
        <li>
          <i class="icon iconfont icon-youxidating"></i>
          <div class="name">游戏大厅</div>
        </li>
      </router-link>

      <router-link :to="{ name: 'My', params: {}}">
        <li>
          <i class="icon iconfont icon-profile"></i>
          <div class="name">我 的</div>
        </li>
      </router-link>

    </ul>
    
  </div>

</template>
<script>
import BattleSetting from "@/views/BattleHall/BattleSetting"
  export default {
    name: "button-bar",
    methods: {
      setBattle(){
        var battleSetting = {
          situation: 'BattleHall',
          challengeUser: 0
        }
        this.$store.dispatch('setBattleSetting',battleSetting)
        this.$store.dispatch('setShowPopup',true)
      }
    },
    components: {
      BattleSetting
    }
  }
</script>

<style scoped lang="less">
.vux-x-icon {
  fill: white;
}
  #button-bar{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    .wrapper{
      width: 100%;
      height: 1.5rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
      color: black;
      background: white;
      border-top: 1px solid #f0f0f0;
      z-index: 10000;
      position: relative;
      li{
        font-size: 0.3rem;
        // flex: 0 1 auto;
        list-style: none;
        color: black;
      }
      .router-link-active>li{
        color:red !important;
      }
      .ball {
        background: linear-gradient(120deg, #f77062 0%, #c7000b 100%);
        border-radius: 0.2rem;
        width: 1.4rem;
        height: 1.2rem;
        // margin-top: -1rem;
        border: 5px solid white;
        .new-battle {
          margin-top: -0.3rem;
          color: white;
        }
      }
    }
  }
</style>

