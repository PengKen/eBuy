<template>
  <div id="home">
    <div id="swiper">
      <swiper :options="swiperOption" ref="mySwiper"
      @someSwiperEvent=""
      >
        <!-- slides -->
        <swiper-slide v-for="(swiper,index) in swipers" :key="index"><img class="img" :src="swiper" alt=""></swiper-slide>

        <swiper-slide><img class="img" src="/static/img/5f236c10dc4d2e83d386048aedf9e50c.jpg" alt=""></swiper-slide>
        <swiper-slide><img @click="expertDetail()" class="img" src="/static/img/expert-click.jpg" alt=""></swiper-slide>

        <!-- Optional controls -->
        <div class="swiper-pagination"  slot="pagination"></div>
        <div class="swiper-scrollbar"   slot="scrollbar"></div>
      </swiper>
    </div>
    <div id="board" ref="board">
        <h2>排行榜</h2>
      <ul ref="ulBorad" :style="ulBoradStyle" v-if="boardListUser">
        <li  v-for="user in  boardListUser" @click="personalBattle(user.userId)">
          <img :src="user.portrait" alt="">
          <span>{{ user.name }}</span>
          <span><em>胜率/</em>{{ user.winRate.toFixed(2)*100 + '%'}}</span>
          <button class="challenge" @click.stop="challenge(user.userId)">挑战</button>
        </li>
      </ul>
    </div>

    <keep-alive>
      <popup class="pupup" :isShow.sync="showPopup" @hidePopUp="hidePopUp" :showClose="false">
          <div class="content" slot="content">
            <h2>擂台设置</h2>
            <group label-width="5em" label-margin-right="2em" label-align="center">
              <x-number :fillable="true" :step="step" title="初始资金(万元)" align="center" v-model="battleDetail.initialMoney" button-style="round" :min="1" :max="20"><span>aaa</span></x-number>
              <x-number :fillable="true" :step="step" title="PKS时长(天)" align="center" v-model="battleDetail.duringTime" button-style="round" :min="1" :max="20"><span>aaa</span></x-number>
              <datetime
                  :required="true"
                  title="摆擂时长"
                  placeholder="擂台失效时间"
                  v-model="battleDetail.expiredTime"
                  value-text-align="left"
                  format="YYYY-MM-DD HH"
                  :min-hour="minHour"
                  :start-date="battleDetail.currentTime"
              ></datetime >


              <x-textarea
                title="捎话"
                placeholder="呛他两句？"
                :show-counter="false"
                :rows="1"
                v-model="battleDetail.content"
              ></x-textarea>
              <button type="submit" class="comfirm-button" @click="postNewBattle">确定</button>
            </group>

          </div>
      </popup>
    </keep-alive>

  </div>

</template>

<script>
  import { mapState, mapActions,mapGetters } from 'vuex'
  import getNormalTime from '@/utils/timeFormat'
  import 'swiper/dist/css/swiper.css'
  import Vue from 'vue'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import popup from '@/components/popup'
  import * as API from '@/api/home'
  import {  Group,  AlertPlugin, Datetime, XNumber,  XTextarea ,XButton } from 'vux'
  Vue.use(AlertPlugin)
  export default {
    name: "home",
    created(){
      this.$store.dispatch('boardList/getBoardList').then( state => console.log(state))
    },
    data() {
      return {
        swipers:[
          process.env.STATIC_URL+'/static/img/5f236c10dc4d2e83d386048aedf9e50c.jpg',
          process.env.STATIC_URL+'/static/img/6d21c5fa5f66f8f31469320ec1123458.jpeg'
        ],
        battleDetail:{
          duringTime:6,
          initialMoney:5,
          invitee:'',
          content:'',
          expiredTime:''
        },
        currentTim:getNormalTime,
        showPopup:false,
        step:0.5,
        minHour: new Date().getHours(),
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
      popup,
      Group,
      XButton,
      Datetime,
      XNumber,
      XTextarea
    },
    methods:{
      expertDetail(){
        this.$router.push({path:"/home/expertDetail", query:{}})
      },
      personalBattle(userId){
        this.$router.push({ path: "/home/personalbattle" , query:{userId:userId}})
      },
      challenge(userId){
        this.battleDetail['invitee'] = userId
        this.showPopup = true
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
          founder:123,
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
  }


</style>

