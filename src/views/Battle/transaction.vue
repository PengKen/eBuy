<template>
  <div id="transaction">
		<nav-bar :color="'red'" :title="operation == 0 ? '买入交易' : '卖出交易'"></nav-bar> 
		<div class="wrapper">
			<div class="top">
				<div class="name">{{productDetail.productName}}</div>
				<div class="p">
					<span class="price">{{operation == 0 ? (productDetail.bankSellp).toFixed(4) : (productDetail.bankBuyp).toFixed(4)}}</span>
					<span class="time">{{curTime}}</span>
				</div>
			</div>
			<div class="middle">
				<group>
					<cell title="账户余额" :value="accountInfo.balance"></cell> 
					<cell title="当前持仓" :value="accountInfo.amount"></cell> 
					<cell v-if="operation==0" title="最多可买数量" :value="mostAmount"></cell> 
				</group>
				<group>
					<!-- <x-input title="交易数量" 
						type="number" 
						v-model="input" 
						text-align="right" 
						placeholder="请输入交易数量">
					</x-input> -->
					<x-number 
						v-model="input" 
						title="交易数量" 	
						width="100px" 
						:min= 1
						fillable>
					</x-number>
					<cell title="市值" :value="value"></cell> 
				</group>
			</div>
			<div class="btn" @click="submit()">确认</div>
		</div>
	</div>
</template>

<script>
import { dateFormat, Group, Cell, XInput, XNumber} from 'vux'
import { mapGetters } from 'vuex'
import NavBar from '@/components/NavBar'
import * as API from '@/api/battle/battle'
export default {
	components: {
		NavBar,
		Group,
		Cell,
		XInput,
		XNumber
	},
	data() {
		return {
			operation: 1,
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
			accountInfo: {
				balance: 10000,
				amount: 1000,
			},
			input: 1,
		}
	},
	created() {
		this.operation = this.$route.params.operation
		this.productDetail.productId = this.$route.params.productId
		this.getProductAccount()
		API.getProductDetail(this.productDetail.productId).then(res=>{
				this.productDetail = res;
    })
	},
	computed: {
		...mapGetters([
      'userId'
    ]),
		curTime: function() {
			return dateFormat(new Date(), 'HH:mm:ss');
		},
		mostAmount: function() {
			return Math.floor(this.accountInfo.balance / this.productDetail.bankSellp)
		},
		value: function() {
			if(this.operation == 0) { //buy
				return (this.input * this.productDetail.bankSellp).toFixed(4)
			}else { //sell
				return (this.input * this.productDetail.bankBuyp).toFixed(4)
			}
		}
	},
	methods: {
		submit() {
			if(this.operation == 0) {//buy
				if(this.input > this.mostAmount) {
					this.$vux.alert.show({
						title: "失败",
						content: "输入数量不能大于可买数量",
						onShow() {},
						onHide() {}
					});
				}else {
					this.postBuyProduct()
				}
			}else { //sell
				if(this.input > this.accountInfo.amount) {
					this.$vux.alert.show({
						title: "失败",
						content: "输入数量不能大于持仓数量",
						onShow() {},
						onHide() {}
					});
				}else {
					this.postSellProduct()
				}
			}
		},
		getProductAccount() {
      API.getProductAccount(this.userId, this.productDetail.productId).then(res=>{
				this.accountInfo = res;
      })		
		},
		postSellProduct() {
			var transactionInfo = {
				userId: this.userId,
				productId: this.productDetail.productId,
				amount: this.input,
				lockPrice: this.productDetail.bankBuyp
			};
			API.postSellProduct(transactionInfo).then(res=>{
				if(res.code == 0) { //success
					var that = this
					this.$vux.alert.show({
						title: "成功",
						content: "交易成功",
						onShow() {},
						onHide() {
							console.log(that.$router)
							that.$router.go(-1);
						}
					});
				}else {
					this.$vux.alert.show({
						title: "失败",
						content: res.data,
						onShow() {},
						onHide() {}
					});
				}
      })
		},
		postBuyProduct() {
			var transactionInfo = {
				userId: this.userId,
				productId: this.productDetail.productId,
				amount: this.input,
				lockPrice: this.productDetail.bankSellp
			};
			API.postBuyProduct(transactionInfo).then(res=>{
				if(res.code == 0) { //success
					var that = this
					this.$vux.alert.show({
						title: "成功",
						content: "交易成功",
						onShow() {},
						onHide() {
							console.log(that.$router)
							that.$router.go(-1);
						}
					});
				}else {
					this.$vux.alert.show({
						title: "失败",
						content: res.data,
						onShow() {},
						onHide() {}
					});
				}
      })
		}
	}
}
</script>

<style lang="less" scoped>
#transaction {
	height: 100%;
	background: #f9f9f9;
	font-size: 0.4rem;
	.wrapper {
		padding-top: 1.5rem;
		text-align: left;
		.top {
			margin: 0.5rem 0;
			padding: 0.3rem;
			background: white;
			border-top: 1px solid #eeeeee;
			border-bottom: 1px solid #eeeeee;
			text-align: left;
			.name {
				font-size: 0.5rem;
				
			}
			.p {
				display: flex;
				justify-content: space-between;
				align-items: baseline;
				.price {
					font-size: 0.8rem;
					color: #c0000b;
				}
				.time {
					text-align: right;
				}	
			}
		}
		.btn {
			text-align: center;
			width: 80%;
			margin: 1rem auto;
			padding: 0.2rem;
			background: #c0000b;
			color: white;
			border-radius: 0.1rem;
		}
	}
}
</style>
