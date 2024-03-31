<template>
	<div>
		<BaseList
			:list="list"
			v-model="loading"
			:finished="finished"
			@load="getList">
			<!-- 列表内容区 -->
			<template slot="custom" slot-scope="{ item, index }">
				<!-- 音乐项 -->
				<MusicItem
					key="item.id"
					:id="item.id"
					:name="item.name"
					:alias="item.alia"
					:artists="item.ar"
					:is-sq-music="!!item.sq"
					@click="toPlay(item.id)">
					<template slot="left">
						<!-- 排名 -->
						<span class="rank">
							{{ (index + 1).toString().padStart(2, "0") }}
						</span>
					</template>
				</MusicItem>
			</template>
			<!-- 列表底部 -->
			<template #footer>
				<!-- 完整榜单按钮 -->
				<div class="hotdn" v-show="!loading">
					<span class="hotview">查看完整榜单</span>
				</div>
			</template>
			<template #loading>
				<!-- 去除原始加载样式 -->
				<span></span>
			</template>
		</BaseList>
		<Loading fixed v-show="loading" />
	</div>
</template>

<script>
	import BaseList from "@/components/base-list.vue";
	import MusicItem from "@/components/music-item.vue";
	import Loading from "@/components/loading.vue";
	import { mapState, mapMutations } from "vuex";

	/** 数据结构定义
	 * @typedef {object} Data
	 * @property {number} id id
	 * @property {string} name 名称
	 * @property {string[]} alia 别名
	 * @property {{name:string}} al 别名2
	 * @property {Artist[]} ar 艺术家
	 * @property {object} sq SQ音乐信息(如果这个对象不为空则说明有SQ)
	 *
	 * @typedef {object} Artist 艺术家 (数据结构)
	 * @property {string} name 名字/昵称
	 */

	export default {
		components: {
			BaseList,
			MusicItem,
			Loading,
		},
		data() {
			return {
				/** @type {Data[]} */
				list: [], // 列表数据
				finished: false,
			};
		},
		computed: {
			...mapState("layout", ["loading"]),
		},
		methods: {
			...mapMutations("layout", ["changeLoading"]),
			// 异步获取列表
			async getList() {
				this.changeLoading(true); // 开始加载数据 (vuex 状态管理)
				// 调用 $api.latestMusic() 方法获取数据
				let res = await this.$api.hotSinglesChart();
				console.log("热歌榜", res.data);
				// 判断获取的数据是否成功
				if (res.data?.code === 200) {
					// 成功则将数据赋值给 list
					this.list = res.data.playlist.tracks.slice(0, 20);
					// 完成加载数据
					this.finished = true;
					this.changeLoading(false);
				}
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
	// 1-3个元素都设置为红色字体
	.item:nth-of-type(1) .rank,
	.item:nth-of-type(2) .rank,
	.item:nth-of-type(3) .rank {
		color: #df3436;
	}

	// 排名
	.rank {
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		-ms-flex-align: center;
		align-items: center;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		-ms-flex-pack: center;
		justify-content: center;
		font-size: 17px;
		color: #999;
	}

	// 完整榜单按钮
	.hotdn {
		height: 55px;
		line-height: 55px;
		text-align: center;
		.hotview {
			display: inline-block;
			color: #999;
			padding-right: 14px;
			background: url("/src/assets/svg/Arrow-Right.svg") 100%;
			background-repeat: no-repeat;
			background-size: 7px 12px;
		}
	}
</style>
