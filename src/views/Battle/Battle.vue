<template>
    <div id="battle">
      <div v-if="challengeState == 0" class="no-battle top">您还没有参加过比赛，快去大厅看看吧</div>
      <div class="count-down-wrapper top" v-if="challengeState != 0">
        <div v-if="challengeState == 2" class="no-over">距离比赛结束还有</div>
        <div v-if="challengeState == 1" class="over">本场比赛已结束</div>
        <time-count v-if="challengeState == 2" :endTime="battleDetail.endTime.time" ></time-count>
      </div>
      <div class="zhanwei"></div>
      <div class="current" v-if="battleDetail.played == 1">
        <div class="battle-info">
          <div class="time">
            <span>开始：{{msToDate(battleDetail.startTime.time)}}</span>
            <span>结束：{{msToDate(battleDetail.endTime.time)}}</span>
          </div>
          <div class="init">初始资金：{{battleDetail.initialMoney}}元</div>
        </div>

        <div class="user-wrapper">

          <div class="user" @click="toHold(1)">
            <div class="portrait-wrapper">
              <i
                v-if=" challengeState === 1 && battleDetail.founderRate >= battleDetail.inviteeRate"
                class="icon iconfont icon-huangguantop rotate"
                :style="{color:'gold'}"></i>
              <img class="portrait" :src="battleDetail.founderPortrait"/>
            </div>
            <div class="name">{{battleDetail.founderName}}</div>
            <div class="honor">
              <img class="medal" :src="battleDetail.founderHonor.url"/>
              <span>{{battleDetail.founderHonor.title}}</span>
            </div>
            <div class="all-money" :class="battleDetail.founderRate>=0 ? 'red-font' : 'green-font'">￥<countup :start-val="battleDetail.initialMoney" :end-val="battleDetail.founderAllMoney" :duration="2" :decimals="2" ></countup></div>
            <div class="rate" >收益率：
            <span :class="battleDetail.founderRate >= 0 ? 'red-font' : 'green-font'">{{(battleDetail.founderRate*100).toFixed(2)}}%</span>
            </div>
            <div class="balance" >余额：
            <span>{{battleDetail.founderBalance.toFixed(2)}}</span>
            </div>
            <!--<div class="hold" @click="toHold(1)">持仓情况</div>-->
          </div>
          <div class="vs">VS</div>
          <div class="user" @click="toHold(2)">
            <div class="portrait-wrapper">
              <i
                v-if=" challengeState === 1 && battleDetail.founderRate < battleDetail.inviteeRate"
                class="icon iconfont icon-huangguantop rotate"
                :style="{color:'gold'}"></i>
              <img class="portrait" :src="battleDetail.inviteePortrait"/>
            </div>
            <div class="name">{{battleDetail.inviteeName}}</div>
            <div class="honor">
              <span>{{battleDetail.inviteeHonor.title}}</span>
              <img class="medal" :src="battleDetail.inviteeHonor.url"/>
            </div>
            <div class="all-money" :class="battleDetail.inviteeRate>=0 ? 'red-font' : 'green-font'">￥<countup :start-val="battleDetail.initialMoney" :end-val="battleDetail.inviteeAllMoney" :duration="2" :decimals="2" ></countup>
            </div>

            <div class="rate">收益率：
            <span :class="battleDetail.inviteeRate>=0 ? 'red-font' : 'green-font'">{{(battleDetail.inviteeRate*100).toFixed(2)}}%</span>
            </div>
            <div class="balance" >余额：
            <span>{{battleDetail.inviteeBalance.toFixed(2)}}</span>
            </div>
            <!--<div class="hold" @click="toHold(2)">持仓情况</div>-->
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
  box-sizing: border-box;
  padding-bottom: 1.5rem;
  font-size: 0.4rem;
  background: #f9f9f9;
  min-height: 100%;
  .top {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    height: 1.5rem;
    .over {
      line-height: 1.5rem;
    }
    .no-over {
      line-height: 0.7rem;
    }
  }
  .no-battle {
    background: linear-gradient(120deg, #f77062 0%, #c7000b 100%);
    color: white;
    line-height: 1.5rem;
  }
  .count-down-wrapper {
    background: linear-gradient(120deg, #f77062 0%, #c7000b 100%);
    color: white;
    // line-height: 1.5rem;
  }
  .zhanwei {
    height: 1.5rem;
  }
  .current {
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
        .portrait-wrapper{
          position: relative;
          .rotate{
            transform: rotate(-30deg);
            position:absolute;
            top: 0;

            line-height: 0;
            font-size: 1.5em !important;

          }
        }

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
        .all-money {
          font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
          font-size: 0.5rem;
          // color: #ee3333;
        }
      }
    }
  }

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
import { Countup } from 'vux'
export default {
  name: "battle",
  components: {
    ProductList,
    TimeCount,
    Countup
  },
  data() {
    return {
      curTime: new Date().getTime(),
      battleDetail: {},
      products:[],
      intervalId:0,
      flagId:0
    }
  },
  activated(){
    this.getCurrentBattle(this.userId);
    /*
      进入该页面时要重新计算用户的持仓等信息
     */
  },
  methods: {
    msToDate(ms) {
      return DF.msToDate(ms);
    },
    refresh() {
      this.intervalId = setInterval(()=>{
        this.getCurrentBattle(this.userId);
        }, 20000)
    },
    getCurrentBattle(userId) {
      API.getCurrentBattle(userId).then(res=>{
        this.$store.commit('setChallengeState',res.challengeState)
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
      'userId',
      'challengeState'
    ])
  },
  beforeDestroy() {
    clearInterval(this.intervalId)
  },
  created() {
    API.getCurrentBattle(this.userId).then(res=>{
      this.$store.commit('setChallengeState',res.challengeState)
      if(res.played == 1) {
        this.battleDetail = res;
      }else{
        this.battleDetail.played = 0
      }
      if(this.battleDetail.endTime.time < new Date().getTime()) {
        console.log('over')
        this.flag = false
      }else {
        this.refresh()
      }
    })
  }
};
</script>
