<template>
  <div id="transaction">
		<nav-bar :color="'red'" :title="operation == 0 ? '买入交易' : '卖出交易'"></nav-bar> 
		<div class="wrapper">
			<div class="top">
				<div class="name">{{productDetail.name}}</div>
				<span class="price">{{operation == 0 ? productDetail.banksellp : productDetail.bankbuyp}}</span>
				<span class="time">{{curTime}}</span>
			</div>
			<div class="middle">
				<group>
					<!-- <cell title="可用资金"  -->
				</group>
			</div>
		</div>
	</div>
</template>

<script>
import { dateFormat, Group, Cell, XInput} from 'vux'
import NavBar from '@/components/NavBar'
export default {
	components: {
		NavBar,
		Group,
		Cell,
		XInput
	},
	data() {
		return {
			operation: 1,
			productDetail: {
				obj: 1,
				name: '人民币账户黄金',
				banksellp: 206.1212,
				bankbuyp: 206.5313
			}
		}
	},
	created() {
		this.operation = this.$route.params.operation
		this.productDetail = this.$route.params.productDetail
	},
	computed: {
		curTime: function() {
			return dateFormat(new Date(), 'HH:mm:ss')
		}
	}
}
</script>

<style lang="less" scoped>
#transaction {
	height: 100%;
	background: #f0f0f0;
	.wrapper {
		padding-top: 1.5rem;
		.top {
			margin: 0.2rem 0;
			padding: 0.3rem;
			background: white;

			text-align: left;
			.name {
				font-size: 0.4rem;
				
			}
			.price {
				font-size: 0.8rem;
				color: #c0000b;
			}
		}
	}
}
</style>
