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
        <div class="battle" @click="battle">对战</div>
        <div class="invite" :class="[out ? showInvite : '']">邀请</div>
        <div class="set-battle" :class="[out ? showBattle : '']" >摆擂台</div>
      </div>
      <button-bar class="button"></button-bar>
    </div>
</template>

<script>
  import ButtonBar from '@/components/ButtonBar'
  import RecordList from '@/components/RecordList'
  import { Tab, TabItem }  from 'vux'
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
                    founderCardId:"",
                    inviteeCardId:"",
                    startTime:"2018-07-20",
                    endTime:"2018-07-25",
                    initialMoney:"",
                    founderBalance:"",
                    inviteeBalance:"",
                    founderRate:1.1,
                    inviteeRate:1.2,
                    focus:true
                },
                {
                    founderName:"我是长长的用户名hhhhhhhhhhhhhhhhhh",
                    inviteeName:"userB",
                    founderPortrait:"/static/img/5f236c10dc4d2e83d386048aedf9e50c.jpg",
                    inviteePortrait:"/static/img/5f236c10dc4d2e83d386048aedf9e50c.jpg",
                    founderHonor:{url:"/static/icon-img/honor-初出茅庐.png",title:"迷你鸡王"},
                    inviteeHonor:{url:"/static/icon-img/honor-初出茅庐.png",title:"迷你鸡王"},
                    founderCardId:"",
                    inviteeCardId:"",
                    startTime:"2018-07-20",
                    endTime:"2018-07-29",
                    initialMoney:"",
                    founderBalance:"",
                    inviteeBalance:"",
                    founderRate:1.1,
                    inviteeRate:1.2,
                    focus:false
                }
            ]
      }
    },
    components:{
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
      }
    }
  }
</script>

<style lang="less" scoped>
  #battle-hall{
    height: 100%;
    .header{
      height: 15%;
      background: linear-gradient(-20deg, #ddd6f3 0%, #faaca8 100%, #faaca8 100%);;
      color: white;

    }
    #record-list {
        padding: 0.3rem 0.3rem 1.5rem;
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
      bottom:2rem;
      left:0;
      right: 0;
      margin: 0 auto;
      z-index: 999;
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
        background-image: linear-gradient(-60deg, #93a5cf 0%, #e4efe9 100%);
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
