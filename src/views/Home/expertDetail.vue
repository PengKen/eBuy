<template>
  <div id="expert-detail">
    <nav-bar :title="'专家指导'"></nav-bar>
    <div class="img"><img :src="require('./img/expert.jpg')" alt=""></div>
    <div class="article">
      <h1>专家为您讲解股票交易</h1>
      <div class="content">
        <p class="subtitle">一、观察股只曲线，判断股票买点</p>
        <p>1.第一阶段盘底完成以大成交量（越大越好，说明庄家彻底扫盘的决心越大）支撑5日均线以中大阳线≥3％的陡峭角度向上进行突破，当日盘中的任何一次回调低点都是坚决买进的点位。操作中切忌患得患失计较价位高低，必须确保一定能够买进。有条件者以30分钟分时图表的均线系统的金叉向上为最佳买点。</p>
        <p>2.第二阶段上涨阶段的初中期每一次回档缩量≤5日均量后，5日均线再次带量上扬均是理想买点。有条件者以60分钟分时均线系统的向上金叉为最佳买点。</p>
        <p>3.中线只要30日均线没有走平，它的方向仍然向上，就坚决持仓，千万不要为庄家短线展开的凶狠洗盘恐吓动作所吓倒。在你的操作水平提高以后，短线操作可以5日均线的方向作为进出依据。5日均线的方向是每个股票上涨下跌已经开始的信号弹，留意信号，做出准确判断。</p>
        <p class="subtitle">二、把握股票股只卖点，谨慎小心操作</p>
        <p>1、绝对不能简单地认为一只股票涨的高了就应该卖出。涨的高说明它表现好。你的任何一次临盘操作都必须具备技术上的充分依据，避免随意卖出处于强烈涨升加速期的大黑马股票。</p>
        <p>2、精彩卖点：在第三阶段盘头阶段30日均线走平，成交量的放大和萎缩没有规则，阶段性天量出现。此时一旦5日均线走平，朝下的信号一旦发出就必须立即出货。均线系统的向下死叉更是普通人都知道的必杀信号。</p>
        <p>3、逃命卖点：第四阶段下跌阶段30日均线一旦朝下必须全线清仓离场去舞厅跳舞。在下降通道中每一次股价反弹到30日均线掉头向下时均是套牢盘最后的逃命机会。</p>
        <p>综上，在操作动作的展开中你的心态能够做到执行计划有决心，临盘进出操作有狠心。耐心、细心、决心、狠心四心具备，你可以纵横驰奔，征战沙场去夺取最大的胜利了。</p>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
export default {
  name: "expert-detail",
  components: {
    NavBar
  }
};
</script>

<style lang="less" scoped>
  #expert-detail {
    -webkit-overflow-scrolling:touch;
    position: relative;
    // height: 100%;
    font-size: 0.4rem;
    // overflow: hidden;
    .img {
      top: 0;
      left: 0;
      width: 100%;
      height: 30%;
      background: white;
      img {
        width: 100%;
        height: 100%;
        padding-top: 1.5rem;
        // object-fit: cover;
      }
    }
    .article {
      padding: 0.3rem;
      list-style-type: none;
      z-index: -1;
      top: 30%;
      // height: 70%;
      box-sizing: border-box;
      // overflow: scroll;
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
        text-indent: 2em;
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
