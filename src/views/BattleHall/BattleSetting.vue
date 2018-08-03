<template>
  <div id="battle-setting">
    <popup
      class="pupup"
      :isShow="showBattleSetting"
      @hidePopUp="hidePopUp"
      :showClose="false"
      @notifySetting="hidePopUp"
    >
      <div class="content" slot="content">
        <h2>擂台设置</h2>
        <group label-width="5em" label-margin-right="2em" label-align="center">
          <x-number :fillable="true" :step="step" title="初始资金(万元)" align="center" v-model="battleDetail.initialMoney" button-style="round" :min="1" :max="20"><span>aaa</span></x-number>
          <x-number :fillable="true" :step="step" title="PKS时长(天)" align="center" v-model="battleDetail.duringTime" button-style="round" :min="1" :max="20"><span>aaa</span></x-number>
          <datetime
            :required="true"
            title="摆擂时长"
            placeholder="擂台失效时间"
            v-model="battleDetail.expiredTime"
            value-text-align="left"
            format="YYYY-MM-DD HH"
            :min-hour="minHour"
            :start-date="battleDetail.currentTime"
            :min-year="new Date().getFullYear()"
          ></datetime >


          <x-textarea
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
import popup from '@/components/popup'
import getNormalTime from '@/utils/timeFormat'
import Vue from 'vue'
import {  Group,  AlertPlugin, Datetime, XNumber,  XTextarea ,XButton } from 'vux'

import * as API from '@/api/home'
Vue.use(AlertPlugin)
  export default {
    name:'battle-setting',
    data () {
      return {
        battleDetail:{
          duringTime:6,
          initialMoney:5,
          invitee:null,
          content:null,
          expiredTime:'',
          currentTime:getNormalTime,
        },
        step:0.5,
        minHour: new Date().getHours(),
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
    props:{
      showBattleSetting:{
        type:Boolean,
        default:false
      }
    },
    methods:{
      hidePopUp(){
        this.$emit('update:showBattleSetting',false)

      },
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
        const battleDetail = {
          ...this.battleDetail,
          founder:123,
          initialMoney:this.battleDetail.initialMoney*10000,
          expiredTime:new Date(this.battleDetail.expiredTime + ":00:00").getTime(),
          duringTime:this.battleDetail.duringTime * 86400000 //一天为86400000毫秒
        }
        API.postNewBattle(battleDetail).then(()=>{
          this.$vux.alert.show({
            title: '恭喜',
            content: '战书已下达，请等待对方应战！',
            onShow () {
            },
            onHide: ()=> {
              this.showBattleSetting = false
            }
          })
        })
      }
    }

  }
</script>

<style lang="less" scoped>
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
</style>
