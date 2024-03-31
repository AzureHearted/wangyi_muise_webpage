<template>
	<div class="home-container">
		<!-- 顶部区域 -->
		<div class="top-bar" ref="topBar">
			<!-- 下载引导 -->
			<TopDownload v-if="showTopDownload" @close="showTopDownload = false" />
			<!-- 导航标签 -->
			<van-tabs
				class="tags"
				v-model="active"
				swipeable
				line-width="70px"
				line-height="2px"
				title-inactive-color="#333"
				title-active-color="#DD001B"
				@change="toPage">
				<van-tab title="推荐音乐" name="/home/recommend" />
				<van-tab title="热歌榜" name="/home/hot" />
				<van-tab title="搜索" name="/home/search" />
			</van-tabs>
		</div>
		<!-- 内容区 -->
		<div class="wrapper" :style="wrapper.style">
			<keep-alive>
				<router-view />
			</keep-alive>
		</div>
	</div>
</template>

<script>
	import TopDownload from "./top-download"; // 导入顶部下载引导组件

	export default {
		components: { TopDownload },
		data() {
			return {
				active: "/home/recommend",
				showTopDownload: true, // 用于判断是否显示顶部下载引导组件
				wrapper: {
					style: {
						paddingTop: 0 + "px",
					},
				},
			};
		},
		watch: {
			// 监听showTopDownload
			showTopDownload(val, oldVal) {
				if (val !== oldVal) {
					// 发生变化重新设置wrapper的padding-top
					this.setWrapperPaddingTop();
				}
			},
		},
		created() {
			this.setWrapperPaddingTop();
			// 设置激活的标签
			this.active = this.$route.path;
		},
		methods: {
			/** 设置wrapper容器的padding-top */
			setWrapperPaddingTop() {
				// 获取wrapper的padding-top
				this.$nextTick(() => {
					let { height: topBarHeight } =
						this.$refs.topBar.getBoundingClientRect();
					// console.log(
					// 	"created(nexTick) —— topBar的高度",
					// 	Math.floor(topBarHeight)
					// );
					// 根据topBar的高度的设置内容区的padding-top
					this.wrapper.style.paddingTop = Math.floor(topBarHeight) + "px";
					this.$route.path;
				});
			},
			toPage(name, title) {
				this.$router.push(name);
			},
		},
	};
</script>

<style lang="less" scoped>
	.top-bar {
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		z-index: 4;
		// background: blue;
		// background: transparent;
		.van-tabs {
			position: relative;
		}
		// 下方border
		.van-tabs::after {
			content: "";
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			border: 0 solid rgba(0, 0, 0, 0.1);
			border-bottom-width: 1px;
		}
		/deep/.van-tabs__wrap {
			height: 40px;

			.van-tab__text {
				font-size: 15px;
			}
			// 修正激活时的标题字体
			.van-tab--active {
				font-weight: normal;
			}
		}
	}
	.wrapper {
		// padding-top: 124px;
		// background: rgb(5, 106, 126);
		// background: bisque;
	}
</style>
