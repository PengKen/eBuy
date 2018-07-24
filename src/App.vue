<template>
  <div id="app">
    <router-view/>
  
  </div>
</template>

<script>
export default {
  name: 'App',
  components:{
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
