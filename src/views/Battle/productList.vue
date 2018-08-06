<template>
  <div id="product-list">
		<div class="title">
			<span class="flex-4">产品</span>
			<span class="flex-3">银行买入价</span>
			<span class="flex-3">银行卖出价</span>
		</div>
		<div class="product" v-for="product in products">
			<span class="name">{{product.name}}</span>
			<span class="price red">{{product.priceIn}}</span>
			<span class="price green">{{product.priceOut}}</span>
		</div>
  </div>
</template>

<script>
export default {
  name: "product-list",
  props: {
    products: {
      type: Array
    }
  },
  data() {
    return {
    };
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
	.product{
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
		}
		.green {
			background: #44bb66;
		}
	}
	.product:active {
		background: #f9f9f9;
		transition: all 0.2s;
	}
}
</style>

