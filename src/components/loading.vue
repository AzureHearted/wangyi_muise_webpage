<template>
	<div class="loading" :data-fixed="fixed">
		<img
			:style="loadingStyle"
			class="loading-image"
			src="@/assets/images/loading.gif"
			alt="" />
	</div>
</template>

<script>
	export default {
		props: {
			fixed: {
				type: Boolean,
				default: false,
			},
			width: {
				type: [String, Number],
				default: 20,
			},
			height: {
				type: [String, Number],
				default: 20,
			},
		},
		computed: {
			loadingStyle() {
				// 判断是否是数字，如果是数字，则加上px单位
				let w = typeof this.width === "number" ? this.width + "px" : this.width;
				let h =
					typeof this.height === "number" ? this.height + "px" : this.height;
				return { width: w, height: h };
			},
		},
	};
</script>

<style lang="less" scoped>
	// 加载样式
	.loading {
		text-align: center;

		&[data-fixed="true"] {
			position: fixed;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			z-index: 1000;
		}
		.loading-image {
			object-fit: contain;
		}
	}
</style>
