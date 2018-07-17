<template>
  <div id="home">
    <div id="swiper">
      <swiper :options="swiperOption" ref="mySwiper" @someSwiperEvent="callback">
        <!-- slides -->
        <swiper-slide><img class="img" src="/static/img/5f236c10dc4d2e83d386048aedf9e50c.jpg" alt=""></swiper-slide>
        <swiper-slide><img class="img" src="/static/img/6d21c5fa5f66f8f31469320ec1123458.jpeg" alt=""></swiper-slide>

        <!-- Optional controls -->
        <div class="swiper-pagination"  slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
        <div class="swiper-scrollbar"   slot="scrollbar"></div>
      </swiper>
    </div>
    <div id="borad" ref="borad">
        <h2>排行榜</h2>
      <ul ref="ulBorad" :style="ulBoradStyle ">
        <li v-for="user in  boardListUser">
          <img src="/static/img/6d21c5fa5f66f8f31469320ec1123458.jpeg" alt="">
          <span>{{ user.name }}</span>
          <span>{{ user.winrate }}</span>
          <button class="challenge">挑战</button>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import 'swiper/dist/css/swiper.css'
  import Vue from 'vue'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    name: "home",
    created(){
      this.$store.dispatch('boardList/getBoardList')
    },
    data() {
      return {
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
      let borad = this.$refs.borad.clientHeight / rem - 1; /* h2 的高度为 1rem*/
      console.log(borad)
      Vue.set( this.ulBoradStyle, 'height',  Math.floor(borad / 1.8) * 1.8* rem  + 'px' )

    },
    components:{
      swiper,
      swiperSlide
    },
    methods:{
      callback(){

      }
    },
    computed: mapState({
      boardListUser: state => state.boardList.allBoardList
    })
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
    #borad{
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
          font-weight: 700;
        }
        .challenge{
          display: inline-block;
          width: 1.5rem;
          height: 0.8rem;
          border-radius: 1.6rem;
          font-size: 0.4rem;
          background: orange;
        }
      }

    }
  }


</style>
