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


</style>
