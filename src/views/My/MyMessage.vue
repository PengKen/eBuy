<template>
	<div id="my-message">
		<nav-bar :color="'white'"></nav-bar>
		<button-tab>
			<button-tab-item  @on-item-click="clickTab(1)" selected>收到</button-tab-item>
			<button-tab-item @on-item-click="clickTab(2)"><span>发出</span></button-tab-item>
		</button-tab>

      <masker :fullscreen="true" class="masker" v-show="showFist">
        <div class="fire">
          <img width="100%" height="100%" :src="require('./img/fire.png')" alt="">
        </div>
        <div slot="content" class="content">
          <img class="transition" :class="[!showFist ? 'hide-left-fist' :'show-left-fist'] " :src="require('./img/left.png')" alt="" />

          <img class="transition" :class="[ !showFist ? 'hide-right-fist' :'show-right-fist']" :src="require('./img/right.png')" alt="" />
        </div>
      </masker>


		<div id="msg-list">
			<div class="msg-item" v-for="(msg, index) in messages" @click="showDetail(index)">
				<div class="head"><img :src="msg.portrait"/></div>
				<div class="body">
					<div class="name">{{msg.name}}<span v-if="msg.read == 0" class="red-dot"></span></div>
					<div class="content">{{msg.content}}</div>
				</div>
				<div class="foot">
					<div class="time">{{msToDate(msg.messageTime.time)}}</div>
					<div class="state">{{getState(index)}}</div>
				</div>
			</div>
			<divider v-if="messages.length == 0" >这里什么也没有，快去对战大厅看看吧</divider>
		</div>
		<popup class="popup">
			<div class="content" slot="content">
				<h1>挑战书</h1>
				<div>
					<p class="info">
						<span>{{tab == 1 ? "来自：" : "发给："}}</span>
						<span class="name">{{msgDetail.name}}</span>
					</p>
					<p class="info">
						<span>捎话：</span>
						<span>{{msgDetail.content}}</span>
					</p>
				</div>
				<divider>挑战内容</divider>
				<div>
					<p class="detail">
						<span class="title">初始资产</span>
						<span>{{msgDetail.initialMoney}}</span>
					</p>
					<p class="detail">
						<span class="title">PK时长</span>
						<span>{{msgDetail.duringTime.time / 1000 / 60}}分钟</span>
					</p>
					<p class="detail">
						<span class="title">失效时间</span>
						<span>{{msToDate(msgDetail.expiredTime.time)}}</span>
					</p>
				</div>
				<div class="btn accept-btn"
				v-if="tab == 1 && msgDetail.ifAccepted == 0 && msgDetail.state != '已失效'"
				@click="onAccept()">
				 接受挑战
				</div>
				<div class="btn accepted-btn"
				v-if="tab == 1 && msgDetail.ifAccepted == 1 && msgDetail.state != '已失效'">
				 已接受
				</div>
				<div class="btn state"
				v-if="tab == 2 || msgDetail.state == '已失效'">
						{{msgDetail.state}}
				</div>
			</div>
		</popup>
	</div>

</template>


<script>
import * as API from "@/api/my";
import NavBar from "@/components/NavBar";
import { ButtonTab, ButtonTabItem, Divider, Alert, Masker} from "vux";
import { mapGetters } from 'vuex'
import popup from "@/components/popup";
import * as DF from "@/utils/timeFormat";
export default {
  name: "myMessage",
  data() {
    return {
      tab: 1,
      showPopup: false,
      showFist:false,
      messages: [],
      msgDetail: {
        index: 0,
        senderId: 111,
        receiver: 222,
        name: "",
        portrait: "",
        content: "",
        messageTime: "",
        battleId: "",
        initialMoney: "",
        duringTime: "",
        expiredTime: "",
        ifAccepted: 1,
        state: '',
      }
    };
  },
  components: {
    NavBar,
    ButtonTab,
    ButtonTabItem,
    Divider,
    popup,
    Alert,
    Masker
  },
  methods: {
    hidePopUp() {
      this.$store.commit('setShowPopup',false)
      this.$store.commit('setShowMessage',false)
    },
    showDetail(index) {
      if(this.messages[index].read == 0) {
        API.readMsg(this.messages[index].battleId).then(() => {
          this.messages[index].read = 1
        })
      }
      this.$store.dispatch('setShowPopup',true)
      this.$store.commit('setShowPopup',true)
      this.$store.commit('setShowMessage',true)
      this.msgDetail = this.messages[index];
      this.msgDetail.state = this.getState(index);
      this.msgDetail.index = index;
    },
    clickTab(tab) {
      this.tab = tab;
      if (tab == 1) {
        API.getReceivedMsg(this.userId).then(res => {
          this.messages = res;
        });
      } else {
        API.getSendMsg(this.userId).then(res => {
          this.messages = res;
        });
      }
    },
    getState(index) {
      if (this.messages[index].ifAccepted == 1) return "已接受";
      else if (this.messages[index].expiredTime.time < new Date().getTime()){
        return "已失效";
      }
      else return "待接受";
    },
    msToDate(ms) {
      return DF.msToDate(ms) ;
    },
    onAccept() {
      console.log("accept challenge" + this.msgDetail.battleId);
      var battleDetail = { invitee: this.userId, battleId: this.msgDetail.battleId };
      API.postStartBattle(battleDetail).then(res => {
        switch (res.userState) {
          case 0: //成功
            this.msgDetail.ifAccepted = true;
            this.messages[this.msgDetail.index].ifAccepted = true;
            var that = this
            this.showFist = true
            this.$store.dispatch('setShowPopup',false)
            setTimeout( () => {
              this.$vux.alert.show({
                title: "成功",
                content: "前往对战平台开始比赛吧",
                onShow:() =>{
                  this.showFist = false
                },
                onHide: () => {
                  this.$store.dispatch('setShowPopup',false)
                    .then(res => {


                        that.$router.push({ path: "/battle/battle", query: {} });
                        this.showFist = false


                    })

                }
              });
            },3000)

            break;
					case 1: //我没空
						this.$vux.alert.show({
              title: "失败",
              content: "您有未完成的比赛，晚点再来吧",
              onShow() {},
              onHide: () => {
                this.$store.dispatch('setShowPopup',false)
              }
            });
            break;
					case 2: //对方没空
						this.$vux.alert.show({
              title: "失败",
              content: "对方正在比赛中，晚点再来吧",
              onShow() {},
              onHide: () => {
                this.$store.dispatch('setShowPopup',false)
              }
            });
            break;
        }
      });
    }
  },
  created() {
    API.getReceivedMsg(this.userId).then(res => {
      this.messages = res;
    });
  },
  computed:{
    ...mapGetters([
      'userId'
    ])
  }
};
</script>

<style lang="less" scoped>
#my-message {
 .masker{
   .fire{
     position: absolute;

   }
   .content{
     height: 100%;

     .transition{

       transition: transform 5000ms;
     }
     .show-left-fist{
       width: 60%;
       transform: translate3d(-33%,100%,0);
     }
     .show-right-fist{
       width: 60%;
       transform: translate3d(33%,0,0);
     }
     .hide-left-fist{
       width: 60%;
       transform: translate3d(-150%,100%,0);
     }
     .hide-right-fist{
       width: 60%;
       transform: translate3d(150%,0,0);

     }
   }

 }
  font-size: 0.4rem;
  .vux-button-group {
    position: fixed;
    left: 0;
    right: 0;
    z-index: 200;
    width: 60%;
    // height: 10%;
    margin: 0.4rem auto;
    a {
      background: #eeeeee;
    }
    .vux-button-tab-item {
      color: #c7000b;
    }
    a.vux-button-group-current {
      background: #c7000b;
      color: white;
      transition: all 0.3s;
    }
    a.vux-button-tab-item-first:after,
    a.vux-button-tab-item-last:after {
      border: none;
    }
  }
  #msg-list {
    padding-top: 1.5rem;
    .msg-item {
      display: flex;
      align-items: center;
      justify-content: space-around;
      width: 100%;
      // height: 1.5rem;
      position: relative;
      padding: 0.3rem;
      box-sizing: border-box;
      border-bottom: 1px solid #eeeeee;

      .head,
      .body,
      .foot {
        display: inline-block;
        vertical-align: middle;
        box-sizing: border-box;
        overflow: hidden;
      }
      .head {
        // width: 10%;
        flex: 1;
        img {
          height: 1.2rem;
          width: 1.2rem;
          border-radius: 50%;
          vertical-align: middle;
          border: 2px solid #eeeeee;
        }
      }
      .body {
        flex: 4;
        // width: 70%;
        text-align: left;
        padding: 0 0.3rem;
        .name {
          // font-size: 0.5rem;
          // font-weight: bold;
          color: black;
          .red-dot {
            display: inline-block;
            width: 0.2rem;
            height: 0.2rem;
            border-radius: 1rem;
            margin: 0 0.2rem;
            background: #ee3333;
            position: relative;
            top: -0.2rem;
          }
        }
        .content {
          color: #888888;
          white-space: nowrap;
          overflow: hidden;
        }
      }
      .foot {
        flex: 1.3;
        // width: 20%;
        text-align: right;
        .time {
          font-size: 0.3rem;
          color: #bbbbbb;
        }
        .state {
          font-size: 0.35rem;
          color: #c7000b;
        }
      }
    }
    .msg-item:active {
      background: #f0f0f0;
    }
  }
  .popup {
    .content {
      background: url('/static/img/paper.png');
      background-size: 100% 100%;
      // background-position: 50%;
      height: 100%;
      position: relative;
      padding: 1rem 1rem 2.2rem;
      h1 {
        color: #c7000b;
        margin: 0.2rem;
      }
      .info,
      .detail {
        text-align: left;
        line-height: 1rem;
      }
      .info {
        .name {
          color: #c7000b;
        }
      }
      .detail {
        .title {
          color: #d87000;
          display: inline-block;
          width: 5em;
        }
      }

      .btn {
        width: 5rem;
        height: 1rem;
        line-height: 1rem;
        font-size: 0.5rem;
        margin: 0 auto;
        position: absolute;
        bottom:15%;
        width: 80%;
        left: 0;
        right: 0;
        color: white;
      }
      .accept-btn {
        background: #c7000b;
        border-radius: 1.2rem;
      }
      .accept-btn:active {
        background: #a70109;
        transition: all 0.1s;
      }
      .accepted-btn,
      .accepted-btn:active {
        border-radius: 1.2rem;
        background: rgb(207, 158, 93);
      }
      .state {
        background: rgb(207, 158, 93);
      }
    }
  }
}
</style>
