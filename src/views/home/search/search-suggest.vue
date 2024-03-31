<template>
	<div class="search-suggest">
		<!-- 搜索建议列表 -->
		<BaseList
			:list="suggestList"
			:finished="true"
			item-height="45px"
			content-prop="keyword"
			@item-click="handleClick"
			@header-click="handleClick(keywords)">
			<!-- 在头部插入搜索提示区域 -->
			<template slot="header">
				<div class="header">搜索“{{ keywords }}”</div>
			</template>
			<!-- 传入每条数据的图标 -->
			<template slot="item-icon">
				<img class="item-icon" src="@/assets/svg/search.svg" alt="" />
			</template>
		</BaseList>
	</div>
</template>

<script>
	import BaseList from "@/components/base-list.vue";

	import { debounce } from "@/utils/common"; // 导入：防抖函数

	export default {
		components: { BaseList },
		props: {
			loading: Boolean, // 是否正在加载
			keywords: String, // 搜索关键词
		},
		data() {
			return {
				suggestList: [], // 搜索建议
			};
		},
		computed: {
			theLoading: {
				get() {
					return this.loading; // 返回父组件传递的loading状态。
				},
				set(value) {
					// 更新v-model绑定的属性
					this.$emit("update-loading", value);
				},
			},
		},
		watch: {
			keywords(newVal, oldVal) {
				// 如果搜索框内容不为空
				if (newVal && newVal !== oldVal) {
					// 监听搜索关键词变化，获取搜索建议列表
					this.getSearchSuggest(newVal);
				} else {
					// 如果搜索框内容为空，则清空搜索建议列表
					this.suggestList = [];
				}
			},
		},
		created() {
			// 用防抖函数封装
			this.getSearchSuggest = debounce(this.getSearchSuggest);
			// 如果搜索框内容不为空，则获取搜索建议
			if (this.keywords) {
				this.getSearchSuggest();
			}
		},
		methods: {
			// 获取搜索建议
			async getSearchSuggest() {
				// 判断搜索框内容是否为空
				if (!this.keywords) return;
				this.theLoading = true; // 开始加载状态
				// 发送请求
				let res = await this.$api.searchSuggest({
					keywords: this.keywords,
					type: "mobile",
				});
				console.log("搜索建议", res.data);
				// 判断是否成功
				if (res.data.code === 200) {
					// 赋值
					if (res.data.result.allMatch) {
						this.suggestList = res.data?.result?.allMatch;
					} else {
						this.suggestList = []; // 如果没有搜索建议，则清空列表
					}
				}
				// 结束加载状态
				this.theLoading = false;
			},
			// 点击搜索建议
			handleClick(value) {
				this.$emit("to-search", value); // 触发点击事件，并传递参数
			},
		},
	};
</script>

<style lang="less" scoped>
	.search-suggest {
		padding-left: 10px;
	}
	.header {
		height: 50px;
		line-height: 50px;
	}
</style>
