<template>
	<van-list class="list" v-model="loading" :finished="finished" @load="getList">
		<!-- 头部插槽 -->
		<header class="header" v-if="$slots.header" @click="handleHeaderClick">
			<slot name="header" :item="list"></slot>
		</header>
		<!-- 列表 -->
		<div
			class="item"
			:style="itemStyle"
			v-for="(item, index) in list"
			:key="index"
			@click="handleClick(item)">
			<!-- 可自定义插槽 -->
			<slot name="custom" :item="item" :index="index">
				<!-- 图标 -->
				<div class="item-icon" v-show="$slots['item-icon']">
					<slot name="item-icon" :item="item"> </slot>
				</div>
				<!-- 内容(默认插槽) -->
				<div class="content default">
					<slot :item="item" :index="index">
						{{ item[contentProp] }}
					</slot>
				</div>
			</slot>
		</div>
		<!-- 尾部插槽 -->
		<footer class="footer" v-if="$slots.footer" @click="handleFooterClick">
			<slot name="footer" :item="list"></slot>
		</footer>
	</van-list>
</template>

<script>
	export default {
		model: {
			// 指定绑定v-model的属性
			prop: "modelValue",
			// 指定触发事件
			event: "update",
		},
		props: {
			// 绑定v-model的属性
			modelValue: {
				type: Boolean,
				default: true,
			},
			// 列表数据
			list: {
				type: Array,
				default: [],
			},
			// 是否加载完成
			finished: {
				type: Boolean,
				default: false,
			},
			// 列表项数据id对应的prop
			idProp: {
				type: String,
				default: "id",
			},
			// 列表项中要显示的数据prop
			contentProp: {
				type: String,
				default: "name",
			},
			// 列表项高度(默认自适应)
			itemHeight: {
				type: [Number, String],
				default: "auto",
			},
		},
		methods: {
			// 处理加载更多事件
			getList() {
				this.$emit("load");
			},
			// 处理列表项点击事件
			handleClick(item) {
				// 触发item-click事件
				console.log("base-list --> item-click", item[this.contentProp], item);
				this.$emit("item-click", item[this.contentProp], item);
			},
			// 处理头部点击事件
			handleHeaderClick() {
				console.log("base-list --> header-click");
				this.$emit("header-click");
			},
			// 处理尾部点击事件
			handleFooterClick() {
				console.log("base-list --> footer-click");
				this.$emit("footer-click");
			},
		},
		computed: {
			// 列表项样式
			itemStyle() {
				// 计算列表项高度
				let height =
					typeof this.itemHeight === "number"
						? this.itemHeight + "px"
						: this.itemHeight;
				// 返回样式对象
				return {
					height,
				};
			},
			loading: {
				get() {
					// 返回v-model绑定的属性
					return this.modelValue;
				},
				set(value) {
					// 更新v-model绑定的属性
					this.$emit("update:modelValue", value);
				},
			},
		},
		created() {
			this.$nextTick(() => {
				console.log("base-list --> $slots", this.$slots);
			});
		},

		data() {
			return {};
		},
	};
</script>

<style lang="less" scoped>
	.list {
		--font-size: 15px;
	}
	// 列表项样式
	.item {
		display: flex;
		align-items: center;
		overflow: hidden;
		box-sizing: border-box;
	}
	// 图标样式
	.item-icon {
		width: 15px;
		height: 15px;
		margin-right: 7px;
		// 图标垂直居中
		// display: flex;
		// align-items: center;
		line-height: 15px; // 确保图标垂直居中
	}
	// 内容区域
	.content {
		position: relative;
		flex: 1;
		width: calc(100% - 15px); // 减去图标和文字的宽度
		height: 100%;
		// line-height: 100%;

		font-size: var(--font-size);
		// 文字垂直居中
		display: flex;
		align-items: center;
		// 文字超出部分省略号显示
		overflow: hidden;
		text-overflow: ellipsis; // 省略号
		white-space: nowrap; // 文本不换行
		word-break: normal; // 文本不换行，允许单词内换行。
	}
	// 内容区域的下边框
	.content::after,
	.header::after,
	.footer::after {
		content: "";
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0px;
		height: 100%;
		box-sizing: border-box;
		border: 0 solid rgba(0, 0, 0, 0.1);
		border-bottom-width: 1px;
	}
	// 头部和底部的内容区域
	.header,
	.footer {
		position: relative;
		height: 50px;
		line-height: 50px;
	}
	.header {
		color: #507daf;
		font-size: var(--font-size);
	}
</style>
