<template>
	<div class="container">
		<!-- 搜索框 -->
		<van-search
			ref="search"
			v-focus
			v-model="value"
			shape="round"
			autofocus
			placeholder="搜索歌曲、歌手、专辑"
			@click="getSearchSuggest"
			@search="handleSearch" />
		<!-- 热门搜索 -->
		<SearchHotList
			v-show="!(showSearchResult || showSearchSuggest)"
			@item-click="handleSearch" />
		<!-- 搜索建议 -->
		<SearchSuggest
			ref="searchSuggest"
			:loading="loading"
			@update-loading="loading = $event"
			:keywords="value"
			v-show="showSearchSuggest && !showSearchResult"
			@to-search="handleSearch" />
		<!-- 搜索结果展示 -->
		<div class="search-result" v-show="showSearchResult">
			<!-- 搜索结果列表 -->
			<BaseList
				:list="searchResult"
				:finished="finished"
				v-model="loading"
				none-text="暂无搜索结果"
				@load="handleSearch(value)">
				<template slot="custom" slot-scope="{ item }">
					<!-- 音乐项定义 -->
					<MusicItem
						:id="item.id"
						:name="item.name"
						:alias="item.alia"
						:artists="item.ar"
						:is-sq-music="!!item.sq"
						@click="toPlay(item.id)" />
				</template>
				<template #loading>
					<span></span>
				</template>
			</BaseList>
		</div>
		<Loading fixed v-show="loading" />
	</div>
</template>

<script>
	import BaseList from "@/components/base-list.vue";
	import MusicItem from "@/components/music-item.vue";
	import SearchHotList from "./search-hot-list.vue";
	import SearchSuggest from "./search-suggest.vue";
	import Loading from "@/components/loading.vue";

	export default {
		components: { SearchHotList, SearchSuggest, BaseList, MusicItem, Loading },
		directives: {
			// 自定义指令：自动获取焦点
			focus: {
				inserted(el) {
					el.querySelector("input").focus();
					// el.focus();
				},
			},
		},
		data() {
			return {
				value: "", // 搜索框内容
				searchResult: [], // 搜索结果
				showSearchSuggest: false, // 是否显示搜索建议
				// 搜索结果分页
				showSearchResult: false, // 是否显示搜索结果
				page: 1, // 当前页码
				pageSize: 20, // 每页显示条数
				total: 0, // 总条数
				// 加载状态相关属性
				loading: false, // 加载状态
				finished: false, // 是否加载完成
			};
		},
		computed: {},
		watch: {
			// 监听搜索框内容变化
			value(newVal) {
				if (newVal) {
					this.showSearchSuggest = true;
				} else {
					// 如果搜索框内容为空，则隐藏搜索建议
					this.showSearchSuggest = false;
					this.showSearchResult = false;
					// 重置搜索结果数据
					this.resetSearchResult();
				}
			},
		},
		created() {},
		methods: {
			// 获取搜索建议
			async getSearchSuggest() {
				this.showSearchResult = false; // 隐藏搜索结果列表
				this.resetSearchResult(); // 重置搜索结果数据
				this.$refs.searchSuggest.getSearchSuggest(); // 调用子组件方法
			},
			/** 搜索音乐
			 * @param {string} keywords 关键词
			 */
			async handleSearch(keywords) {
				// 判断搜索框内容是否为空
				if (!keywords) return;
				// console.log("加载搜索结果……");
				this.loading = true;
				this.value = keywords;
				this.showSearchResult = true;
				// 发送请求
				let res = await this.$api.searchMusic({
					keywords,
					limit: this.pageSize,
					offset: this.searchResult.length,
				});
				console.log("搜索音乐", res.data);
				// 判断是否成功
				if (res.data.code === 200 && res.data.result.songs) {
					this.searchResult.push(...res.data?.result?.songs);
					this.total = res.data?.result?.songCount;
					// console.log(this.total, this.searchResult);
					// this.changeLoading(false);
					if (this.searchResult.length >= this.total) {
						this.finished = true;
					}
				} else {
					this.finished = true;
				}
				this.loading = false;
			},
			// 重置搜索结果
			resetSearchResult() {
				console.log("重置搜索结果");
				// 重置数据
				this.searchResult = [];
				// 重置分页
				this.page = 1;
				this.total = 0;
				this.finished = false;
			},
			// 转到播放页面
			toPlay(id) {
				console.log("转到播放页面", id);
				this.$router.push({ name: "player", params: { id } });
			},
		},
	};
</script>

<style lang="less" scoped>
	// 搜索框
	.van-search {
		position: relative;
		padding: 15px 10px;
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
	.van-search::after {
		content: "";
		position: absolute;
		left: 0;
		bottom: 0;
		right: 0;

		border: 0px solid rgba(0, 0, 0, 0.1);
		border-bottom-width: 1px;
	}
</style>
