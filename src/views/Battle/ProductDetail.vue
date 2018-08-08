<template>
	<div id="product-detail">
		<nav-bar :color="'red'" :title="'产品详情'"></nav-bar> 
		<div class="detail">
			<div class="name">{{productDetail.name}}</div>
		</div>
		<div class="kline">k线图</div>
		<div class="operation">

		</div>
	</div>
</template>

<script>
import NavBar from '@/components/NavBar'
export default {
	name: 'product-detail',
	data() {
		return {
			productDetail:{}
		}
	},
	created() {
		this.productDetail = this.$route.params.productDetail
		console.log(this.productDetail)
	},
	components: {
		NavBar
	}
}
</script>

<style lang="less" scoped>
#product-detail {
	font-size: 0.4rem;
	.detail {
		padding-top: 1.5rem;
		height: 5rem;
	}
	.kline {
		height: 7rem;
		background: #eeeeee;
		line-height: 7rem;
	}
	.operation {
		height: 5rem;
		// border: 1px solid blue;
	}
}
</style>

