<template>
	<div id="product-detail">
		<nav-bar :color="'red'" :title="'产品详情'"></nav-bar>
		<div class="detail">
			<div class="name">{{productDetail.productName}}</div>
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
						<div class="number">{{(productDetail.bankBuyp).toFixed(2)}}</div>
					</div>
					<div class="item">
						<div class="title">银行卖出价</div>
						<div class="number">{{(productDetail.bankSellp).toFixed(2)}}</div>
					</div>
					<div class="item">
						<div class="title">今日开盘价</div>
						<div class="number">{{openprice}}</div>
					</div>
					<div class="item">
						<div class="title">昨日收盘价</div>
						<div class="number">{{closeprice}}</div>
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
import * as API from '@/api/battle/battle'
import { mapGetters } from 'vuex'
import KLine from '@/components/KLine'
import { dynamicData } from '@/api/battle/kLine'
export default {
	name: 'product-detail',
	data() {
		return {
			productDetail: {
				productId:1,
				productName:'白金啊啊啊啊啊啊啊啊啊啊',
				bankBuyp:200.8927,
				bankSellp:203.2198,
				startSell:200.8922,
				startBuy:203.8922,
				endSell:200.8922,
				endBuy:203.8922,
			},
		}
	},
	created() {
		this.productDetail.productId = this.$route.query.obj //k线产品ID
    dynamicData(this.productDetail.productId,this.getKLineData)

		this.getDetail(this.$route.query.obj)
	},
	computed: {
		...mapGetters([
      'challengeState'
    ]),
		price: function() {
			return ((this.productDetail.bankSellp + this.productDetail.bankBuyp) / 2).toFixed(2)
		},
		openprice: function() {
			return ((this.productDetail.startSell + this.productDetail.startBuy) / 2).toFixed(2)
		},
		closeprice: function() {
			return ((this.productDetail.endSell + this.productDetail.endBuy) / 2).toFixed(2)
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
    getKLineData(KlineRawdata){
      this.$store.dispatch('battle/setKLineData',KlineRawdata).then(res=>{})
    },
		transaction(op) {
			// op: 0-buy, 1-sell
			if(this.challengeState == 2) {
				this.$router.push({ name:'transaction' , params:{productId:this.productDetail.productId, operation: op}})
			}else {
				this.$vux.alert.show({
					title: "失败",
					content: "您当前没有正在进行的比赛",
					onShow() {},
					onHide() {}
				});
			}

		},
		getDetail(productId) {
      API.getProductDetail(productId).then(res=>{
				this.productDetail = res;
      })
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
					width: 50%;
					padding: 0.1rem 0;
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
		// background: #eeeeee;
		line-height: 7rem;
	}
	.operation {
		display: flex;
		margin: 1rem auto;
		justify-content: center;
		// border: 1px solid blue;
		.btn {
			width: 30%;
			height: 1rem;
			line-height: 1rem;
			margin: 0 0.5rem;
			background: #c0000b;
			color: white;
			border-radius: 0.1rem;
			// border: 1px solid #c0000b;
			// color: #c0000b;
			// border: 1px solid blue;
		}
	}
}
</style>

