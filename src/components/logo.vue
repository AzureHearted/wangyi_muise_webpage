<template>
	<h1 class="topfl">
		<span class="topplh">网易云音乐</span>
		<img class="topsvg" :src="logo" alt="" />
	</h1>
</template>

<script>
	import logo from "@/assets/svg/网易云音乐-0.svg";
	export default {
		data() {
			return {
				logo,
			};
		},
	};
</script>

<style lang="less" scoped>
	.topfl {
		position: relative;
		width: 142px;
		height: 25px;
	}
	.topplh {
		opacity: 0;
		color: #d43c33;
	}
	.topsvg {
		position: absolute;
		left: 0;
		top: 0;
		width: 142px;
		height: 25px;
	}
</style>
