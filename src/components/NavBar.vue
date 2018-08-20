<template>
  <div class="nav-bar" :class="color=='red' ? 'red' : 'white'">
		<back-arrow :color="color == 'red' ? 'white' : 'red'"></back-arrow>
		<div class="title" :class="color=='red' ? 'font-white' : 'font-red'">{{title}}</div>
	</div>
</template>

<script>
import BackArrow from "./BackArrow";
export default {
	name: 'nav-bar',
  components: {
    BackArrow
	},
	props: {
		color: {
			type: String,
			default: 'red'
		},
		title: {
			type: String,
			default: ''
		}
	}
};
</script>

<style lang="less">
.nav-bar {
	height: 1.5rem;
	background: wheat;
	position: fixed;
	top: 0;
	width: 100%;
	z-index: 100;
	// border-bottom: 1px solid #eeeeee;
	.title {
		line-height: 0.7rem;
		position: relative;
		top: 0.4rem;
		font-size: 0.45rem;
		// font-weight: bold;
	}
	.font-red {
		color: #c0000b;
	}
	.font-white {
		color: white;
	}
}

.red {
	background: linear-gradient(120deg, #f77062 0%, #c7000b 100%)
}
.white {
	background: white;
}
</style>
