<template>
    <div id="my-battles">
        <nav-bar :title="'我的比赛'"></nav-bar>
        <div id="filter">
            <span
                v-for="option in filterOp"
                class="filter-button"
                @click="tapFilter(option.id)"
                :class="[option.active ? 'selected' : '']"
                >{{option.content}}</span>
        </div>
        <div class="records"><record-list id="record-list" :records="records" :showBtn=false></record-list></div>
    </div>
</template>

<script>
  import * as API from '@/api/my'
  import RecordList from '@/components/RecordList'
  import NavBar from '@/components/NavBar'
  import Vue from 'vue'
  import { mapGetters } from 'vuex'
  export default {
    name: "myBattles",
    data() {
        return {

            state: "3",
            filterOp: [
                {
                    id:"3",
                    content:"进行中",
                    active:true,
                },
                {
                    id:"1",
                    content:"未开始",
                    active:false,
                },
                {
                    id:"4",
                    content:"已结束",
                    active:false,
                },
                {
                    id:"2",
                    content:"已失效",
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

        this.getUserRecords(this.userId, this.state);
    },
    methods:{
        tapFilter(id) {
            for(let i=0; i<this.filterOp.length; i++) {
                if(this.filterOp[i].id == id){
                    this.filterOp[i].active = true;
                    this.state = id;
                }
                else
                    this.filterOp[i].active = false;
            }
            this.records = [];
            this.getUserRecords(this.userId, this.state)
        },
        getUserRecords(userId, state) {
          API.getMyBattles(userId, state).then(res=>{
            this.records = res;
            if(this.records.length>0) {
                Vue.set(this.records[0],'collapsed',true);
            }
          })
        }
    },
    components:{
      RecordList,
      NavBar
    },
    computed:{
      ...mapGetters([
        'userId'
      ])
    }
  }
</script>

<style lang='less' >
    #my-battles {
        font-size: 0.4rem;
        background: white;
        .records {
            padding: 0 0.3rem;
        }
    }
    .medal {
      width: 0.5rem;
      height: 0.5rem;
      vertical-align: middle;
    }
    h1 {
        color: #c7000b;
        margin-top: 0.5rem;
        font-size: 0.5rem;
    }
    #filter {
        padding: 0.5rem 0;
        padding-top: 2rem;
        height: 5%;
        background: white;
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

</style>
