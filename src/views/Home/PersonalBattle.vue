<template>
    <div id="personal-battle" v-if="curUserInfo != null">
        <back-arrow :common="true" @selfHandle="back"></back-arrow>
        <div id="user-info">
            <div id="portrait">
                <img class="portrait" :src="curUserInfo.portrait">
            </div>
            <div id="data">
                <div id="name">{{curUserInfo.name}}<img class="medal" :src="curUserInfo.honor.url"></div>
                <span class="win-rate">胜率：{{(curUserInfo.winRate*100).toFixed(2) + '%'}}&nbsp&nbsp&nbsp&nbsp</span>
                <span class="honor">{{userInfo.honor.title}}</span>

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
        <record-list
          id="record-list"
          :records="records"
          :showBtn=false>
          :curUser="curUser"
        </record-list>
    </div>
</template>

<script>
  import * as API from '@/api/home'
  import RecordList from '@/components/RecordList'
  import BackArrow from '@/components/BackArrow'
  import Vue from 'vue'
  import { mapState, mapActions, mapGetters } from 'vuex'
  export default {
    name: "personal-battle",
    props:{
      curUser:{
        type:Number,
        default:0
      }
    },
    data() {
        return {
            curUserInfo:null,//选择查看的当前用户
            collapsed:{
              height:'1.5rem'
            },
            userId: "1",
            name: "投资家",
            portrait: "/static/img/5f236c10dc4d2e83d386048aedf9e50c.jpg",
            honor: {url:"/static/icon-img/honor-初出茅庐.png",title:"迷你鸡王"},
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
    },
    watch:{
      curUser(newVal){
        if(newVal !== 0)
          this.getUserRecords(this.curUser, "all");
      }
    },
    methods:{
        back() {
            this.$emit('notifyHome','')//''空字符串表示false
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
            this.getUserRecords(this.curUser, this.selectTime)
        },
        async getUserRecords(userId, selectTime) {

         this.curUserInfo = await API.getUserInfo(userId)
          /*
              获取某个人的战绩
          */
          API.getPersonalBattle(userId, selectTime).then(records=>{

            this.records = records
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
    computed:{
      ...mapGetters([
        'userInfo'
      ])
    }
  }
</script>

<style lang='less' scoped >
    #personal-battle {
        height: 100%;
        overflow: hidden;
        font-size: 0.4rem;
        top:0;
        z-index: 6;
        background: white;
        position: fixed;
        transform: rotateZ(90deg);
        transform-origin: left bottom;
        transition: transform 500ms;
      width: 100%;
        #record-list {
            padding: 0 0.3rem;
            height: 12rem;
            overflow: scroll;
        }
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
        background-image: linear-gradient(120deg, #f77062 0%, #c7000b 100%);
        box-shadow: 0 2px 5px #aaaaaa;
        #portrait, #data {
            display: inline-block;
            vertical-align: middle;
            color: white;
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
            .medal {
                padding: 0 0.2rem;
            }
        }
        .honor {
            color:white;
            vertical-align: middle;
            // margin-right: 0.5rem;
        }
        .win-rate {
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

</style>
