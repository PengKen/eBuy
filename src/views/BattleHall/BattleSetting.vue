<template>
  <div id="battle-setting">
    <popup
      class="pupup"

      :showClose="false"

    >
      <div class="content" slot="content">
        <h2>擂台设置</h2>
        <group label-width="5em" label-margin-right="2em" label-align="center">
          <x-number :fillable="true" :step="step" title="初始资金(万元)" align="center" v-model="battleDetail.initialMoney" button-style="round" :min="1" :max="20"><span>aaa</span></x-number>
          <x-number :fillable="true" :step="step" title="PKS时长(分钟)" align="center" v-model="battleDetail.duringTime" button-style="round" :min="1" :max="20"><span>aaa</span></x-number>
          <datetime
            :required="true"
            title="失效时间"
            placeholder="擂台失效时间"
            v-model="battleDetail.expiredTime"
            value-text-align="left"
            format="YYYY-MM-DD HH"
            :compute-hours-function="computeHoursFunction"
            :start-date="battleDetail.currentTime"
          ></datetime >


          <x-textarea
            v-if="battleSetting.situation === 'Home'"
            title="捎话"
            placeholder="呛他两句？"
            :show-counter="false"
            :rows="1"
            v-model="battleDetail.content"
          ></x-textarea>
          <button type="submit" class="comfirm-button" @click="postNewBattle">确定</button>
        </group>

      </div>
    </popup>

  </div>
</template>

<script>
import store from "@/store/index";
import popup from '@/components/popup'
import getNormalTime from '@/utils/timeFormat'
import Vue from 'vue'
import {  Group,  AlertPlugin, Datetime, XNumber,  XTextarea ,XButton } from 'vux'
import { mapGetters } from 'vuex'

import * as API from '@/api/home'
Vue.use(AlertPlugin)
  export default {
    name:'battle-setting',
    data () {
      return {
        battleDetail:{
          duringTime:6,
          initialMoney:5,
          content:null,
          expiredTime:'',
          currentTime:getNormalTime(),
          invitee:'NumberFormatException',
          content:''

        },
        currentTim:getNormalTime,
        showPopup:false,
        step:0.5,
        minHour: new Date().getHours() + 1,
      }
    },
    components:{
      popup,
      Group,
      XButton,
      Datetime,
      XNumber,
      XTextarea
    },
    computed:{
      ...mapGetters([
        'userId',
        'battleSetting'
      ])
    },
    props:{
      situation:{
        default:'BattleHall',
        type:String
      },
      challengeUser:{
        type:Number,
        default:0
      }
    },
    created() {
    },
    methods:{
      postNewBattle(){
        if(!this.battleDetail.expiredTime){
          this.$vux.alert.show({
            title: '系统提示',
            content: '<br>请设置摆擂时间',
            onShow () {
            },
            onHide () {
            }
          })
          return
        }
        let battleDetail = null
        if(this.battleSetting.situation !== 'Home'){
           battleDetail = {
            ...this.battleDetail,
            founder:this.userId,
            content:'NumberFormatException',
            initialMoney:this.battleDetail.initialMoney*10000,
            expiredTime:new Date(this.battleDetail.expiredTime + ":00:00").getTime(),
            duringTime:this.battleDetail.duringTime * 1000 * 60 //一天为86400000毫秒
          }
          API.postNewBattle(battleDetail).then(()=>{
            this.$vux.alert.show({
              title: '恭喜',
              content: '擂台已摆好，请等待应战！',
              onShow () {
              },
              onHide: ()=> {
                this.$store.dispatch('setShowPopup',false)
              }
            })
          })
        }else {
          battleDetail = {
            ...this.battleDetail,
            invitee:this.battleSetting.challengeUser,
            founder:this.userId,
            initialMoney:this.battleDetail.initialMoney*10000,
            expiredTime:new Date(this.battleDetail.expiredTime + ":00:00").getTime(),
            duringTime:this.battleDetail.duringTime * 1000 * 60 //一天为86400000毫秒
          }

          API.postNewBattle(battleDetail).then(()=>{
            this.$vux.alert.show({
              title: '恭喜',
              content: '战书已下达，请等待应战！',
              onShow () {
              },
              onHide: ()=> {
                this.$store.dispatch('setShowPopup',false)
              }
            })
          })
        }



      },
      computeHoursFunction (date, isToday, generateRange) {
        if (isToday) {
          return generateRange(new Date().getHours()+1, 23)
        } else {
          return generateRange(0, 23)
        }
      },
    }

  }
</script>

<style lang="less" scoped>
#battle-setting {
  position: relative;
  z-index: 1000;
  .pupup{
    margin-top: 30%;
    .content{
      flex:1 1 80%;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .vux-number-selector svg {
        fill: red;
      }
      .weui-cell__ft{
        .vux-cell-value{
          font-size: 1rem !important;
        }
      }
      .comfirm-button{
        margin: 0.5rem auto;
        width: 80%;
        height: 1rem;
        background: orange;
        border-radius: 0.5rem;
        font-size: 0.4rem;
      }
    }
    .weui-cells{
      .weui-cell{
        color: black;
        font-weight: 420;
        &:before{
          border: none;
        }
      }

    }
  }
}

</style>
