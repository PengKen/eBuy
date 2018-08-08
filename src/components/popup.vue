<template>
  <div id="popup">
    <popup class="content" v-model="status" width="90%" position="top" height="75%" @on-hide="handleHide">
      <slot  name="content"></slot>
      <div style="width: 100%"></div>
      <div v-if="showClose" class="close" @click="handleHide">
        <i class="icon iconfont icon-close"></i>
      </div>

    </popup>
  </div>

</template>

<style lang="less" scoped>
  #popup{
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

      .close{
        i{
          font-size: 1.3rem !important;
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
        this.$emit('notifySetting',false)

      }
    },
    computed:{
      ...mapGetters([
        'isShowPopup'
      ])

    }

  }

</script>
