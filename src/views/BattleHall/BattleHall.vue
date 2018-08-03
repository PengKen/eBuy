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
      <record-list id="record-list"
        :records="records"
        :showBtn="active == 1 ? true : false"
        :showStamp="false">
      </record-list>
      <div class="battle-btn">
        <div class="battle" @click.stop="battle">对战</div>
        <div class="invite" :class="[out ? showInvite : '']">邀请</div>
        <div class="set-battle" :class="[out ? showBattle : '']" @click.stop="setBattle">摆擂台</div>
      </div>
      <battle-setting
        :showBattleSetting.sync="showBattleSetting"
        @notifySetting="setBattle"
      ></battle-setting>
      <button-bar class="button"></button-bar>
    </div>
</template>

<script>
  import Vue from 'vue'
  import * as API from '@/api/hall'
  import ButtonBar from '@/components/ButtonBar'
  import RecordList from '@/components/RecordList'
  import { Tab, TabItem }  from 'vux'
  import BattleSetting from "./BattleSetting";
  export default {
    name: "battle-hall",
    data () {
      return {
        active: 1,
        out: false,
        showInvite:"show-invite",
        showBattle:'show-battle',
        records: [
                {
                    founderName:"我是长长的用户名hhhhhhhhhhhhhhhhhh",
                    inviteeName:"userB",
                    founderPortrait:"/static/img/5f236c10dc4d2e83d386048aedf9e50c.jpg",
                    inviteePortrait:"/static/img/5f236c10dc4d2e83d386048aedf9e50c.jpg",
                    founderHonor:{url:"/static/icon-img/honor-初出茅庐.png",title:"迷你鸡王"},
                    inviteeHonor:{url:"/static/icon-img/honor-初出茅庐.png",title:"迷你鸡王"},
                    battleId:"1",
                    founderCardId:"",
                    inviteeCardId:"",
                    startTime:"2018-07-20",
                    endTime:"2018-07-25",
                    initialMoney:"",
                    founderBalance:"",
                    inviteeBalance:"",
                    founderRate:1.1,
                    inviteeRate:1.2,
                    isFocus:1
                },
                {
                    founderName:"我是长长的用户名hhhhhhhhhhhhhhhhhh",
                    inviteeName:"null",
                    founderPortrait:"/static/img/5f236c10dc4d2e83d386048aedf9e50c.jpg",
                    inviteePortrait:"null",
                    founderHonor:{url:"/static/icon-img/honor-初出茅庐.png",title:"迷你鸡王"},
                    inviteeHonor:{url:"null",title:"null"},
                    battleId:"1",
                    founderCardId:"",
                    inviteeCardId:"null",
                    startTime:"null",
                    endTime:"null",
                    duringTime:"3天",
                    expireTime:"2018-08-02",
                    initialMoney:"",
                    founderBalance:"null",
                    inviteeBalance:"null",
                    founderRate:"null",
                    inviteeRate:"null",
                    isFocus:0
                },
                {
                    founderName:"我是长长的用户名hhhhhhhhhhhhhhhhhh",
                    inviteeName:"userB",
                    founderPortrait:"/static/img/5f236c10dc4d2e83d386048aedf9e50c.jpg",
                    inviteePortrait:"/static/img/5f236c10dc4d2e83d386048aedf9e50c.jpg",
                    founderHonor:{url:"/static/icon-img/honor-初出茅庐.png",title:"迷你鸡王"},
                    inviteeHonor:{url:"/static/icon-img/honor-初出茅庐.png",title:"迷你鸡王"},
                    battleId:"1",
                    founderCardId:"",
                    inviteeCardId:"",
                    startTime:"2018-07-20",
                    endTime:"2018-07-31",
                    initialMoney:"",
                    founderBalance:"",
                    inviteeBalance:"",
                    founderRate:1.1,
                    inviteeRate:1.2,
                    isFocus:0
                }
            ],
        showBattleSetting:false
      }
    },
    components:{
      BattleSetting,
      ButtonBar,
      Tab,
      TabItem,
      RecordList

    },
    methods:{
      battle(){
        this.out ? this.out = false : this.out = true
      },
      onItemClick(item){
        this.active=item;
        var state = (item == 1) ? 3 : ((item == 2) ? 4 : 1);
        this.getBattleList(state, "111");
      },
      getBattleList(state, userId) {
        API.getBattleList(state, userId).then(res=>{
          this.records = res;
          if(this.records.length>0) {
              Vue.set(this.records[0],'collapsed',true);
          }
        })
      },
      setBattle(msgFromSetting){
        if(msgFromSetting)
          this.showBattleSetting = true
        else
          this.showBattleSetting = msgFromSetting
      }
    },
    created() {
      this.getBattleList(3, "111");
    }
  }
</script>

<style lang="less" scoped>
  #battle-hall{
    height: 100%;
    background: white;
    .header{
      height: 15%;
      background: linear-gradient(120deg, #f77062 0%, #c7000b 100%);
      color: white;

    }
    #record-list {
        padding: 0.3rem 0.3rem 1.7rem;
        box-sizing: border-box;
        height: 13.5rem;
        overflow: scroll;
    }
    .battle-btn,.battle,.invite,.set-battle{
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
    .battle-btn{
      position: absolute;
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
      // .invite{
      //   background: yellow;
      // }
      // .set-battle{
      //   background: blue;
      // }
    }


  }
</style>
