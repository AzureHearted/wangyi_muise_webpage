<template>
	<div class="container">
		<!-- 搜索框 -->
		<van-search
			v-focus
			v-model="value"
			shape="round"
			autofocus
			placeholder="搜索歌曲、歌手、专辑" />
		<!-- 热门搜索 -->
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
					@click="handleSearch(item.first)"
					type="danger">
					{{ item.first }}
				</van-tag>
			</div>
		</div>
		<!-- 匹配结果展示 -->
		<div class="match-result"></div>
		<!-- 搜索结果展示 -->
		<div class="search-result"></div>
	</div>
</template>

<script>
	/** 数据结构定义
	 *  @typedef {object} Data
	 *  @property {string} first
	 */
	export default {
		directives: {
			focus: {
				inserted(el) {
					el.querySelector("input").focus();
					// el.focus();
				},
			},
		},
		data() {
			return {
				value: "",
				hotSearches: [],
			};
		},
		created() {
			this.getHotSearches();
		},
		methods: {
			// 获取热门搜索
			async getHotSearches() {
				let res = await this.$api.hotSearches();
				console.log("热门搜索", res.data);
				if (res.data.code === 200) {
					this.hotSearches = res.data.result?.hots;
					// console.log(this.hotSearches);
				}
			},
			// 搜索
			async handleSearch(keywords) {
				this.value = keywords;
			},
		},
		data() {
			return {
				value: "",
				/** @type {Data[]} */
				hotSearches: [],
			};
		},
	};
</script>

<style lang="less" scoped>
	// 搜索框
	.van-search {
		position: relative;
		padding: 15px 10px;

		&::after {
			content: "";
			position: absolute;
			left: 0;
			bottom: 0;
			right: 0;

			border: 0px solid rgba(0, 0, 0, 0.1);
			border-bottom-width: 1px;
		}
		.van-search__content {
			background: #ebecec;
		}
		.van-cell {
			padding: 0;
			height: 30px;
			line-height: 30px;
			font-size: 14px;
			box-sizing: border-box;
		}
		// 搜索图标
		/deep/.van-icon-search:before {
			color: #c9c9ca;
			font-size: 14px;
		}
		/deep/.van-field__clear {
			margin: 0;
		}
	}
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

			// 热门搜索标签
			.van-tag {
				height: 32px;
				font-size: 14px;
				line-height: 32px;
				border-radius: 32px;
				padding: 0 14px;
				margin: 0 8px 8px 0;

				cursor: pointer;

				&::before {
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
		}
	}
</style>
