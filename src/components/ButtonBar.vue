<template>
  <div id="button-bar">
    <ul class="wrapper">
      <router-link :to="{ name: 'Home', params: {}}" >
        <li>
          <i class="icon iconfont icon-home-copy"></i>
          <div class="name">首页</div>
        </li>
      </router-link>

      <router-link :to="{ name: 'Home', params: {}}">
        <li>
          <i class="icon iconfont icon-duizhanpingtai"></i>
          <div class="name">对战平台</div>
        </li>
      </router-link>

      <router-link :to="{ path:'/battlehall', params: {}}">
        <li>
          <i class="icon iconfont icon-youxidating"></i>
          <div class="name">游戏大厅</div>
        </li>
      </router-link>

      <router-link :to="{ name: 'Home', params: {}}">
        <li>
          <i class="icon iconfont icon-profile"></i>
          <div class="name">我 的</div>
        </li>
      </router-link>




    </ul>
  </div>

</template>
<script>
  export default {
    name: "button-bar"
  }
</script>

<style scoped lang="less">
  #button-bar{

    .wrapper{
      width: 100%;
      height: 1.5rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
      color: black;

      li{
        font-size: 0.3rem;
        flex: 0 1 auto;
        list-style: none;
        color: black;
      }
      .router-link-active>li{
        color:red !important;
      }

    }
  }
</style>

