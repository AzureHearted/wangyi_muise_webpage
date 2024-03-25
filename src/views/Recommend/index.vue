<template>
	<div class="container">
		<h2 class="remd_tl">编辑推荐</h2>
	</div>
</template>

<script>
	export default {};
</script>

<style lang="less" scoped>
	.container {
		padding-top: 20px;
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
	}
</style>
