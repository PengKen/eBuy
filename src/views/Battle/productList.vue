<template>
  <div id="product-list">
		<div class="title">
			<span class="flex-4">产品</span>
			<span class="flex-3">银行买入价</span>
			<span class="flex-3">银行卖出价</span>
		</div>
		<div class="product" v-for="(product, index) in products" @click="toProduct(index)">
			<span class="name">{{product.name}}</span>
			<span class="price"
			:class="product.bankbuyp >= product.openbankbuyp ? 'red' : 'green'">
			{{(parseFloat(product.bankbuyp)).toFixed(4)}}</span>
			<span class="price"
			:class="product.banksellp >= product.openbanksellp ? 'red' : 'green'">
			{{(parseFloat(product.banksellp)).toFixed(4)}}</span>
		</div>
    <load-more :show-loading="showLoading" tip="正在加载"></load-more>
  </div>
</template>

<script>
  import { LoadMore } from 'vux'
export default {
  name: "product-list",
  components: {
    LoadMore
  },
  data() {
    return {
      showLoading:false
    };
  },
  created(){
    this.showLoading = true
    const io = require('socket.io-client')
    var socket = io('http://192.168.43.118:3000');
    socket.on('connect', (msg)=> {
      socket.on('message', (msg)=> {
        this.showLoading = false
        try {
          console.log(msg)
          this.products = JSON.parse(msg.productDetail)
        } catch (error) {
          console.log("parse error")
        }
      })
    })
  },
  methods: {
    toProduct(index) {
      this.$router.push({
        path: "/battle/productdetail",
        query: { obj: this.products[index].obj }
      });
    }
  }
};
</script>

<style lang="less" scoped>
#product-list {
  font-size: 0.4rem;
  background: white;
  position: relative;
  .title {
    display: flex;
    padding: 0.3rem;
    align-items: center;
    background: #eeeeee;
    font-size: 0.35rem;
    color: #888888;
    .flex-4 {
      flex: 4;
      text-align: left;
    }
    .flex-3 {
      flex: 3;
    }
  }
  .product {
    display: flex;
    align-items: center;
    padding: 0.3rem;
    border-bottom: 1px solid #eeeeee;
    background: white;
    .name {
      flex: 4;
      text-align: left;
      white-space: nowrap;
      overflow: hidden;
    }
    .price {
      flex: 3;
      color: white;
      margin-left: 0.2rem;
      padding: 0.1rem 0;
      box-sizing: border-box;
    }
    .red {
      background: #ee3333;
      // color: #ee3333;
    }
    .green {
      background: #44bb66;
      // color: #44bb66;
    }
  }
  .product:active {
    background: #f9f9f9;
    transition: all 0.2s;
  }
}
</style>

