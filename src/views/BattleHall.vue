<template>
    <div id="battle-hall">
      <div class="header">
        <div class="button-tab">
          <tab>
            <tab-item selected @on-item-click="onItemClick">正在进行</tab-item>
            <tab-item @on-item-click="onItemClick">已结束</tab-item>
            <tab-item @on-item-click="onItemClick">等待应战</tab-item>
          </tab>
        </div>
      </div>

      <div class="battle" @click="battle">对战
        <div class="invite" :class="[out ? showInvite : '']">邀请</div>
        <div class="set-battle" :class="[out ? showBattle : '']" >摆擂台</div>
      </div>
      <button-bar class="button"></button-bar>
    </div>
</template>

<script>
  import ButtonBar from '@/components/ButtonBar'
  import { Tab, TabItem }  from 'vux'
  export default {
    name: "battle-hall",
    data () {
      return {
        out: false,
        showInvite:"show-invite",
        showBattle:'show-battle'
      }
    },
    components:{
      ButtonBar,
      Tab,
      TabItem

    },
    methods:{
      battle(){
        this.out ? this.out = false : this.out = true
      },
      onItemClick(){

      }
    }
  }
</script>

<style lang="less" scoped>
  #battle-hall{
    height: 100%;
    .header{
      height: 15%;
      background: red;
      color: white;

    }
    .battle,.invite,.set-battle{
      position: relative;
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 50%;
      background: red;
      text-align: center;
      line-height: 1.5rem;
      transition: all 1s;
      -o-transition:all 1s;//parsto
      -moz-transition: all 1s;//gecko
      -webkit-transition: all 1s;//webkit
    }
    .battle{
      position: absolute;
      bottom:2rem;
      left:0;
      right: 0;
      margin: 0 auto;
      .show-invite{
        transform: rotate(360deg) translateX(-2rem);


      }
      .show-battle{
        transform: rotate(360deg) translateX(2rem);
        bottom:2rem;
      }
    }
    .invite,.set-battle{
      position: absolute;
      top:0;
      left:0;
      z-index: -1;

    }
    .invite{
      background: yellow;
    }
    .set-battle{
      background: blue;
    }

  }
</style>
