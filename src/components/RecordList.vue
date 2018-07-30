<template>
  <div id="record-list">
      <div id="records">
          <div class="record-item"
            v-for="(record, index) in records"
            @click="spanItem(index)"
            :class="collapsedClass(index)">
              <div class="item-body">
                <div v-if="showStamp && curTime > msToDate(record.endTime.time)" class="stamp">已结束</div>
                <div v-if="showStamp && curTime <= msToDate(record.endTime.time)" class="stamp stamp-red">进行中</div>
                  <table>
                      <tr>
                          <td>
                              <img class="avatar" :src="record.founderPortrait">
                              <img
                              class="medal"
                              :src="record.founderHonor.url">
                              <div class="item-username"
                              :class="[record.inviteeName != 'null' && record.founderRate>=record.inviteeRate ? 'winner' : '']"
                              >{{record.founderName}}</div>
                          </td>
                          <td class="versus">VS</td>

                          <td>
                              <div class="item-username"
                              :class="[record.inviteeName != 'null' && record.inviteeRate>=record.founderRate ? 'winner' : '']"
                              >{{!record.inviteeName ? '??' : record.inviteeName}}</div>
                              <img class="medal" :src="!record.inviteeHonor ? '/static/icon-img/icons8-question-mark-filled-50.png' : record.inviteeHonor.url">
                              <img class="avatar" 
                              :src="!record.inviteePortrait ? '/static/icon-img/icons8-question-mark-64.png' : record.inviteePortrait">
                          </td>
                      </tr>
                      <tr>
                          <td>{{record.founderHonor.title}}</td>
                          <td>称号</td>
                          <td>{{!record.inviteeHonor ? '- -' : record.inviteeHonor.title}}</td>
                      </tr>
                      <tr>
                          <td>{{record.initialMoney}}</td>
                          <td>初始资金</td>
                          <td>{{record.initialMoney}}</td>
                      </tr>
                      <tr>
                          <td>{{!record.founderBalance ? '- -' : record.founderBalance}}</td>
                          <td>
                            <span v-if="curTime < record.endTime || !record.endTime">当前资金</span>
                            <span v-if="curTime > record.endTime">结束资金</span>
                          </td>
                          <td>{{!record.inviteeBalance ? '- -' : record.inviteeBalance}}</td>
                      </tr>
                      <tr>
                          <td>{{!record.founderRate ? '- -' : record.founderRate}}</td>
                          <td>收益率</td>
                          <td>{{!record.inviteeRate ? '- -' : record.inviteeRate}}</td>
                      </tr>
                  </table>
                  <div class="time" v-if="record.inviteeName">
                      <span>开始时间：{{msToDate(record.startTime.time)}}</span>
                      <span>结束时间：{{msToDate(record.endTime.time)}}</span>
                  </div>
                  <div class="time" v-if="!record.inviteeName">
                      <span>PK时长：{{record.duringTime.time / 86400000}}</span>
                      <span>失效时间：{{msToDate(record.expiredTime.time)}}</span>
                  </div>
                  <div v-if="record.startTime && showBtn && curTime <= msToDate(record.endTime.time)">
                    <div class="focus" :class="record.isFocus==1 ? 'btn-grey' : ''" @click.stop="focus(record.isFocus, index)">{{record.isFocus==1 ? '已关注' : '关注比赛进程'}}</div>
                  </div>
                  <div class="battle-btn" 
                  v-if="!record.startTime"
                  @click.stop="acceptBattle(index)">应战</div>
              </div>
          </div>
      </div>
      <div id="no-record" v-if="records.length == 0">----- 暂时没有记录哦 -----</div>
  </div>
</template>

<style lang="less">
    #record-list {
        font-size: 0.4rem;
        .record-item {
          font-size: 0.4rem;
          transition: all 500ms;
            border-radius:0.1rem;
            margin-bottom: 0.2rem;
            overflow: hidden;
            background: #f2f2f2;
            position: relative;
            height: 1.5rem;
            .medal {
              width: 0.5rem;
              height: 0.5rem;
              vertical-align: middle;
            }
            .stamp {
              font-size: 0.45rem;
              font-weight: bold;
              line-height: 0.8rem;
              color: #aaaaaa;
              width: 2rem;
              height: 0.8rem;
              position: absolute;
              display: inline-block;
              left: 50%;
              top: 0.4rem;
              border: 3px solid #aaaaaa;
              opacity: 0.3;
              // transform: translateX(-1rem);
              transform: rotate(20deg);
              z-index: 1;
            }
            .stamp-red {
              color: #f87;
              border-color: #f87;
            }
            table{
                border-radius:0.1rem;
                overflow: hidden;
                width: 100%;
                table-layout: fixed;
                border-collapse: collapse;
                tr:nth-child(n+1) {
                    height: 0.8rem;
                }
                tr:first-child {
                    height: 1.5rem;
                    // font-weight: bold;
                    overflow: hidden;
                    .item-username {
                        // width: 90%;
                        // text-align: center;
                        width: 50%;
                        text-align: center;
                        display: inline-block;
                        vertical-align: middle;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        color: #888888;
                        // margin: 0 auto;
                    }
                    .winner {
                      color: #c7000b;
                      text-shadow:0 0 0.2em #f87,
                                  0 0 0.3em #f87;
                    }
                    .avatar {
                        width: 0.7rem;
                        height: 0.7rem;
                        margin-top: 0.1rem;
                        border-radius: 50%;
                        vertical-align: middle;
                        margin: 0 0.1rem;
                    }
                    .versus {
                        color: #34495e;
                        line-height: 1.5rem;
                        font-size: 0.6rem;
                    }
                }
                tr:nth-child(2n) {
                    background: #ffeff2;
                }
                tr:nth-child(2n+3) {
                    background: #f9f9f9;
                }
                td {
                    text-align: center;
                    position: relative;
                    z-index: 2;
                }
                td:first-child, td:nth-child(3) {
                    width: 40%;
                }
                // td:first-child {text-align: right}
                // td:nth-child(3) {text-align: left}
                td:nth-child(2) {
                    color: #c7000b;
                    width: 20%;
                    font-weight: bold;
                }
                // .left {text-align: left}
                // .right {text-align: right;}
            }
            .time {
                height: 1rem;
                line-height: 1rem;
                font-size: 0.35rem;
                span {
                    display: inline-block;
                    width: 49%;
                }
            }
            .focus {
              height: 1rem;
              line-height: 1rem;
              // border: 2px solid #c7000b;
              background: #ffb86c;
              color: white;
              border-radius: 0.1rem;
              box-sizing: border-box;
              transition: background-color 0.5s;
            }
            .btn-grey {
              background: #bbbbbb;
              // color: #2c3e50;
              // transition: background-color 0.5s;
            }
            .battle-btn {
              height: 1rem;
              line-height: 1rem;
              // border: 2px solid #c7000b;
              background: #f77062;
              color: white;
              border-radius: 0.1rem;
              box-sizing: border-box;
              transition: background-color 0.5s;
            }

        }
        .item-collapsed-long {
            height: 6.7rem;
            overflow: hidden;
        }
        .item-collapsed-short {
            height: 5.7rem;
            overflow: hidden;
        }
    }
</style>

<script>
  import * as API from '@/api/home'
  import * as APIHALL from '@/api/hall'
  import getNormalTime from '@/utils/timeFormat'
  import * as DF from '@/utils/timeFormat'
  import Vue from 'vue'
  import { Toast } from 'vux'

  export default {
    name:'record-list',
    props:{
      records:{
        type:Array
      },
      showStamp:{
        type:Boolean,
        default:true
      },
      showBtn: {
        type: Boolean,
        default: true
      }
    },
    created() {
    },
    computed:{
      curTime(){
        return getNormalTime;
      }
    },
    methods:{
        spanItem(index) {
            if(!this.records[index].collapsed){
              Vue.set(this.records[index],'collapsed',true);
            }
            else
              Vue.set(this.records[index],'collapsed',false);
        },
        focus(isFocus, index) {
          if(isFocus == 0) { // 关注
            var focusInfo = {userId: 111, battleId:this.records[index].battleId};
                APIHALL.postInsertFocus(focusInfo).then(()=>{
                Vue.set(this.records[index],'isFocus',1);
                this.$vux.toast.text('关注成功', 'top')
            })
          }
          else { // 取消关注
                APIHALL.deleteFocus(111, this.records[index].battleId).then(()=>{
                Vue.set(this.records[index],'isFocus',0);
                this.$vux.toast.text('取消关注成功', 'top')
            })
          }
        },
        acceptBattle(index) {
          this.$vux.toast.text('应战'+index, 'top')
        },
        collapsedClass: function(index){
          if(!this.records[index].collapsed)
            return ""
          else if(!this.records[index].startTime || this.showBtn && getNormalTime <= this.msToDate(this.records[index].endTime.time))
            return "item-collapsed-long"
          else
            return "item-collapsed-short"
        },
        msToDate(ms) {
          return DF.msToDate(ms);
        }
    },
    components: {
      Toast,
    }
  }

</script>
