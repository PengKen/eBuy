<template>
    <div id="battle">
      <div v-if="battleDetail.played == 0" class="no-battle">您还没有参加过比赛，快去大厅看看吧</div>
      <div class="current" v-if="battleDetail.played == 1">
        <div class="count-down-wrapper">
          <div>{{battleDetail.endTime.time > new Date().getTime() ? '距离比赛结束还有' : '本场比赛已结束'}}</div>
          <time-count v-if="battleDetail.endTime.time > new Date().getTime()" :endTime="battleDetail.endTime.time" ></time-count>
        </div>
        <div class="battle-info">
          <div class="time">
            <span>开始：{{msToDate(battleDetail.startTime.time)}}</span>
            <span>结束：{{msToDate(battleDetail.endTime.time)}}</span>
          </div>
          <div class="init">初始资金：{{battleDetail.initialMoney}}元</div>
        </div>

        <div class="user-wrapper">
          <div class="refresh" @click="clickFresh()" :style="flag ? 'color: #666' : ''" >刷新</div>
          <div class="user">
            <div><img class="portrait" :src="battleDetail.founderPortrait"/></div>
            <div class="name">{{battleDetail.founderName}}</div>
            <div class="honor">
              <img class="medal" :src="battleDetail.founderHonor.url"/>
              <span>{{battleDetail.founderHonor.title}}</span>
            </div>
            <div class="all-money">总资产：{{(battleDetail.founderAllMoney).toFixed(2)}}</div>
            <div class="rate" >收益率：
            <span :class="battleDetail.founderRate>=0 ? 'red-font' : 'green-font'">{{(battleDetail.founderRate*100).toFixed(2)}}%</span>
            </div>
            <div class="balance" >余额：
            <span>{{battleDetail.founderBalance.toFixed(2)}}</span>
            </div>
            <div class="hold" @click="toHold(1)">持仓情况</div>
          </div>
          <div class="vs">VS</div>
          <div class="user">
            <div><img class="portrait" :src="battleDetail.inviteePortrait"/></div>
            <div class="name">{{battleDetail.inviteeName}}</div>
            <div class="honor">
              <span>{{battleDetail.inviteeHonor.title}}</span>
              <img class="medal" :src="battleDetail.inviteeHonor.url"/>
            </div>
            <div class="all-money">总资产：{{(battleDetail.inviteeAllMoney).toFixed(2)}}</div>
            <div class="rate">收益率：
            <span :class="battleDetail.inviteeRate>=0 ? 'red-font' : 'green-font'">{{(battleDetail.inviteeRate*100).toFixed(2)}}%</span>
            </div>
            <div class="balance" >余额：
            <span>{{battleDetail.inviteeBalance.toFixed(2)}}</span>
            </div>
            <div class="hold" @click="toHold(2)">持仓情况</div>
          </div>
        </div>
      </div>

       <product-list id="product-list"></product-list>




    </div>
</template>

<style lang="less" scoped>
#battle {
  // height: 100%;
  // overflow: hidden;
  padding-bottom: 1.5rem;
  font-size: 0.4rem;
  background: #f9f9f9;
  .no-battle {
    background: linear-gradient(120deg, #f77062 0%, #c7000b 100%);
    color: white;
    padding: 0.2rem;
  }
  .current {
    .count-down-wrapper {
      background: linear-gradient(120deg, #f77062 0%, #c7000b 100%);
      color: white;
      padding: 0.2rem;
    }
    .battle-info {
      // background: #f9f9f9;
      padding-top: 0.2rem;
      .time {
        display: flex;
        justify-content: space-around;
        font-size: 0.35rem;
        color: #888888;
      }
      .init {
        color: #c7000b;
      }
    }
    .user-wrapper {
      display: flex;
      padding: 0.2rem;
      // align-items: center;
      // background: #f9f9f9;
      .vs {
        font-size: 1rem;
        font-weight: bold;
        color: #c7000b;
        margin: 0 -0.5rem;
        z-index: 10;
        line-height: 2.5rem;
      }
      .user {
        flex: 1;
        overflow: hidden;
        margin: 0 0.2rem 0.2rem;
        padding: 0.3rem;
        // border: 1px solid #eeeeee;
        border-radius: 0.2rem;
        // background: #f5f5f5;
        .portrait {
          width: 1.5rem;
          height: 1.5rem;
          border-radius: 50%;
          border: 0.1rem solid #ee3333;
        }
        .honor {
          padding-bottom: 0.2rem;
          .medal {
            width: 0.5rem;
            height: 0.5rem;
            vertical-align: middle;
          }
          span {
            vertical-align: middle;
          }
        }
        .name {
          font-size: 0.5rem;
          white-space: nowrap;
          overflow: hidden;
          width: 7em;
          margin: 0 auto;
        }
        .red-font {
          color: #ee3333
        }
        .green-font {
          color: #44bb66
        }
        .hold {
          color: #888888;
          text-decoration: underline;
          font-size: 0.35rem;
        }
      }
    }
    .refresh {
      font-size: 0.3rem;
      width: 3em;
      margin: 0 0.3rem 0 auto;
      color: #bbbbbb;
      position: absolute;
      right: 0;
    }
  }

  // #product-list {
  //   height: 19rem;
  //   overflow: scroll
  // }
}
</style>

<script>
import store from "@/store/index";
import * as API from '@/api/battle/battle'
import ProductList from './ProductList'
import * as DF from "@/utils/timeFormat";
import TimeCount from '@/components/timeCountDown'
import { setInterval, clearInterval } from 'timers';
import { mapGetters } from 'vuex'
export default {
  name: "battle",
  components: {
    ProductList,
    TimeCount
  },
  data() {
    return {

      // userId: 555,
      curTime: new Date().getTime(),
      battleDetail: {
        played:1,
        battleId:0,
        startTime: {time:86400000},
        endTime: {time:86400000},
        initialMoney: 100000,
        founderId:111,
        inviteeId:222,
        founderName:"我是长长的用户名hhhhhhhhhhhhhhhhhh",
        inviteeName:"userB",
        founderPortrait:"/static/img/5f236c10dc4d2e83d386048aedf9e50c.jpg",
        inviteePortrait:"/static/img/5f236c10dc4d2e83d386048aedf9e50c.jpg",
        founderHonor:{url:"/static/icon-img/honor-初出茅庐.png",title:"迷你鸡王"},
        inviteeHonor:{url:"/static/icon-img/honor-初出茅庐.png",title:"迷你鸡王"},
        founderAllMoney:123123,
        inviteeAllMoney:312321,
        founderBalance:123123,
        inviteeBalance:32321,
        founderRate:0.1122,
        inviteeRate:0.2321,
      },
      products:[],
      intervalId:0,
      flag: true,
      flagId:0
    }
  },
  methods: {
    msToDate(ms) {
      return DF.msToDate(ms);
    },
    clickFresh() {
      if(this.flag==true) {
        this.getCurrentBattle(this.userId);
        this.flag = false;
        clearInterval(this.flagId)
        this.flagId = setInterval(()=>{this.flag = true}, 5000)
      }
    },
    refresh() {
      this.intervalId = setInterval(()=>{
        this.getCurrentBattle(this.userId);
        }, 10000)
    },
    getCurrentBattle(userId) {
      API.getCurrentBattle(userId).then(res=>{
        if(res.played == 1) {
          this.battleDetail = res;
        }else{
          this.battleDetail.played = 0
        }

      })
    },
    toHold(user) {
      // console.log("持仓："+userId);

      var userId = user==1 ? this.battleDetail.founderId : this.battleDetail.inviteeId
      var name = user==1 ? this.battleDetail.founderName : this.battleDetail.inviteeName
      this.$router.push({ path:'/battle/accountinfo' , query:{userId: userId, name: name}})
    }
  },
  computed:{
    ...mapGetters([
      'userId'
    ])
  },
  mounted() {
    this.refresh()

  },
  beforeDestroy() {
    clearInterval(this.intervalId)
  },
  created() {
    this.getCurrentBattle(this.userId);

  }
};
</script>
