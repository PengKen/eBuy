<template>
    <div id="personal-battle">
        <img class="back-arrow" src="/static/icon-img/icons8-back-26.png" @click="backHome()">
        <div id="user-info">
            <div id="portrait">
                <img class="portrait" :src="portrait"> 
            </div>
            <div id="data">
                <div id="name">{{name}}</div>
                <span class="honor">称号：{{honor}}</span>
                <span class="win-rate">胜率：{{winRate}}</span>
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
             :class="[record.collapsed  ? 'item-collapsed' : '']"
             >
                <div class="item-body">
                    <table>
                        <tr>
                            <td>
                                <img class="avatar" :src="record.founderPortrait">
                                <div class="item-username" 
                                :class="[record.founderRate>=record.inviteeRate ? 'winner' : '']"
                                >{{record.founderName}}</div>
                            </td>
                            <td class="versus">VS</td>
                            <td>
                                <img class="avatar" :src="record.inviteePortrait">
                                <div class="item-username" 
                                :class="[record.inviteeRate>=record.founderRate ? 'winner' : '']"
                                >{{record.inviteeName}}</div>
                            </td>
                        </tr>
                        <tr>
                            <td>{{record.founderHonor}}</td>
                            <td>称号</td>
                            <td>{{record.inviteeHonor}}</td>
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
  export default {
    name: "personal-battle",
    data() {
        return {
            userId: 1,
            name: "投资家",
            portrait: "/static/img/5f236c10dc4d2e83d386048aedf9e50c.jpg",
            honor: "大师",
            winRate: 0.8,
            selectTime: "all",
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
                    founderHonor:"",
                    inviteeHonor:"",
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
                    founderHonor:"",
                    inviteeHonor:"",
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
                    founderHonor:"",
                    inviteeHonor:"",
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
                    founderHonor:"",
                    inviteeHonor:"",
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
    },
    methods:{
        backHome() {
            this.$router.push({path:"/Home"})
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
            this.getUserRecords(this.userId, this.selectTime)
        },
        spanItem(index) {
            this.records[index]['collapsed'] ?  this.records[index]['collapsed']=false : this.records[index]['collapsed']=true;
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
        font-size: 0.4rem;
    }

    .back-arrow {
        position: absolute;
        left:0.5rem;
        top:0.5rem;
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
            margin-right: 0.5rem;
        }
        .win-rate {
            color:#2980b9;
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
                }
                tr:nth-child(2n) {
                    background: #ffeff2;
                }
                tr:nth-child(2n+3) {
                    background: #f9f9f9;
                }
                td {
                    text-align: center;
                    border: none;
                }
                td:first-child, td:nth-child(3) {
                    width: 40%;
                }
                td:nth-child(2) {
                    color: #e74c3c;
                    width: 20%;
                }
                .item-username {
                    width: 90%;
                    text-align: center;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    margin: 0 auto;
                }
                .winner {color: #e74c3c}
                .avatar {
                    width: 0.7rem;
                    height: 0.7rem;
                    margin-top: 0.1rem;
                    border-radius: 50%;
                    vertical-align: middle;
                }
                .versus {
                    line-height: 1.5rem;
                    font-size: 0.6rem;
                }
            }
            .time {
                height: 1rem;
                line-height: 1rem;
                font-size: 0.3rem;
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
