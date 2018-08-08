<template>
	<div id="product-detail">
		<nav-bar :color="'red'" :title="'产品详情'"></nav-bar> 
		<div class="detail">
			<div class="name">{{productDetail.name}}</div>
			<div class="num">
				<div class="left">
					<div class="price">{{price}}</div>
					<div class="change">
						<div class="item">
							<div class="title">涨跌值</div>
							<div class="number">{{change}}</div>		
						</div>
						<div class="item">
							<div class="title">涨跌幅</div>
							<div class="number">{{changepct}}</div>		
						</div>
					</div>
				</div>
				<div class="right">
					<div class="item">
						<div class="title">银行买入价</div>
						<div class="number">{{(productDetail.bankbuyp).toFixed(2)}}</div>		
					</div>
					<div class="item">
						<div class="title">银行卖出价</div>
						<div class="number">{{(productDetail.banksellp).toFixed(2)}}</div>
					</div>
					<div class="item">
						<div class="title">开盘价</div>
						<div class="number">{{openprice}}</div>
					</div>
					<div class="item">
						<div class="title">收盘价</div>
						<div class="number">{{openprice}}</div>
					</div>
				</div>
			</div>
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
	},
	computed: {
		price: function() {
			return ((this.productDetail.banksellp + this.productDetail.bankbuyp) / 2).toFixed(2)
		},
		openprice: function() {
			return ((this.productDetail.openbanksellp + this.productDetail.openbankbuyp) / 2).toFixed(2)
		},
		change: function() {
			return (this.price - this.openprice).toFixed(2)
		},
		changepct: function() {
			return ((this.change / this.openprice)*100).toFixed(2)+'%'
		}
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
		margin-top: 1.5rem;
		padding: 0.3rem;
		.name {
			text-align: left;
			font-size: 0.5rem;
		}
		.num {
			display: flex;
			justify-content: space-around;
			.left, .right {
				padding: 0 0.2rem
			}
			.left {
				.price {
					font-size: 0.8rem;
				}
				.change {
					display: flex;
					.item {
						padding: 0.2rem 0.3rem;
						.title {
							font-size: 0.3rem
						}
					}
				}
			}
			.right {
				display: flex;
				flex-wrap: wrap;
				.item {
					flex: 1;
					padding: 0.1rem 0.5rem;
					.title {
						font-size: 0.3rem;
					}
				}
			}
		}
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

