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
      <record-list id="record-list" :records="records"></record-list>
      <div class="battle" @click="battle">对战
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
                    inviteeHonor:"初出茅庐",
                    founderCardId:"",
                    inviteeCardId:"",
                    startTime:"2018-07-20",
                    endTime:"2018-07-25",
                    initialMoney:"",
                    founderBalance:"",
                    inviteeBalance:"",
                    founderRate:1.1,
                    inviteeRate:1.2,
                },
                {
                    founderName:"我是长长的用户名hhhhhhhhhhhhhhhhhh",
                    inviteeName:"userB",
                    founderPortrait:"/static/img/5f236c10dc4d2e83d386048aedf9e50c.jpg",
                    inviteePortrait:"/static/img/5f236c10dc4d2e83d386048aedf9e50c.jpg",
                    founderHonor:{url:"/static/icon-img/honor-初出茅庐.png",title:"迷你鸡王"},
                    inviteeHonor:"初出茅庐",
                    founderCardId:"",
                    inviteeCardId:"",
                    startTime:"2018-07-20",
                    endTime:"2018-07-29",
                    initialMoney:"",
                    founderBalance:"",
                    inviteeBalance:"",
                    founderRate:1.1,
                    inviteeRate:1.2,
                },
                {
                    founderName:"我是长长的用户名hhhhhhhhhhhhhhhhhh",
                    inviteeName:"userB",
                    founderPortrait:"/static/img/5f236c10dc4d2e83d386048aedf9e50c.jpg",
                    inviteePortrait:"/static/img/5f236c10dc4d2e83d386048aedf9e50c.jpg",
                    founderHonor:{url:"/static/icon-img/honor-初出茅庐.png",title:"迷你鸡王"},
                    inviteeHonor:"初出茅庐",
                    founderCardId:"",
                    inviteeCardId:"",
                    startTime:"2018-07-20",
                    endTime:"2018-07-29",
                    initialMoney:"",
                    founderBalance:"",
                    inviteeBalance:"",
                    founderRate:1.1,
                    inviteeRate:1.2,
                },
                {
                    founderName:"我是长长的用户名hhhhhhhhhhhhhhhhhh",
                    inviteeName:"userB",
                    founderPortrait:"/static/img/5f236c10dc4d2e83d386048aedf9e50c.jpg",
                    inviteePortrait:"/static/img/5f236c10dc4d2e83d386048aedf9e50c.jpg",
                    founderHonor:{url:"/static/icon-img/honor-初出茅庐.png",title:"迷你鸡王"},
                    inviteeHonor:"初出茅庐",
                    founderCardId:"",
                    inviteeCardId:"",
                    startTime:"2018-07-20",
                    endTime:"2018-07-29",
                    initialMoney:"",
                    founderBalance:"",
                    inviteeBalance:"",
                    founderRate:1.1,
                    inviteeRate:1.2,
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
      background: #c71717;
      color: white;

    }
    #record-list {
        padding: 0.3rem 0.3rem 0;
        height: 12rem;
        overflow: scroll;
    }
    .battle,.invite,.set-battle{
      position: relative;
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 50%;
      background: #c71717;
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
