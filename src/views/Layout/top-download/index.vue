<template>
	<div class="topfix">
		<Logo />
		<downloadButton @click="handleClick" />
	</div>
</template>

<script>
	import Logo from "@/components/logo.vue";
	import downloadButton from "./download-button.vue";
	export default {
		components: { Logo, downloadButton },
		methods: {
			handleClick() {
				this.$emit("close");
			},
		},
	};
</script>

<style lang="less" scoped>
	.topfix {
		// position: fixed;
		position: relative;
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		-ms-flex-pack: justify;
		justify-content: space-between;
		-webkit-box-align: center;
		-webkit-align-items: center;
		-ms-flex-align: center;
		align-items: center;
		padding: 0 10px;
		height: 83px;
		left: 0;
		right: 0;
		z-index: 5;

		// 遮罩背景
		&::after {
			content: "";
			position: absolute;
			background: #d43c33;
			inset: 0;
			z-index: -10000;
		}
	}
</style>
