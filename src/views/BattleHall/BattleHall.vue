<template>
    <div id="battle-hall">
      <div class="header">
        <div class="button-tab">
          <tab>
            <tab-item selected @on-item-click="onItemClick(1)">正在进行</tab-item>
            <tab-item @on-item-click="onItemClick(2)">已结束</tab-item>
            <tab-item @on-item-click="onItemClick(3)">等待应战</tab-item>
          </tab>
        </div>
      </div>
      <div class="records">
        <record-list
          id="record-list"
          :records="records"
          :showBtn="active == 2 ? false : true"
          :showStamp="false"


        >
        </record-list></div>
      <!-- <div class="battle-ball">
        <div class="battle" @click.stop="battle">对战</div>
        <div class="invite" :class="[out ? showInvite : '']">邀请</div>
        <div class="set-battle" :class="[out ? showBattle : '']" @click.stop="setBattle">摆擂台</div>
      </div> -->
      <battle-setting></battle-setting>
    </div>
</template>

<script>
  import store from "@/store/index";
  import Vue from 'vue'
  import * as API from '@/api/hall'
  import RecordList from '@/components/RecordList'
  import { Tab, TabItem }  from 'vux'
  import BattleSetting from "./BattleSetting";
  import { mapGetters } from 'vuex'
  export default {
    name: "battle-hall",
    data () {
      return {
        active: 1,
        out: false,
        showInvite:"show-invite",
        showBattle:'show-battle',
        records: [],
        showBattleSetting:false
      }
    },
    components:{
      BattleSetting,
      Tab,
      TabItem,
      RecordList

    },
    computed:{
      ...mapGetters([
        'userId'
      ])
    },
    methods:{
      battle(){
        this.out ? this.out = false : this.out = true
      },
      onItemClick(item){
        this.active=item;
        var state = (item == 1) ? 3 : ((item == 2) ? 4 : 1);
        this.getBattleList(state, this.userId);
      },
      getBattleList(state, userId) {
        /*
            state: 3 正在进行 4 已结束 1 等待应战 2 过期
         */
        API.getBattleList(state, userId).then(res=>{
          this.records = res;
          if(this.records.length>0) {
              Vue.set(this.records[0],'collapsed',true);
          }
        })
      },
      setBattle(msgFromSetting){
        this.$store.dispatch('setShowPopup',true)

      }
    },
    created() {

      this.getBattleList(3, this.userId);
    }
  }
</script>

<style lang="less" >
  #battle-hall{
    min-height: 100%;
    background: white;
    .header{
      height: 1.3rem;
      background: linear-gradient(120deg, #f77062 0%, #c7000b 100%);
      color: white;
      position: fixed;
      width: 100%;
      z-index: 100;
      .button-tab {
        .vux-tab-wrap {
          .vux-tab-container {
            .vux-tab {
              background-color: transparent !important;
              .vux-tab-item {
                background: transparent;
                color: white;
              }
              .vux-tab-ink-bar {
                background-color: white;
                padding: 0 1rem;
                background-clip: content-box;
              }
            }
          }

        }
      }

    }
    .records {
        padding: 0.3rem 0.3rem 3.2rem;
        padding-top: 1.6rem;
        box-sizing: border-box;
        // height: 15rem;
        // overflow: scroll;
    }
    .battle-ball,.battle,.invite,.set-battle{
      position: relative;
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 50%;
      background: linear-gradient(120deg, #f77062 0%, #c7000b 100%);
      color: white;
      text-align: center;
      line-height: 1.5rem;
      transition: all 0.3s ease-out;
      -o-transition:all 0.3s ease-out;//parsto
      -moz-transition: all 0.3s ease-out;//gecko
      -webkit-transition: all 0.3s ease-out;//webkit
    }
    .battle-ball{
      position: fixed;
      bottom:1.7rem;
      left:0;
      right: 0;
      margin: 0 auto;
      z-index: 6;
      .show-invite{
        transform: translateX(-2rem);


      }
      .show-battle{
        transform: translateX(2rem);
        bottom:2rem;
      }
      .invite,.set-battle{
        position: absolute;
        top:0;
        left:0;
        background-image: linear-gradient(-60deg, #e97c33 0%, #ffd5a8 100%);
      }
      .battle{
        z-index: 1000;
      }
    }


  }
</style>
