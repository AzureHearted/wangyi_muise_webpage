<template>
	<div class="topfix">
		<Logo />
		<downloadButton @click="handleClick" />
	</div>
</template>

<script>
	import Logo from "@/components/logo";
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
		top: 0;
		left: 0;
		z-index: 100;
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
		width: 100%;
		height: 84px;
		background-color: #d43c33;
		box-sizing: border-box;
	}
</style>
