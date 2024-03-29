<template>
	<BaseList :list="list" v-model="loading" :finished="finished" @load="getList">
		<!-- 列表内容区 -->
		<template slot="custom" slot-scope="{ item, index }">
			<!-- 音乐项 -->
			<MusicItem
				:id="item.id"
				:name="item.name"
				:alias="item.alia"
				:artists="item.ar"
				:is-sq-music="!!item.sq">
				<template slot="left">
					<!-- 排名 -->
					<span class="rank">
						{{ (index + 1).toString().padStart(2, "0") }}
					</span>
				</template>
			</MusicItem>
		</template>
		<!-- 列表底部 -->
		<template slot="footer">
			<!-- 完整榜单按钮 -->
			<div class="hotdn">
				<span class="hotview">查看完整榜单</span>
			</div>
		</template>
	</BaseList>
</template>

<script>
	import BaseList from "@/components/base-list.vue";
	import MusicItem from "@/components/music-item.vue";

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
		},
		methods: {
			// 异步获取列表
			async getList() {
				// 调用 $api.latestMusic() 方法获取数据
				let res = await this.$api.hotSinglesChart();
				console.log("热歌榜", res.data);
				// 判断获取的数据是否成功
				if (res.data?.code === 200) {
					// 成功则将数据赋值给 list
					this.list = res.data?.playlist?.tracks;
					// 完成加载数据
					this.finished = true;
				}
			},
		},
		data() {
			return {
				/** @type {Data[]} */
				list: [], // 列表数据
				loading: false,
				finished: false,
			};
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
