<template>
    <div id="my-battles">
        <back-arrow></back-arrow>
        <h1>我的比赛</h1>
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
  import store from "@/store/index";
  import * as API from '@/api/my'
  import RecordList from '@/components/RecordList'
  import BackArrow from '@/components/BackArrow'
  import Vue from 'vue'
  export default {
    name: "myBattles",
    data() {
        return {
            userId: 111,
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
        this.userId = store.state.userId;
        this.getUserRecords(this.userId, "all");
        console.log("created")
    },
    methods:{
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
          API.getMyBattles(userId, selectTime).then(res=>{
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
    destoryed () {
      console.log("i am destory")
    }
  }
</script>

<style lang='less' >
    #my-battles {
        height: 100%;
        overflow: hidden;
        font-size: 0.4rem;
        background: white;
        .records {
            padding: 0 0.3rem;
            height: 14.4rem;
            overflow: scroll;
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

</style>
