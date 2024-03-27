<template>
	<footer class="m-homeft">
		<!-- 容器 -->
		<div class="ftwrap">
			<!-- logo -->
			<div class="logo">
				<img class="logosvg" src="@/assets/svg/网易云音乐-1.svg" />
			</div>
			<!-- 按钮 -->
			<div class="openapp">打开APP，发现更多好音乐 &gt;</div>
			<!-- 版权声明 -->
			<p class="copyright">
				网易公司版权所有©1997-2024 杭州乐读科技有限公司运营
			</p>
		</div>
	</footer>
</template>

<script>
	export default {};
</script>

<style lang="less" scoped>
	// 底部
	.m-homeft {
		position: relative;
		padding-top: 53.3%;
		margin-top: 4px;
		background: url(//s3.music.126.net/mobile-new/img/recommand_bg_2x.png?d045fafc60e017b653f8065a87496922=)
			no-repeat;
		background-size: contain;
		// 容器
		.ftwrap {
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0;
			top: 0;
			z-index: 1;
			text-align: center;
			// logo
			.logo {
				padding-top: 12%;
				.logosvg {
					display: block;
					margin: 0 auto;
					width: 230px;
					height: 44px;
				}
			}
			// 打开app
			.openapp {
				line-height: 38px;
				border: 1px solid #d33a31;
				border-radius: 38px;
				font-size: 16px;
				color: #d33a31;
				margin: 15px 37px 5px;
				text-align: center;
			}
			// 版权
			.copyright {
				color: #888;
				font-size: 12px;
				line-height: 16px;
				-webkit-transform: scale(0.75);
				-ms-transform: scale(0.75);
				transform: scale(0.75);
			}
		}
	}
</style>
```
