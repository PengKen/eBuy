<template>
  <transition :name="rotate">
    <router-view></router-view>
  </transition>

</template>

<script>
  export default {
    name: "index",
    data () {
      return {
        rotate:''
      }
    },
    watch:{
      $route (to, from, next) {
        if(to.meta.transform === "home")
          this.rotate = "home"
        else
          this.rotate = 'battle'
      }
    }
  }
</script>

<style  scoped>
  .home-enter-active,
  .home-leave-active,
  .battle-enter-active,
  .battle-leave-active
  {
    will-change: transform;
    /*will-change 会随过渡结束后整个类被移除的时候而被解绑，避免了过多cpu的浪费*/
    transition: all 500ms;
    position: absolute !important;
    transform-origin: left bottom;
  }
  .battle-enter{
    transform: rotateZ(90deg);
  }
  .battle-enter-to{
    transform: rotateZ(0deg);
  }

  .home-leave-to{
    transform: rotateZ(90deg);
  }


</style>
