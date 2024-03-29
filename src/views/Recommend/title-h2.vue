<template>
	<h2 class="remd_tl">{{ content }}</h2>
</template>

<script>
	export default {
		props: {
			content: {
				type: String,
				// required: true,
			},
		},
	};
</script>

<style lang="less" scoped>
	// "编辑推荐"标题样式
	.remd_tl {
		position: relative;
		padding-left: 9px;
		margin-bottom: 14px;
		font-size: 17px;
		height: 20px;
		line-height: 20px;

		&::after {
			content: " ";
			position: absolute;
			left: 0;
			top: 50%;
			margin-top: -9px;
			width: 2px;
			height: 16px;
			background-color: #d33a31;
		}
	}
</style>
