<template>
  <div id="rule">
    <back-arrow></back-arrow>
    <div class="img"><img src="/static/img/eBuyPoster.jpg" alt=""></div>
    <div class="article">
      <h1>活动规则</h1>
      <div class="content">
        <p> 1. 活动时间：2018年7月30日-2018年10月31日</p>
        <p> 2. 活动范围：中国工商银行用户即可参与</p>
        <p> 3. 参与方式：在游戏大厅页面摆擂台等待挑战者或邀请用户进行PK。在对战平台查看行情并进行模拟交易行为。每场对战根据收益率决出胜者，胜率越高就能获得更高的称号，还将有机会出现在首页的排行榜。</p>
        <p> 4. 活动奖励：说不定就有了</p>
        <p> 5. 活动主办方：中国工商银行</p>
      </div>
    </div>
  </div>
</template>

<script>
import BackArrow from '@/components/BackArrow'
export default {
  name: "rule",
  components: {
    BackArrow
  }
};
</script>

<style lang="less" scoped>
  #rule {
    position: relative;
    height: 100%;
    font-size: 0.4rem;
    overflow: hidden;
    background: white;
    .img {
      top: 0;
      left: 0;
      width: 100%;
      height: 30%;
      background: white;
      img {
        width: 100%;
        height: 100%;
        // object-fit: cover;
      }
    }
    .article {
      padding: 0.5rem;
      list-style-type: none;
      z-index: -1;
      top: 30%;
      height: 70%;
      box-sizing: border-box;
      overflow: scroll;
      line-height: 0.9rem;
      h1 {
        color: #c7000b;
        font-size: 0.6rem;
      }
      h1:before, h1:after {
        content: "◇";
        margin: 0 0.2rem;
      }
      .content {
        text-align: justify;
        color: #666666;
        .subtitle {
          text-indent: 0;
          text-align: center;
          font-size: 0.45rem;
          color: #af0812;
          width: auto;
          border-bottom: 2px solid  #c7000b44;
          // box-shadow: 0 1px 5px #c7000b55;
          margin: 0.1rem 0;
        }
      }
    }

  }
</style>
