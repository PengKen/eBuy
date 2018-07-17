<template>
  <div id="app">
    <router-view/>
    <button-bar class="button"></button-bar>
  </div>
</template>

<script>
import ButtonBar from '@/components/ButtonBar'
export default {
  name: 'App',
  components:{
    ButtonBar
  }
}
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';
html,body{
  height: 100%;
}
#app {
  height: 100%;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  .button{

    width: 100%;
    position:absolute;
    bottom: 0;
    /*background:rgba();*/
  }
}
</style>
