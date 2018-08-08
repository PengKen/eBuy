<template>
    <img
      class="back-arrow"
      :src="getSrc(color)"
      @click="back()"
    >
</template>

<script>
export default {
    name: "back-arrow",
    props:{
      common:{
        type:Boolean,
        default:false
      },
      color: {
        type: String,
        default: 'red'
      }
    },
    methods: {
        back() {
          if(!this.common){
            this.$router.go(-1);
          }else{
            this.$emit('selfHandle')
          }
        },
        getSrc(color) {
          if(color == 'red')
            return '/static/icon-img/icons8-back-26.png'
          else 
            return '/static/icon-img/icons8-back-26-white.png'
        }
    }
}
</script>

<style>
    .back-arrow {
        width: 0.7rem;
        height: 0.7rem;
        position: fixed;
        left:0.4rem;
        top:0.4rem;
        z-index: 100;
    }
</style>
