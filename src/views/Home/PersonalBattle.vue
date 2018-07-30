<template>
    <div id="personal-battle">
        <back-arrow></back-arrow>
        <div id="user-info">
            <div id="portrait">
                <img class="portrait" :src="portrait">
            </div>
            <div id="data">
                <div id="name">{{name}}</div>
                <span class="win-rate">胜率：{{winRate.toFixed(2)*100 + '%'}}&nbsp&nbsp&nbsp&nbsp</span>
                <span class="honor">{{honor.title}}</span>
                <img class="medal" :src="honor.url">
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
        <record-list id="record-list" :records="records"></record-list>
    </div>
</template>

<script>
  import * as API from '@/api/home'
  import RecordList from '@/components/RecordList'
  import BackArrow from '@/components/BackArrow'
  import Vue from 'vue'
  export default {
    name: "personal-battle",
    data() {
        return {
            collapsed:{
              height:'1.5rem'
            },
            userId: "1",
            name: "投资家",
            portrait: "/static/img/5f236c10dc4d2e83d386048aedf9e50c.jpg",
            honor: "吃鸡达人",
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
                }
            ]
        }
    },
    created() {
        this.userId = this.$route.query.userId;
        this.getUserRecords(this.userId, "all");
    },
    watch:{
      honor(newVal,oldVal){
        if(newVal === 2)
          this.honor = "吃鸡达人"
        else if(newVal === 1)
          this.honor = '迷你鸡王'
        else this.honor = '初出茅庐'
      }
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
            this.records = [];
            this.getUserRecords(this.userId, this.selectTime)
        },
        getUserRecords(userId, selectTime) {
          API.getPersonalBattle(userId, selectTime).then(res=>{
            this.name = res.name;
            this.portrait = res.portrait;
            this.honor = res.honor;
            this.winRate = res.winRate;
            this.records = res.records;
            if(this.records.length>0) {
                Vue.set(this.records[0],'collapsed',true);
            }
          })
        }
    },
    components:{
      RecordList,
      BackArrow
    },
  }
</script>

<style lang='less' >
    @var: 1rem;
    #personal-battle {
        height: 100%;
        overflow: hidden;
        font-size: 0.4rem;
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
            color:#c7000b;
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
            transition: all 0.3s;
        }
        .selected {
            background:#c7000b;
            transition: all 0.3s;
        }
    }
    #record-list {
        padding: 0 0.3rem;
        height: 12rem;
        overflow: scroll;
    }
</style>
