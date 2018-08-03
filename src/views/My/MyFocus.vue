<template>
    <div id="my-focus">
        <back-arrow></back-arrow>
        <h1>我的关注</h1>
				<div class="records">
        	<record-list id="record-list" :records="records" :showBtn=true :showStamp=true></record-list>
				</div>
    </div>
</template>

<script>
import store from "@/store/index";
import * as API from "@/api/my";
import RecordList from "@/components/RecordList";
import BackArrow from "@/components/BackArrow";
import Vue from "vue";
export default {
  name: "myFocus",
  data() {
    return {
      userId: "222",
      records: [
        {
          founderName: "我是长长的用户名hhhhhhhhhhhhhhhhhh",
          inviteeName: "userB",
          founderPortrait: "/static/img/5f236c10dc4d2e83d386048aedf9e50c.jpg",
          inviteePortrait: "/static/img/5f236c10dc4d2e83d386048aedf9e50c.jpg",
          founderHonor: {
            url: "/static/icon-img/honor-初出茅庐.png",
            title: "迷你鸡王"
          },
          inviteeHonor: "初出茅庐",
          founderCardId: "",
          inviteeCardId: "",
          startTime: "2018-07-20",
          endTime: "2018-07-25",
          initialMoney: "",
          founderBalance: "",
          inviteeBalance: "",
          founderRate: 1.1,
          inviteeRate: 1.2
        },
        {
          founderName: "我是长长的用户名hhhhhhhhhhhhhhhhhh",
          inviteeName: "userB",
          founderPortrait: "/static/img/5f236c10dc4d2e83d386048aedf9e50c.jpg",
          inviteePortrait: "/static/img/5f236c10dc4d2e83d386048aedf9e50c.jpg",
          founderHonor: {
            url: "/static/icon-img/honor-初出茅庐.png",
            title: "迷你鸡王"
          },
          inviteeHonor: "初出茅庐",
          founderCardId: "",
          inviteeCardId: "",
          startTime: "2018-07-20",
          endTime: "2018-07-29",
          initialMoney: "",
          founderBalance: "",
          inviteeBalance: "",
          founderRate: 1.1,
          inviteeRate: 1.2
        }
      ]
    };
  },
  created() {
		this.userId = store.state.userId;
    this.getMyFocus(this.userId);
		console.log("created");
  },
  methods: {
    getMyFocus(userId) {
      API.getMyFocus(userId).then(res => {
				this.records = res;
        if (this.records.length > 0) {
          Vue.set(this.records[0], "collapsed", true);
				}
				for(let i = 0; i < this.records.length; i++) {
					Vue.set(this.records[i], "isFocus", 1);
				}
      });
    }
  },
  components: {
    RecordList,
    BackArrow
  },
  destoryed() {
    console.log("i am destory");
  }
};
</script>

<style lang='less' >
#my-focus {
  height: 100%;
  overflow: hidden;
  font-size: 0.4rem;
	background: white;
	.records {
		margin-top: 0.5rem;
		padding: 0 0.3rem;
		height: 15.9rem;
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
    background: #c7000b;
    transition: all 0.3s;
  }
}

</style>
