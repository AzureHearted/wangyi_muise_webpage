<template>
	<div class="container">
		<!-- 顶部区域 -->
		<div class="top-bar">
			<!-- 图片 -->
			<img src="@/assets/images/logo.jpg" alt="" srcset="" />
			<!-- 导航栏 -->
			<van-tabs
				v-model="active"
				sticky
				title-inactive-color="#333"
				title-active-color="#DD001B">
				<van-tab
					title="推荐音乐"
					:to="{ name: 'recommend' }"
					name="recomment" />
				<van-tab title="热歌榜" :to="{ name: 'hot' }" name="hot" />
				<van-tab title="搜索" :to="{ name: 'search' }" name="search" />
			</van-tabs>
		</div>
		<div class="wrapper">
			<router-view />
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				active: "recommend",
			};
		},
	};
</script>

<style lang="less" scoped>
	.container {
		.top-bar {
			top: 0;
			position: sticky;
			// background: orange;
			background: transparent;
			img {
				width: 100%;
				vertical-align: top; // 消除img标签下方的空隙
			}
			border-bottom: 1px solid rgb(204, 204, 204);
		}
		.wrapper {
			// padding: 10px;
			// background: rgb(5, 106, 126);
			// background: bisque;
		}
	}
</style>
