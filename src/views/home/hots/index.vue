<template>
	<div class="container">
		<!-- 顶部 -->
		<HotTop />
		<!-- 榜单 -->
		<TopList />
	</div>
</template>

<script>
	import HotTop from "./hot-top.vue";
	import TopList from "./top-list.vue";

	export default {
		components: {
			HotTop,
			TopList,
		},
		data() {
			return {
				/** @type {Data[]} */
				list: [], // 列表数据
				updateTime: new Date(), // 更新时间
				loading: false,
				finished: false,
			};
		},
	};
</script>

<style lang="less" scoped></style>
