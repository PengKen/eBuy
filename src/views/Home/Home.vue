<template>
  <div id="home">
    <search-box></search-box>
    <div id="swiper">
      <swiper :options="swiperOption" ref="mySwiper"
      @someSwiperEvent=""
      >
        <!-- slides -->
        <swiper-slide><img @click.self="rule" class="img" src="/static/img/eBuyPoster.jpg" alt=""></swiper-slide>
        <swiper-slide><img @click.self="expertDetail" class="img" src="/static/img/expert-click.jpg" alt=""></swiper-slide>

        <!-- Optional controls -->
        <div class="swiper-pagination"  slot="pagination"></div>
        <div class="swiper-scrollbar"   slot="scrollbar"></div>
      </swiper>
    </div>
    <div id="board" ref="board">
        <h2>排行榜</h2>
      <ul ref="ulBorad" :style="ulBoradStyle" v-if="boardListUser">
        <li :key="index" v-for="(user,index) in  boardListUser" @click="personalBattle(user.userId)">
        <!--<li :key="index" v-for="(user,index) in  boardListUser" @click="personalBattle(user.userId)">-->
        <!--<li  v-for="user in  boardListUser" @click="personalBattle(user.userId)">-->

           <img :src="user.portrait" alt="">
           <span>{{ user.name }}</span>
           <span><em>胜率/</em>{{ user.winRate.toFixed(2)*100 + '%'}}</span>


          <button class="challenge" @click.stop="challenge(user.userId)">挑战</button>
        </li>
      </ul>
    </div>
    <personal-battle
      :curUser="curUser"
      @notifyHome="personalBattle('')"

      :class="[showPersonal ? 'rotate-start' : 'rotate-finish']"
    ></personal-battle>
    <keep-alive>
      <battle-setting
        :showBattleSetting.sync="showPopup"
        situation="Home"
        :curUser="curUser"

      ></battle-setting>
    </keep-alive>

  </div>

</template>

<script>
  import store from "@/store/index";
  import { mapState, mapActions,mapGetters } from 'vuex'
  import getNormalTime from '@/utils/timeFormat'
  import 'swiper/dist/css/swiper.css'
  import Vue from 'vue'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import popup from '@/components/popup'
  import * as API from '@/api/home'
  import {  Group,  AlertPlugin, Datetime, XNumber,  XTextarea ,XButton } from 'vux'
  import BattleSetting from '@/views/BattleHall/BattleSetting'
  import PersonalBattle from '@/views/Home/PersonalBattle'
  import SearchBox from '@/components/SearchBox'
  Vue.use(AlertPlugin)
  export default {
    name: "home",
    created(){
      this.$store.dispatch('boardList/getBoardList').then( state => console.log(state));
      this.userId = store.state.userId;
    },
    computed () {

    },
    data() {
      return {
        userId: 111,
        swipers:[
          process.env.STATIC_URL+'/static/img/5f236c10dc4d2e83d386048aedf9e50c.jpg',
          process.env.STATIC_URL+'/static/img/6d21c5fa5f66f8f31469320ec1123458.jpeg'
        ],
        showPopup:false,
        curUser:0,
        showPersonal:false,
        ulBoradStyle:{},//排行榜初始高度
        swiperOption: {
          // some swiper options/callbacks
          // 所有的参数同 swiper 官方 api 参数
          autoplay: 3000,
          grabCursor : true,
          setWrapperSize :true,
          pagination : '.swiper-pagination',
          paginationClickable :true,
          prevButton:'.swiper-button-prev',//上一张
          nextButton:'.swiper-button-next',//下一张
          scrollbar:'.swiper-scrollbar',//滚动条
          mousewheelControl : true,
          observeParents:true,
          // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
          debugger: true,
        }
      }
    },
    mounted(){
      let rem = parseFloat(document.documentElement.style.fontSize)
      let board = this.$refs.board.clientHeight / rem - 1; /* h2 的高度为 1rem*/
      Vue.set( this.ulBoradStyle, 'height',  Math.floor(board / 1.8) * 1.8* rem  + 'px' )
    },
    components:{
      swiper,
      swiperSlide,
      PersonalBattle,
      BattleSetting,
      SearchBox
    },
    methods:{
      expertDetail(){
        this.$router.push({path:"/home/expertDetail", query:{}})
      },
      rule(){
        this.$router.push({path:"/home/rule", query:{}})
      },
      personalBattle(userId){
        userId  ? this.showPersonal = true : this.showPersonal = false
        this.curUser = userId
        // this.$router.push({ path: "/home/personalbattle" , query:{userId:userId}})
      },
      challenge(userId){
        if(userId == this.userId) {
          this.$vux.alert.show({
            title: "提示",
            content: "不可以挑战自己哦",
            onShow() {},
            onHide() {}
          });
        }
        else{
        this.curUser = userId
          this.showPopup = true
        }

      },
      hidePopUp(){
        this.showPopup = false
      },
      postNewBattle(){
        if(!this.battleDetail.expiredTime){
          this.$vux.alert.show({
            title: '系统提示',
            content: '<br>请设置摆擂时间',
            onShow () {
            },
            onHide () {
            }
          })
          return
        }
        const battleDetail = {
          ...this.battleDetail,
          founder:this.userId,
          duringTime:123,
          initialMoney:this.battleDetail.initialMoney*10000,
          expiredTime:new Date(this.battleDetail.expiredTime + ":00:00").getTime(),
          duringTime:this.battleDetail.duringTime * 86400000 //一天为86400000毫秒
        }
        API.postNewBattle(battleDetail).then(()=>{
          this.$vux.alert.show({
            title: '恭喜',
            content: '战书已下达，请等待对方应战！',
            onShow () {
            },
            onHide: ()=> {
              this.showPopup = false
            }
          })
        })
      }

    },
    computed: {
      expiredTime(){
        return  this.getNormalTime+" " + this.minHour;
      },
      ...mapGetters({
                 boardListUser: 'boardList/allBoardList'
  })
    }
  }
</script>

<style scoped lang="less">

  #home{
    position: relative;
    height: 100%;
    overflow: hidden;
    #swiper{
      height: 30%;
      .swiper-container{
        height: 100%
      }
      .img{
        width: 100%;
        height: 100%;
        /*background-size: contain;*/
      }
    }
    #board{
      -webkit-overflow-scrolling:touch;
      width: 100%;
      position: absolute;
      top:30%;
      bottom: 1.6rem;
      margin-top: 0.3rem;
      overflow: hidden;
      ul{
        margin-bottom: 0.3rem;
        overflow: scroll;
      }
      h2{
        line-height: 1rem;
        text-align: center;
      }
      li{
        display: flex;
        line-height: 0.8rem;
        margin-bottom: 0.3rem;
        list-style: none;
        font-size: 0.5rem;
        align-items: center;
        justify-content: space-around;
        img{
          height: 1.5rem;
          width: 1.5rem;
          border-radius: 50%;
        }
        span{
          flex: 0 0 2.8rem;
          font-weight: 700;
        }
        .challenge{
          display: inline-block;
          width: 1.6rem;
          height: 0.8rem;
          border-radius: 1.6rem;
          font-size: 0.4rem;
          background: orange;
        }
      }

    }
    .pupup{
      margin-top: 30%;
      .content{
          flex:1 1 80%;
          display: flex;
          flex-direction: column;
          justify-content: center;

        .vux-number-selector svg {
          fill: red;
        }
        .weui-cell__ft{
          .vux-cell-value{
            font-size: 1rem !important;
          }
        }
        .comfirm-button{
          margin: 0.5rem auto;
          width: 80%;
          height: 1rem;
          background: orange;
          border-radius: 0.5rem;
          font-size: 0.4rem;
        }
      }
      .weui-cells{
        .weui-cell{
          color: black;
          font-weight: 420;
          &:before{
            border: none;
          }
        }

      }


    }
    .rotate-start{
      transform: rotateZ(0deg);


    }
    .rotate-finish{
      width: 100%;
    }
  }


</style>

