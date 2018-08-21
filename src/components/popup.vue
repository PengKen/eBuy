<template>
  <div id="popup">
    <popup
      class="content"
      v-model="status"
      width="90%" position="top"
      height="75%"
      :hide-on-blur="false"
      @on-hide="handleHide">
      <slot  name="content"></slot>
      <div style="width: 100%"></div>
      <div  class="close-wrapper" @click="handleHide">
        <div class="close">
          <i class="icon iconfont icon-close1"></i>
        </div>

      </div>

    </popup>
  </div>

</template>

<style lang="less" scoped>
  #popup{
    .vux-popup-dialog{
      overflow-y: unset;

    }
    .vux-popup-top{
      width: 90%;
      margin:auto;
      bottom: 0;
      left: 0;
      right: 0;
      top: 0;
    }
    .content{

      border-radius: 0.3rem;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .close-wrapper{
        width: 20px;
        /* height: 20px; */
        position: absolute;
        right: 0;
        top: 0;
        /* font-size: 10px; */
        /* z-index: 10000000000; */
        .close{
          position: absolute;
          top: -10px;
          left: 50%;
          i{
            font-size: 20px;
            color: #5a5656;
          }
        }


      }
    }

  }

</style>

<script>
  import { mapGetters } from 'vuex'
  import { Popup } from 'vux'
  export default {
    name:'popupTop',
    props:{
      isShow:{
        type:Boolean,
        default:false
      },
      autoClose:{
        type:Boolean,
        default:false
      },
      showClose:{
        type:Boolean,
        default:false
      }

    },
    data () {
      return {
        status:this.isShowPopup
      }
    },
    components:{
      Popup,

    },
    watch:{
      isShowPopup (newVal) {
        this.status = newVal
      },
      status (newVal){
        this.$store.dispatch('setShowPopup',newVal)
      }
    },
    methods:{
      handleHide(){
        this.$store.dispatch('setShowPopup',false)

      }
    },
    computed:{
      ...mapGetters([
        'isShowPopup'
      ])

    }

  }

</script>
