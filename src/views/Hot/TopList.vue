<template>
	<van-list v-model="loading" :finished="finished" @load="getList">
		<!-- 音乐项 -->
		<van-cell
			v-for="(item, index) in list"
			:key="item.id"
			title-class="title text-overflow"
			label-class="label text-overflow">
			<template #icon>
				<!-- 排名 -->
				<span class="rank">{{ (index + 1).toString().padStart(2, "0") }}</span>
			</template>
			<!-- 标题 -->
			<template #title>
				{{ item.name }}
				<!-- 副标题 -->
				<span>{{ item.alia | filterAlias }}</span>
			</template>
			<!-- 标签 -->
			<template #label>
				<!-- 图标SQ -->
				<i class="icon-sq" v-if="item.sq"></i>
				<!-- 标签内容 -->
				{{ item.ar | filterArtists }}&nbsp;-&nbsp;{{ item.al.name }}
			</template>
			<!-- 播放按钮 -->
			<template #right-icon>
				<div class="play">
					<!-- 播放图标 -->
					<span class="icon-play"></span>
				</div>
			</template>
		</van-cell>
		<!-- 完整榜单按钮 -->
		<div class="hotdn">
			<span class="hotview">查看完整榜单</span>
		</div>
	</van-list>
</template>

<script>
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
		filters: {
			/** 处理艺术家信息
			 * @param {Artist[]} val
			 */
			filterArtists(val) {
				return val.map((a) => a.name).join(" / ");
			},
			/** 处理别名
			 * @param {string[]} val
			 */
			filterAlias(val) {
				return val.length > 0 ? `(${val.join()})` : "";
			},
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
	// 最新音乐项
	.van-cell {
		padding: 6px 0 6px 10px;
		cursor: pointer;
		line-height: unset;

		// 去除vant库中cell组件下方横线样式
		&::after {
			transform: unset;
			left: 40px;
			right: 0px;
		}
	}

	// 1-3个元素都设置为红色字体
	.van-cell:nth-child(1) > .rank,
	.van-cell:nth-child(2) > .rank,
	.van-cell:nth-child(3) > .rank {
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
		width: 40px;
		font-size: 17px;
		color: #999;
		margin-left: -10px;
	}
	// 标题
	.title {
		font-size: 17px;
		span {
			color: #888;
		}
	}
	// 副标题
	.label {
		font-size: 12px;
		color: #888;
		margin-top: unset;
		font-family: unset;

		// 图标
		.icon-sq {
			display: inline-block;
			width: 12px;
			height: 8px;

			// 使用了精灵图来作为图标
			background: url(//s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880=)
				no-repeat;
			background-size: 166px 97px;
			// background-position: -24px 0px;
		}
	}
	// 播放按钮
	.play {
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		-ms-flex-align: center;
		align-items: center;
		padding: 0 10px;

		// 播放图标
		.icon-play {
			display: inline-block;
			width: 22px;
			height: 22px;

			// 使用了精灵图来作为图标
			background: url(//s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880=)
				no-repeat;
			background-size: 166px 97px;
			background-position: -24px 0px;

			// 悬浮时的样式
			&:hover {
				cursor: pointer;
			}
		}
	}
	// 文字溢出样式
	.text-overflow {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		word-break: normal;
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
