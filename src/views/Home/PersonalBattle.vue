<template>
    <div id="personal-battle">
        <img class="back-arrow" src="/static/icon-img/icons8-back-26.png" @click="backHome()">
        <div id="user-info">
            <div id="portrait">
                <img class="portrait" :src="portrait"> 
            </div>
            <div id="name">{{name}}</div>
            <div id="data">
                <span class="honor">称号：{{honor}}</span>
                <span class="win-rate">胜率：{{winRate}}</span>
            </div>
        </div>
        <div id="filter">
            <span 
                v-for="option in filterOp"
                class="filter-button" 
                @click="tapFilter(option.id)"
                :class="[option.active ? selected : '']"
                >{{option.content}}</span>
        </div>
        <div id="records">
            <div class="record-item"
             v-for="(record, index) in records" 
             @click="spanItem(index)"
             :class="[record.collapsed ? 'item-collapsed' : '']"
             >
                <div class="item-head">
                    <span class="user">
                    <img class="avatar" :src="record.founderAvatar">
                    <span class="item-username winner">{{record.founderName}}</span>
                    </span>
                    <span class="versus">VS</span>
                    <span class="user">
                    <span class="item-username">{{record.inviteeName}}</span>
                    <img class="avatar" :src="record.inviteeAvatar">
                    </span>
                </div>
                <div class="item-body">
                    <table>
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
                </div>
            </div>
        </div>

    </div>
</template>

<script>
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
            selected:'selected',
            filterOp: [
                {
                    id:0,
                    content:"全部",
                    active:true,
                },
                {
                    id:1,
                    content:"1天内",
                    active:false,
                },
                {
                    id:2,
                    content:"3天内",
                    active:false,
                },
                {
                    id:3,
                    content:"7天内",
                    active:false,
                }
            ],
            records: [
                {
                    collapsed: true,
                    founderName:"userA",
                    inviteeName:"userB",
                    founderAvatar:"/static/img/5f236c10dc4d2e83d386048aedf9e50c.jpg",
                    inviteeAvatar:"/static/img/5f236c10dc4d2e83d386048aedf9e50c.jpg",
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
                    inviteeRate:1.2
                },
                {
                    collapsed : true,
                    founderName:"userA",
                    inviteeName:"userB",
                    founderAvatar:"/static/img/5f236c10dc4d2e83d386048aedf9e50c.jpg",
                    inviteeAvatar:"/static/img/5f236c10dc4d2e83d386048aedf9e50c.jpg",
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
                    inviteeRate:1.2
                }
            ]
        }
    },
    created() {
        this.userId = this.$route.query.userId;
    },
    methods:{
        backHome() {
            this.$router.push({path:"/Home"})
        },
        tapFilter(id) {
            for(let i=0; i<this.filterOp.length; i++) {
                if(this.filterOp[i].id == id)
                    this.filterOp[i].active = true;
                else
                    this.filterOp[i].active = false;
            }
        },
        spanItem(index) {
            this.records[index].collapsed = !this.records[index].collapsed
        }
    }
  }
</script>

<style lang='less' scoped>
    .back-arrow {
        position: absolute;
        left:0.5rem;
        top:0.5rem;
    }

    #user-info {
        margin-top: 1.5rem;
        margin-bottom: 0.5rem;
        .portrait {
            width: 2rem;
            height: 2rem;
            border-radius: 50%;
            border: 1px solid #bbbbbb;
            overflow: hidden;
        }
        #name {
            font-size: 0.5rem;
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
        .filter-button {
            display: inline-block;
            width: 15%;
            height: 0.7rem;
            line-height: 0.7rem;
            background: #bbbbbb;
            border-radius: 0.1rem;
            margin: 0.2rem;
        }
        .selected {
            background:#e74c3c;
        }
    }
    #records {
        padding: 0.3rem;
        .record-item {
            border-radius:0.1rem;
            margin-bottom: 0.2rem;
            border: 1px solid #bbbbbb;
            .item-head {
                width: 100%;
                height: 1rem;
                background-clip: border-box;
                .item-username {
                    font-size: 0.5rem;
                    font-weight: bold;
                }
                .winner {color: #e74c3c}
                .avatar {
                    width: 0.7rem;
                    height: 0.7rem;
                    border-radius: 50%;
                    vertical-align: middle;
                }
                .user {
                    display: inline-block;
                    width: 33.33%;
                }
                .versus {
                    display: inline-block;
                    width: 30%;
                    color: #e74c3c;
                    font-weight: bold;
                }
            }
            table{
                width: 100%;
            }
            td {
                text-align: center;
            }
            td:nth-child(2) {
                font-weight: bold;
                color: #e74c3c;
            }
        }
        .item-collapsed {
            height: 1rem;
            overflow: hidden;
        }

    }
</style>
