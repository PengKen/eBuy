<template>
  <div id="record-list">
      <div id="records">
          <div class="record-item"
            v-for="(record, index) in records"
            @click="spanItem(index)"
            :class="record.collapsed　? 'item-collapsed' : ''"
            >
              <div class="item-body">
                <div v-if="curTime > record.endTime" class="stamp">已结束</div>
                <div v-if="curTime <= record.endTime" class="stamp stamp-red">进行中</div>
                  <table>
                      <tr>
                          <td>
                              <img class="avatar" :src="record.founderPortrait">
                              <img
                              class="medal"
                              :src="record.founderHonor.url">
                              <div class="item-username"
                              :class="[record.founderRate>=record.inviteeRate ? 'winner' : '']"
                              >{{record.founderName}}</div>
                          </td>
                          <td class="versus">VS</td>

                          <td>
                              <div class="item-username"
                              :class="[record.inviteeRate>=record.founderRate ? 'winner' : '']"
                              >{{record.inviteeName}}</div>
                              <img class="medal" :src="record.inviteeHonor.url">
                              <img class="avatar" :src="record.inviteePortrait">
                          </td>
                      </tr>
                      <tr>
                          <td>{{record.founderHonor.title}}</td>
                          <td>称号</td>
                          <td>{{record.inviteeHonor.title}}</td>
                      </tr>
                      <tr>
                          <td>{{record.initialMoney}}</td>
                          <td>初始资金</td>
                          <td>{{record.initialMoney}}</td>
                      </tr>
                      <tr>
                          <td>{{record.founderBalance}}</td>
                          <td>
                            <span v-if="curTime < record.endTime">当前资金</span>
                            <span v-if="curTime > record.endTime">结束资金</span>
                          </td>
                          <td>{{record.inviteeBalance}}</td>
                      </tr>
                      <tr>
                          <td>{{record.founderRate}}</td>
                          <td>收益率</td>
                          <td>{{record.inviteeRate}}</td>
                      </tr>
                  </table>
                  <div class="time">
                      <span>开始时间：{{record.startTime}}</span>
                      <span>结束时间：{{record.endTime}}</span>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<style lang="less">
    #records {
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
                      color: #e74c3c;
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
                    color: #e74c3c;
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
                    padding: 0 0.5rem;
                }
            }

        }
        .item-collapsed {
            height: 5.7rem;
            overflow: hidden;
        }

    }
</style>

<script>
  import * as API from '@/api/home'
  import getNormalTime from '@/utils/timeFormat'
  import Vue from 'vue'
  export default {
    name:'record-list',
    props:{
      records:{
        type:Array
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
        }
    }
  }

</script>
