<template>
    <div id="personal-battle">
        <img class="back-arrow" src="/static/icon-img/icons8-back-26.png" @click="back()">
        <div id="user-info">
            <div id="portrait">
                <img class="portrait" :src="portrait"> 
            </div>
            <div id="data">
                <div id="name">{{name}}</div>
                <span class="win-rate">胜率：{{winRate}}&nbsp&nbsp&nbsp&nbsp</span>
                <span class="honor">{{honor}}</span>
                <img class="medal" :src="'/static/icon-img/honor-'+honor+'.png'">
            </div>
        </div>
        <div id="filter">
            <span 
                v-for="option in filterOp"
                class="filter-button" 
                @click="tapFilter(option.id)"
                :class="[option.active ? 'selected' : '']"
                >{{option.content}}</span>
        </div>
        <div id="records">
            <div class="record-item"
             v-for="(record, index) in records" 
             @click="spanItem(index)"
             :class="record.collapsed || record.collapsed == undefined ? 'item-collapsed' : ''"
             >
                <div class="item-body">
                  <div v-if="curTime > record.endTime" class="stamp">已结束</div>
                    <table>
                        <tr>
                            <td>
                                <img class="avatar" :src="record.founderPortrait">
                                <img 
                                class="medal" 
                                :src="record.founderHonor.url">
                                <div class="item-username right" 
                                :class="[record.founderRate>=record.inviteeRate ? 'winner' : '']"
                                >{{record.founderName}}</div>
                            </td>
                            <td class="versus">VS</td>
                            
                            <td>
                                <div class="item-username left" 
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
                            <td>结束资金</td>
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

<script>
  import * as API from '@/api/home'
  import getNormalTime from '@/utils/timeFormat'
  import Vue from 'vue'
  export default {
    name: "personal-battle",
    data() {
        return {
            userId: 1,
            name: "投资家",
            portrait: "/static/img/5f236c10dc4d2e83d386048aedf9e50c.jpg",
            honor: "吃鸡达人",
            winRate: 0.8,
            selectTime: "all",
            curTime:"",
            filterOp: [
                {
                    id:"all",
                    content:"全部",
                    active:true,
                },
                {
                    id:"1",
                    content:"1天内",
                    active:false,
                },
                {
                    id:"3",
                    content:"3天内",
                    active:false,
                },
                {
                    id:"7",
                    content:"7天内",
                    active:false,
                }
            ],
            records: [
                {
                    collapsed: false,
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
                    collapsed : true,
                    founderName:"userA",
                    inviteeName:"userB",
                    founderPortrait:"/static/img/5f236c10dc4d2e83d386048aedf9e50c.jpg",
                    inviteePortrait:"/static/img/5f236c10dc4d2e83d386048aedf9e50c.jpg",
                    founderHonor:"吃鸡达人",
                    inviteeHonor:"初出茅庐",
                    founderCardId:"",
                    inviteeCardId:"",
                    startTime:"2018-07-20",
                    endTime:"2018-07-25",
                    initialMoney:"",
                    founderBalance:"",
                    inviteeBalance:"",
                    founderRate:1.1,
                    inviteeRate:1.0,
                },
                {
                    collapsed : true,
                    founderName:"userA",
                    inviteeName:"userB",
                    founderPortrait:"/static/img/5f236c10dc4d2e83d386048aedf9e50c.jpg",
                    inviteePortrait:"/static/img/5f236c10dc4d2e83d386048aedf9e50c.jpg",
                    founderHonor:"初出茅庐",
                    inviteeHonor:"迷你鸡王",
                    founderCardId:"",
                    inviteeCardId:"",
                    startTime:"2018-07-20",
                    endTime:"2018-07-23",
                    initialMoney:"",
                    founderBalance:"",
                    inviteeBalance:"",
                    founderRate:1.1,
                    inviteeRate:1.2,
                },
                {
                    collapsed : true,
                    founderName:"userA",
                    inviteeName:"userB",
                    founderPortrait:"/static/img/5f236c10dc4d2e83d386048aedf9e50c.jpg",
                    inviteePortrait:"/static/img/5f236c10dc4d2e83d386048aedf9e50c.jpg",
                    founderHonor:"迷你鸡王",
                    inviteeHonor:"吃鸡达人",
                    founderCardId:"",
                    inviteeCardId:"",
                    startTime:"",
                    endTime:"",
                    initialMoney:"",
                    founderBalance:"",
                    inviteeBalance:"",
                    founderRate:1.1,
                    inviteeRate:1.2,
                }
            ]
        }
    },
    created() {
        this.userId = this.$route.query.userId;
        this.getUserRecords(this.userId, "all");
        this.curTime = getNormalTime;
    },
    methods:{
        back() {
            this.$router.go(-1);
        },
        tapFilter(id) {
            for(let i=0; i<this.filterOp.length; i++) {
                if(this.filterOp[i].id == id){
                    this.filterOp[i].active = true;
                    this.selectTime = id;
                }
                else
                    this.filterOp[i].active = false;
            }
            this.records = {};
            this.getUserRecords(this.userId, this.selectTime)
        },
        spanItem(index) {
            if(this.records[index].collapsed == undefined)
              Vue.set(this.records[index],'collapsed',false);
            else if(!this.records[index].collapsed){
              Vue.set(this.records[index],'collapsed',true);
            }
            else
              Vue.set(this.records[index],'collapsed',false);
        }, 
        getUserRecords(userId, selectTime) {
          API.getPersonalBattle(userId, selectTime).then(res=>{
            this.name = res.name;
            this.portrait = res.portrait;
            this.honor = res.honor;
            this.winRate = res.winRate;
            this.records = res.records;
          })
        }
    }
    
  }
</script>

<style lang='less' scoped>
    #personal-battle {
        height: 100%;
        overflow: hidden;
        font-size: 0.4rem;
    }

    .back-arrow {
        position: absolute;
        left:0.5rem;
        top:0.5rem;
    }
    .medal {
      width: 0.5rem;
      height: 0.5rem;
      vertical-align: middle;
    }
    #user-info {
        height: 10%;
        padding-top: 1.5rem;
        padding-bottom: 0.5rem;
        background-image: linear-gradient(-20deg, #ddd6f3 0%, #faaca8 100%, #faaca8 100%);
        box-shadow: 0 2px 5px #aaaaaa;
        #portrait, #data {
            display: inline-block;
            vertical-align: middle;
        }
        .portrait {
            width: 1.5rem;
            height: 1.5rem;
            margin-right: 0.5rem;
            border-radius: 50%;
            border: 0.05rem solid white;
            overflow: hidden;
        }
        #data {
            text-align: left;
        }
        #name {
            font-size: 0.5rem;
            font-weight: bold;
        }
        .honor {
            color:#e74c3c;
            vertical-align: middle;
            // margin-right: 0.5rem;
        }
        .win-rate {
            color:#2980b9;
            vertical-align: middle;
        }

    }
    #filter {
        padding: 0.5rem 0;
        height: 5%;
        .filter-button {
            display: inline-block;
            width: 20%;
            height: 0.8rem;
            line-height: 0.8rem;
            background: #bbbbbb;
            border-radius: 0.1rem;
            margin: 0.1rem;
            color: white;
            font-size: 0.4rem;
        }
        .selected {
            background:#e74c3c;
        }
    }
    #records {
        padding: 0 0.3rem;
        height: 12rem;
        overflow: scroll;
        .record-item {
            border-radius:0.1rem;
            margin-bottom: 0.2rem;
            overflow: hidden;
            background: #f2f2f2;
            position: relative;
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
              border: 3px solid #aaaaaa;
              opacity: 0.3;
              // transform: translateX(-1rem);
              transform: rotate(20deg);
              z-index: 1;
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
            height: 1.5rem;
            overflow: hidden;
        }

    }
</style>
