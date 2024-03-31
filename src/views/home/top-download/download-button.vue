<template>
	<div class="topfr" @click="handleClick">
		<span class="f-bd f-bd-full topbton">下载APP</span>
	</div>
</template>

<script>
	export default {
		methods: {
			handleClick() {
				this.$emit("click");
			},
		},
	};
</script>

<style lang="less" scoped>
	.topfr {
		border: 1px;
	}
	.topbton {
		position: relative;
		display: inline-block;
		height: 36px;
		line-height: 36px;
		font-size: 16px;
		width: 100px;
		text-align: center;
		color: #d43c33;
		background-color: #fff;
		border-radius: 37.5% / 100%;
	}
</style>
