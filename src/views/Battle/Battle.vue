<template>
    <div id="battle">
      <div class="current">
        <div class="count-down-wrapper">
          <div>距离比赛结束还有</div>
          <div class="cnt"><span class="num">00</span>天<span class="num">00</span>时<span class="num">00</span>分<span class="num">00</span>秒</div>
        </div>
        <div class="battle-info">
          <div class="time">
            <span>开始时间：{{msToDate(battleDetail.startTime.time)}}</span>
            <span>结束时间：{{msToDate(battleDetail.endTime.time)}}</span>
          </div>
          <div class="init">初始资金：{{battleDetail.initialMoney}}元</div>
        </div>
        <div class="user-wrapper">
          <div class="user" v-for="user in users">
            <div><img class="portrait" :src="user.portrait"/></div>
            <div class="name">{{user.name}}</div>
            <div class="balance">总资产：{{user.balance}}</div>
            <div class="rate">收益率：{{(user.rate*100).toFixed(2)}}%</div>
          </div>
        </div>
      </div>
      <product-list id="product-list" :products="products"></product-list>
    </div>
</template>

<style lang="less" scoped>
#battle {
  // height: 100%;
  // overflow: hidden;
  padding-bottom: 1.3rem;
  font-size: 0.4rem;
  .current {
    .count-down-wrapper {
      background: #c7000b;
      color: white;
      padding: 0.2rem;
      .cnt {
        .num {
          font-size: 0.6rem;
          vertical-align: middle;
          padding: 0 0.2rem;
        }
      }
    }
    .battle-info {
      background: #f9f9f9;
      .time {
        display: flex;
        justify-content: space-around;
      }
    }
    .user-wrapper {
      display: flex;
      padding: 0.2rem;
      background: #f9f9f9;
      .user {
        flex: 1;
        margin: 0.2rem;
        padding: 0.3rem;
        // border: 1px solid #eeeeee;
        border-radius: 0.2rem;
        background: white;
        background: #c7000b20;
        .portrait {
          width: 1.5rem;
          height: 1.5rem;
          border-radius: 50%;
        }
        .name {
          font-size: 0.45rem;
          padding-bottom: 0.2rem;
        }
      }
    }
  }

  #product-list {
    height: 19rem;
    overflow: scroll
  }
}
</style>

<script>
import ProductList from './ProductList'
import * as DF from "@/utils/timeFormat";
export default {
  name: "battle",
  components: {
    ProductList
  },
  data() {
    return {
      battleDetail: {
        startTime: {time:86400000},
        endTime: {time:86400000},
        initialMoney: 100000,
      },
      users:[
        {
          portrait:'/static/img/portrait.jpg',
          name:'大投资家',
          balance: 124142.31,
          rate:0.2142
        },
        {
          portrait:'/static/img/portrait.jpg',
          name:'大投资家',
          balance: 124142.31,
          rate:0.2142
        }
      ],
      products:[
        {
          id:1,
          name:'白金啊啊啊啊啊啊啊啊啊啊',
          priceIn:200.8927,
          priceOut:203.2198
        },
        {
          id:2,
          name:'黄金',
          priceIn:200.8927,
          priceOut:203.2198
        },
        {
          id:3,
          name:'白金',
          priceIn:200.8927,
          priceOut:203.2198
        },
        {
          id:1,
          name:'白金啊啊啊啊啊啊啊啊啊啊',
          priceIn:200.8927,
          priceOut:203.2198
        },
        {
          id:2,
          name:'黄金',
          priceIn:200.8927,
          priceOut:203.2198
        },
        {
          id:3,
          name:'白金',
          priceIn:200.8927,
          priceOut:203.2198
        },
        {
          id:1,
          name:'白金啊啊啊啊啊啊啊啊啊啊',
          priceIn:200.8927,
          priceOut:203.2198
        },
        {
          id:2,
          name:'黄金',
          priceIn:200.8927,
          priceOut:203.2198
        },
        {
          id:3,
          name:'白金',
          priceIn:200.8927,
          priceOut:203.2198
        },
        {
          id:1,
          name:'白金啊啊啊啊啊啊啊啊啊啊',
          priceIn:200.8927,
          priceOut:203.2198
        },
        {
          id:2,
          name:'黄金',
          priceIn:200.8927,
          priceOut:203.2198
        },
        {
          id:3,
          name:'白金',
          priceIn:200.8927,
          priceOut:203.2198
        },
      ]
    }
  },
  methods: {
    msToDate(ms) {
      return DF.msToDate(ms);
    }
  }
};
</script>
