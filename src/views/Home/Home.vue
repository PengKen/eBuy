<template>
  <div id="home">
    <search-box
      id="search-box"
      v-if="showPersonal == false"
      @showPersonal="personalBattle"
      @challenge="challenge">
    </search-box>
    <div class="bg"></div>
    <div id="swiper">
      <swiper :options="swiperOption" ref="mySwiper"
      @someSwiperEvent=""
      >
        <!-- slides -->
        <swiper-slide><img @click.self="rule" class="img" :src="require('./img/eBuyPoster.jpg')" alt=""></swiper-slide>
        <swiper-slide><img @click.self="expertDetail" class="img" :src="require('./img/expert-click.jpg')" alt=""></swiper-slide>

        <!-- Optional controls -->
        <div class="swiper-pagination"  slot="pagination"></div>
        <div class="swiper-scrollbar"   slot="scrollbar"></div>
      </swiper>
    </div>
    <div id="board" ref="board">
        <h2>排行榜</h2>
      <ul ref="ulBorad" v-if="boardListUser">
        <li :key="index" v-for="(user,index) in  boardListUser" @click="personalBattle(user.userId)" :class="getPrize(index)">
        <!--<li :key="index" v-for="(user,index) in  boardListUser" @click="personalBattle(user.userId)">-->
        <!--<li  v-for="user in  boardListUser" @click="personalBattle(user.userId)">-->
          <div class="head">
            <span class="rank" v-if="index > 2">{{index+1}}</span>
            <img class="prize" v-if="index == 0" src="/static/icon-img/icons8-medal-first-place-96.png"/>
            <img class="prize" v-if="index == 1" src="/static/icon-img/icons8-medal-second-place-96.png"/>
            <img class="prize" v-if="index == 2" src="/static/icon-img/icons8-medal-third-place-96.png"/>
          </div>
           <img class="portrait" :src="user.portrait" alt="">
           <div>
             <div class="name">{{ user.name }}</div>
             <div>
               <img class="medal" :src="user.honor.url" />
               <span class="honor">{{user.honor.title}}</span>
             </div>
           </div>
           <div class="win-rate"><span class="win">胜</span><span class="num">{{user.win}}/{{user.all}}</span></div>
           <button class="challenge" @click.stop="challenge(user.userId)">挑战</button>
        </li>
      </ul>
    </div>
    <personal-battle
      :curUser="curUser"
      @notifyHome="personalBattle(false)"
      :class="[showPersonal ? 'rotate-start' : 'rotate-finish']"
    ></personal-battle>
    <keep-alive>
      <!-- <battle-setting
        situation="Home"
        :challengeUser="curUser"
      ></battle-setting> -->
    </keep-alive>

  </div>

</template>

<script>
import store from "@/store/index";
import { mapState, mapActions, mapGetters } from "vuex";
import getNormalTime from "@/utils/timeFormat";
import "swiper/dist/css/swiper.css";
import Vue from "vue";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import popup from "@/components/popup";
import * as API from "@/api/home";
import { Group, AlertPlugin, Datetime, XNumber, XTextarea, XButton } from "vux";
import BattleSetting from "@/views/BattleHall/BattleSetting";
import PersonalBattle from "@/views/Home/PersonalBattle";
import SearchBox from "@/components/SearchBox";
Vue.use(AlertPlugin);
export default {
  name: "home",
  created() {
    this.$store
      .dispatch("boardList/getBoardList")
      .then(state => console.log(state));
  },
  computed: {
    ...mapGetters(["userId"])
  },
  data() {
    return {
      swipers: [
        process.env.STATIC_URL +
          "/static/img/5f236c10dc4d2e83d386048aedf9e50c.jpg",
        process.env.STATIC_URL +
          "/static/img/6d21c5fa5f66f8f31469320ec1123458.jpeg"
      ],
      showPopup: false,
      curUser: 0,
      showPersonal: false,
      ulBoradStyle: {}, //排行榜初始高度
      swiperOption: {
        // some swiper options/callbacks
        // 所有的参数同 swiper 官方 api 参数
        autoplay: 3000,
        grabCursor: true,
        setWrapperSize: true,
        pagination: ".swiper-pagination",
        paginationClickable: true,
        prevButton: ".swiper-button-prev", //上一张
        nextButton: ".swiper-button-next", //下一张
        scrollbar: ".swiper-scrollbar", //滚动条
        mousewheelControl: true,
        observeParents: true,
        // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
        debugger: true
      }
    };
  },
  mounted() {
    let rem = parseFloat(document.documentElement.style.fontSize);
    let board = this.$refs.board.clientHeight / rem - 1; /* h2 的高度为 1rem*/
    Vue.set(
      this.ulBoradStyle,
      "height",
      Math.floor(board / 1.8) * 1.8 * rem + "px"
    );
  },
  components: {
    swiper,
    swiperSlide,
    PersonalBattle,
    BattleSetting,
    SearchBox
  },
  methods: {
    expertDetail() {
      this.$router.push({ path: "/home/expertDetail", query: {} });
    },
    rule() {
      this.$router.push({ path: "/home/rule", query: {} });
    },
    personalBattle(userId) {
      userId
        ? ((this.showPersonal = true), (this.curUser = userId))
        : (this.showPersonal = false);
    },
    challenge(userId) {
      if (userId == this.userId) {
        this.$vux.alert.show({
          title: "提示",
          content: "不可以挑战自己哦",
          onShow() {},
          onHide() {}
        });
      } else {
        this.curUser = userId;
        var battleSetting = {
          situation: 'Home',
          challengeUser: userId
        }
        this.$store.dispatch('setBattleSetting',battleSetting)
        this.$store.dispatch('setShowPopup',true)
      }
    },
    hidePopUp() {
      this.$store.dispatch("setShowPopup", false);
    },
    postNewBattle() {
      if (!this.battleDetail.expiredTime) {
        this.$vux.alert.show({
          title: "系统提示",
          content: "<br>请设置摆擂时间",
          onShow() {},
          onHide() {}
        });
        return;
      }
      const battleDetail = {
        ...this.battleDetail,
        founder: this.userId,
        duringTime: 123,
        initialMoney: this.battleDetail.initialMoney * 10000,
        expiredTime: new Date(
          this.battleDetail.expiredTime + ":00:00"
        ).getTime(),
        duringTime: this.battleDetail.duringTime * 86400000 //一天为86400000毫秒
      };
      API.postNewBattle(battleDetail).then(() => {
        this.$vux.alert.show({
          title: "恭喜",
          content: "战书已下达，请等待对方应战！",
          onShow() {},
          onHide: () => {
            this.showPopup = false;
          }
        });
      });
    },
    getPrize(index) {
      if(index == 0){
        return 'first'
      }else if(index == 1) {
        return 'second'
      }else if(index == 2) {
        return 'third'
      }else {
        return ''
      }
    }
  },
  computed: {
    expiredTime() {
      return this.getNormalTime + " " + this.minHour;
    },
    ...mapGetters({
      boardListUser: "boardList/allBoardList",
      userId: "userId"
    })
  }
};
</script>

<style scoped lang="less">
#home {
  position: relative;
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  box-sizing: border-box;
  background: rgb(255, 255, 241);
  #search-box {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
    height: 45px;

  }
  .bg {
    position: absolute;
    top: 0;
    left: -10%;
    right: 0;
    width: 120%;
    height: 30%;
    background: #ee3333;
    border-radius: 0 0 50% 50%;
  }
  #swiper {
    height: 30%;
    padding-top: 40px;
    position: relative;
    z-index: 0;
    .swiper-container {
      height: 100%;
      .swiper-pagination {
        .swiper-pagination-bullet-active {
          background: #c7000b;
        }
      }
    }
    .img {
      width: 95%;
      height: 90%;
      margin: 0.2rem;
      border-radius: 0.2rem;
      box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.1);
      /*background-size: contain;*/
    }
    .swiper-scrollbar {
      display: none;
    }
  }
  #board {
    -webkit-overflow-scrolling: touch;
    width: 100%;
    // position: absolute;
    // top: 35%;
    // bottom: 1.6rem;
    // margin-top: 0.3rem;
    // overflow: hidden;
    padding-bottom: 1.5rem;
    ul {
      // margin-bottom: 0.3rem;
      // overflow: scroll;
    }
    h2 {
      line-height: 1.5rem;
      vertical-align: middle;
      text-align: center;
      // font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      position: relative;
      white-space: nowrap;
      // margin: 0.5rem auto;
      color: #333;
      padding-top: 0.5rem;
      background: url('/static/icon-img/icons8-奥运奖牌金牌-50.png');
      background-repeat: no-repeat;
      background-position: 50% -80%;
      background-size: 1.5rem 1.5rem;
    }
    h2:before, h2:after {
      content: '';
      display: inline-block;
      height: 5px;
      background: #fc7272;
      border-radius: 5px;
      width: 30%;
      // height: 1px;
      margin: 0.1rem 0.5rem;
    }
    li {
      display: flex;
      line-height: 0.8rem;
      list-style: none;
      font-size: 0.4rem;
      align-items: center;
      justify-content: space-around;
      padding: 0.1rem 0;
      margin: 0 0.2rem 0.3rem;
      border-radius: 0.2rem;
      // border: 1px solid #eee;
      background: white;
      box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.1);
      .portrait {
        height: 1.2rem;
        width: 1.2rem;
        border-radius: 50%;
        border: 1px solid #ddd;
      }
      span {
        // flex: 0 0 2.8rem;
        // font-weight: 700;
      }
      .challenge {
        display: inline-block;
        width: 1.3rem;
        height: 0.7rem;
        border-radius: 1.6rem;
        font-size: 0.35rem;
        background: orange;
        color: white;
        border: none;
      }
      .medal {
        height: 0.7rem;
        width: 0.7rem;
        position: relative;
        // z-index: 1;
        // vertical-align: baseline;
      }
      .honor {
        line-height: 0.5rem;
        font-size: 0.3rem;
        vertical-align: top;
        display: inline-block;
        padding: 0 0.1rem;
        border-radius: 0 0.1rem 0.1rem 0;
        background: #ee3333;
        color: white;
        margin-left: -0.2rem;
        position: relative;
        top: 0.1rem;
      }
      .name {
        text-align: left;
        font-size: 0.5rem;
        font-weight: bold;
        padding-left: 0.1rem;
      }
      .head {
        width: 2em;

        .rank {
          display: inline-block;
          // width: 1.2em;
          // text-align: right;
          font-size: 0.5rem;
          color: rgb(255, 196, 0);
          // font-weight: bold;
          font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
        }
        .prize {
          width: 3em;
          vertical-align: middle;
          margin: 0 -0.5em;
        }
      }

      .win-rate {
        font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;
        .win {
          display: inline-block;
          width: 0.5rem;
          height: 0.5rem;
          line-height: 0.5rem;
          color: white;
          font-size: 0.3rem;
          background: linear-gradient(120deg, #f77062 0%, #c7000b 100%);
          margin: 0 0.1rem 0 0.3rem;
          border-radius: 0.1rem;
          vertical-align: middle;
        }
        .num {
          display: inline-block;
          width: 2em;
          margin-right: 0.2rem;
        }
      }
    }
  }
  .pupup {
    margin-top: 30%;
    .content {
      flex: 1 1 80%;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .vux-number-selector svg {
        fill: red;
      }
      .weui-cell__ft {
        .vux-cell-value {
          font-size: 1rem !important;
        }
      }
      .comfirm-button {
        margin: 0.5rem auto;
        width: 80%;
        height: 1rem;
        background: orange;
        border-radius: 0.5rem;
        font-size: 0.4rem;
      }
    }
    .weui-cells {
      .weui-cell {
        color: black;
        font-weight: 420;
        &:before {
          border: none;
        }
      }
    }
  }
  .rotate-start {
    transform: rotateZ(0deg);
  }
  .rotate-finish {
    width: 100%;
  }
}
</style>

