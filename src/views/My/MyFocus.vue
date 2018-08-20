<template>
    <div id="my-focus">
        <nav-bar :title="'我的关注'"></nav-bar>
				<div class="records">
        	<record-list id="record-list" :records="records" :showBtn=true :showStamp=true></record-list>
				</div>
    </div>
</template>

<script>
import store from "@/store/index";
import * as API from "@/api/my";
import RecordList from "@/components/RecordList";
import NavBar from "@/components/NavBar";
import Vue from "vue";
import { mapGetters } from 'vuex'
export default {
  name: "myFocus",
  data() {
    return {
      records: []
    };
  },
  created() {
    this.getMyFocus(this.userId);
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
    NavBar
  },
  computed:{
    ...mapGetters([
      'userId'
    ])
  }
};
</script>

<style lang='less' >
#my-focus {
  font-size: 0.4rem;
	background: white;
	.records {
		padding: 2rem 0.3rem 0.2rem;
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
