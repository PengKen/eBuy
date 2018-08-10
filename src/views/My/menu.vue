<template>
  <div id="my">
    <div id="user-info">
      <div id="portrait">
        <img class="portrait" :src="userInfo.portrait">
      </div>
      <div id="data">
        <div id="name">{{userInfo.name}}<img class="medal" :src="honor.url"></div>
        <span class="win-rate">胜率：{{(userInfo.winRate*100).toFixed(2) + '%'}}&nbsp&nbsp&nbsp&nbsp</span>
        <span class="honor">{{userInfo.honor.title}}</span>

      </div>
    </div>
    <div id="menu">
      <div class="list">
      <router-link :to="{ name: 'MyBattles', params: {}}">
        <div class="list-item">
          <img class="item-head" src="/static/icon-img/clock.png"/>
          <span class="item-body">我的比赛</span>
          <img class="item-foot" src="/static/icon-img/icons8-chevron-right-26.png"/>
        </div>
      </router-link>
      <router-link :to="{ name: 'MyMessage', params: {}}">
        <div class="list-item">
          <img class="item-head" src="/static/icon-img/message.png"/>
          <span class="item-body">我的消息</span>
          <img class="item-foot" src="/static/icon-img/icons8-chevron-right-26.png"/>
        </div>
      </router-link>
      <router-link :to="{ name: 'MyFocus', params: {}}">
        <div class="list-item">
          <img class="item-head" src="/static/icon-img/star.png"/>
          <span class="item-body">我的关注</span>
          <img class="item-foot" src="/static/icon-img/icons8-chevron-right-26.png"/>
        </div>
      </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store/index";
import * as API from "@/api/home";
import { mapGetters } from 'vuex'
export default {
  name: "my",
  data() {
    return {
      userId: 111,
      name: "投资家",
      portrait: "/static/img/5f236c10dc4d2e83d386048aedf9e50c.jpg",
      honor: { title: "吃鸡达人", url: "/static/icon-img/honor.png" },
      winRate: 0.8
    };
  },
  computed:{
    ...mapGetters([
      'userInfo'
    ])
  }

};
</script>

<style lang="less" scoped>
#my {
  font-size: 0.4rem;
  height: 100%;
  background: white;
  // background: #f0f0f0;
  #user-info {
    height: 10%;
    padding-top: 1.5rem;
    padding-bottom: 0.5rem;
    background-image: linear-gradient(120deg, #f77062 0%, #c7000b 100%);
    box-shadow: 0 2px 5px #aaaaaa;
    #portrait,
    #data {
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
        width: 0.5rem;
        height: 0.5rem;
        vertical-align: middle;
      }
    }
    .honor {
      color: white;
      vertical-align: middle;
      // margin-right: 0.5rem;
    }
    .win-rate {
      vertical-align: middle;
    }
  }
  #menu {
    width: 100%;
    box-sizing: border-box;
    background: white;
    padding: 0 0.5rem;
    margin: 0.5rem 0;
    position: relative;
    .list {
      .list-item {
        border-bottom: 1px solid #f0f0f0;
        padding: 0.5rem 0;
        width: 100%;
        display: flex;
        align-items: center;
        .item-head,
        .item-body,
        .item-foot {
          height: auto;
        }
        .item-head,
        .item-foot {
          flex: 1;
          width: 1rem;
          height: 1rem;
        }
        .item-body {
          flex: 8;
          color: #666666;
        }
      }
      .list-item:active {
        background: #f0f0f0;
        transition: all 0.3s;
      }
    }
  }
}
</style>

