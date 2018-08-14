<template>
	<keep-alive>
    <div id="account-info">
			<nav-bar :color="'red'" :title="'持仓情况'"></nav-bar>
			<div class="wrapper">
				<div class="user">
					<div class="name">{{userInfo.name}}</div>
					<div class="data">
						<p class="balance">
							<span class="title">账户余额</span>
							<span class="num">{{accountInfo.balance}}</span>
						</p>
						<!-- <p class="rate">
							<span class="title">收益率</span>
							<span class="num">{{(accountInfo.rate*100).toFixed(2)}}%</span>
						</p> -->
					</div>
				</div>
				<div class="table">
					<div class="head">
						<span>产品</span>
						<span>持仓量</span>
					</div>
					<div class="body">
						<div class="item" v-for="(account, index) in accountInfo.accounts"
							@click="toProduct(index)">
							<span>{{account.productName}}</span>
							<span>{{account.amount}}</span>
						</div>
						<div v-if="accountInfo.accounts.length == 0" class="no-record">暂无持仓</div>
					</div>
				</div>
			</div>
		</div>
	</keep-alive>
</template>

<script>
import NavBar from '@/components/NavBar'
import * as API from '@/api/battle/battle'
export default {
	name: 'account-info',
	data() {
		return {
			userInfo: this.$route.query,
			accountInfo: {
				cardId: 1,
				balance: 323,
				rate: 0.3231,
				accounts: [
					// {
					// 	productId: 323,
					// 	productName: '人民币账户白金',
					// 	amount: 323,
					// },
					// {
					// 	productId: 323,
					// 	productName: '人民币账户白金',
					// 	amount: 323,
					// },
					// {
					// 	productId: 323,
					// 	productName: '人民币账户白金',
					// 	amount: 323,
					// },
					// {
					// 	productId: 323,
					// 	productName: '人民币账户白金',
					// 	amount: 323,
					// },
					// {
					// 	productId: 323,
					// 	productName: '人民币账户白金',
					// 	amount: 323,
					// },
				],
			}
		}
	},
	components: {
		NavBar
	},
	methods: {
		getAccounts() {
			console.log('get')
			API.getUserAccount(this.userInfo.userId).then(res => {
				this.accountInfo = res
			})
		},
		toProduct(index) {
			this.$router.push({
				path: "/battle/productdetail",
				query: { obj: this.accountInfo.accounts[index].productId }
			});
		}
	},
	created() {
		this.getAccounts()
	}
}
</script>

<style lang="less" scoped>
#account-info {
	background: #f5f5f5;
	height: 100%;
	.wrapper {
		padding-top: 1.5rem;
		font-size: 0.4rem;
		
		.user {
			display: flex;
			justify-content: space-between;
			margin: 0.3rem 0;
			padding: 0.3rem;
			border-top: 1px solid #eee;
			border-bottom: 1px solid #eee;
			background: white;
			.name {
				width: 8em;
				// white-space: nowrap;
				overflow: hidden;
				text-align: left;
				font-size: 0.5rem;
				vertical-align: middle;
			}
			.data {
				text-align: right;
				color: #888;
				font-size: 0.45rem;
				vertical-align: middle;
				.num {
					width: 4em;
					display: inline-block
				}
				.title {
					color: #c0000b;
					margin-right: 0.3rem;
				}
			}
			
		}
		.table {
			margin: 0.5rem 0;
			.head, .item {
				display: flex;
				span {
					flex: 1
				}
			}
			.head {
				background: white;
				border-top: 1px solid #eee;
				border-bottom: 1px solid #eee;
				padding: 0.2rem 0;
			}
			.body {
				background: #fafafa;
				border-bottom: 1px solid #eee;
				.item {
					line-height: 1rem;
					border-bottom: 1px solid #eee;
				}
				.item:active {
					background: #eee;
					transition: all 0.2s;
				}
				.no-record {
					line-height: 1.2rem;
				}
			}
		}
	}
}
</style>
