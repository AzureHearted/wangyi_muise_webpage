<template>
	<div class="hot-search">
		<h3 class="label">热门搜索</h3>
		<!-- 热门标签搜索列表 -->
		<div class="list">
			<van-tag
				v-for="(item, index) in hotSearches"
				:key="index"
				text-color="#333"
				plain
				round
				size="medium"
				@click="handleClick(item.first)"
				type="danger">
				{{ item.first }}
			</van-tag>
		</div>
	</div>
</template>

<script>
	/** 数据结构定义
	 *  @typedef {object} Data
	 *  @property {string} first
	 */
	export default {
		data() {
			return {
				/** @type {Data[]} */
				hotSearches: [], // 热门搜索
			};
		},
		created() {
			// 获取热门搜索
			this.getHotSearches();
		},
		methods: {
			// 获取热门搜索
			async getHotSearches() {
				// 发送请求
				let res = await this.$api.hotSearches();
				console.log("热门搜索", res.data);
				// 判断请求是否成功
				if (res.data.code === 200) {
					// 获取热门搜索数据
					this.hotSearches = res.data?.result?.hots;
					// console.log(this.hotSearches);
				}
			},
			// 点击热门搜索
			handleClick(value) {
				this.$emit("item-click", value);
			},
		},
	};
</script>

<style lang="less" scoped>
	// 热门搜索
	.hot-search {
		padding: 15px 10px 0;
		// 热门搜索标题
		.label {
			font-size: 12px;
			line-height: 12px;
			color: #666;
		}
		// 热门搜索列表
		.list {
			padding: 10px 0 7px;
		}
		// 热门搜索标签
		.van-tag {
			height: 32px;
			font-size: 14px;
			line-height: 32px;
			border-radius: 32px;
			padding: 0 14px;
			margin: 0 8px 8px 0;

			cursor: pointer;
		}
		// 热门搜索标签背景颜色
		.van-tag::before {
			position: absolute;
			z-index: 2;
			content: "";
			top: 0;
			left: 0;
			pointer-events: none;
			box-sizing: border-box;
			width: 100%;
			height: 100%;
			-webkit-transform-origin: top left;
			-ms-transform-origin: top left;
			transform-origin: top left;
			border: 0 solid rgba(0, 0, 0, 0.1);
			border-radius: inherit;
			border-width: 1px;
		}
	}
</style>
