<template>
	<div id="product-detail">
		<nav-bar :color="'red'" :title="'产品详情'"></nav-bar>
		<div class="detail">
			<div class="name">{{productDetail.name}}</div>
			<div class="num">
				<div class="left">
					<div class="price" :class="change >= 0 ? 'color-red' : 'color-green'" >{{price}}</div>
					<div class="change">
						<div class="item">
							<div class="title">涨跌值</div>
							<div class="number" :class="change >= 0 ? 'color-red' : 'color-green'" >{{change}}</div>
						</div>
						<div class="item">
							<div class="title">涨跌幅</div>
							<div class="number" :class="change >= 0 ? 'color-red' : 'color-green'" >{{changepct}}</div>
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
						<div class="title">今开价</div>
						<div class="number">{{openprice}}</div>
					</div>
					<div class="item">
						<div class="title">昨收价</div>
						<div class="number">{{openprice}}</div>
					</div>
				</div>
			</div>
		</div>
		<div class="kline">
      <K-line></K-line>
    </div>
		<div class="operation">
			<div class="btn" @click="transaction(0)">买入</div>
			<div class="btn" @click="transaction(1)">卖出</div>
		</div>
	</div>
</template>

<script>
import NavBar from '@/components/NavBar'
import KLine from '@/components/KLine'
export default {
	name: 'product-detail',
	data() {
		return {
			productDetail: {
				obj:1,
				name:'白金啊啊啊啊啊啊啊啊啊啊',
				bankbuyp:200.8927,
				banksellp:203.2198,
				openbankbuyp:200.8922,
				openbanksellp:203.8922,
			},
		}
	},
	created() {
		this.productDetail.obj = this.$route.query.obj
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
		NavBar,
    KLine
	},
	methods: {
		transaction(op) {
			// op: 0-buy, 1-sell
			this.$router.push({ name:'transaction' , params:{productDetail:this.productDetail, operation: op}})
		}
	}
}
</script>

<style lang="less" scoped>
#product-detail {
	width: 100%;
	font-size: 0.4rem;
	.color-red {color: #ee3333}
	.color-green {color: #44bb66}
	.detail {
		// margin-top: 1.5rem;
		padding: 1.8rem 0.3rem 0.3rem;
		// background: #ee3333;
		// background: #44bb66;
		// color: white;
		.name {
			text-align: left;
			font-size: 0.5rem;
			padding: 0.2rem 0.5rem;
		}
		.num {
			display: flex;
			justify-content: space-around;
			.left, .right {
				padding: 0 0.2rem
			}
			.left {
				flex: 4;
				.price {
					font-size: 0.8rem;
				}
				.change {
					display: flex;
					.item {
						padding: 0.2rem 0.3rem;
						.title {
							font-size: 0.3rem;
							color:#888888;
						}
					}
				}
			}
			.right {
				flex: 6;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				.item {
					flex: 1;
					padding: 0.1rem 0rem 0.1rem 0.5rem;
					.title {
						font-size: 0.3rem;
						color:#888888;
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
		display: flex;
		box-sizing: border-box;
		position: fixed;
		bottom: 0.5rem;
		left: 0;
		right: 0;
		justify-content: center;
		// border: 1px solid blue;
		.btn {
			width: 30%;
			height: 1rem;
			line-height: 1rem;
			margin: 0 0.5rem;
			// background: linear-gradient(120deg, #f77062 0%, #c7000b 100%);
			border-radius: 0.2rem;
			border: 1px solid #c0000b;
			color: #c0000b;
			// border: 1px solid blue;
		}
	}
}
</style>

