<template>

		<div id="cnt-down" class="cnt">
			<span class="num">{{day}}</span><span>天</span>
			<span class="num">{{hour}}</span><span>时</span>
			<span class="num">{{min}}</span><span>分</span>
			<span class="num">{{sec}}</span><span>秒</span>
		</div>

</template>

<script>
import { setInterval, clearInterval } from 'timers';
import { parse } from 'querystring';
export default {
	name: 'time-count',
	props: {
		endTime: {
			type: Number
		}
	},
	data() {
		return {
			day:'00',
			hour:'00',
			min:'00',
			sec:'00',
			flag: false
		}

	},
	mounted() {
		let id = setInterval(()=>{
			if(this.flag == true) {
				clearInterval(id)
			}
			this.timeDown()
		}, 500)
	},
	methods: {
		timeDown() {
			const now = new Date().getTime();
			var timeLeft = parseInt((this.endTime-now)/1000);
			this.day = parseInt(timeLeft/(24*60*60))
			this.hour = this.formate(parseInt(timeLeft/(60*60)%24))
			this.min = this.formate(parseInt(timeLeft/60%60))
			this.sec = this.formate(timeLeft%60)
			if(timeLeft <= 0) {
				this.flag = true;
			}
		},
		formate(time) {
			if(time >= 10) {
				return time
			}else{
				return `0${time}`
			}
		}
	}
}
</script>

<style lang="less" scoped>
	#cnt-down {
		line-height: 0.7rem;
		.num {
			font-size: 0.6rem;
			vertical-align: middle;
			padding: 0 0.2rem;
			display: inline-block;
			width: 1em;
			text-align: right
		}
	}
</style>

