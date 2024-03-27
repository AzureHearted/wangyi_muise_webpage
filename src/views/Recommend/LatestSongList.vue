<template>
	<van-list v-model="loading" :finished="finished" @load="getList">
		<!-- 音乐项 -->
		<van-cell
			v-for="item in list"
			:key="item.id"
			title-class="title text-overflow"
			label-class="label text-overflow">
			<!-- 标题 -->
			<template #title>
				{{ item.name }}
				<!-- 副标题 -->
				<span>{{ item.song.alias | filterAlias }}</span>
			</template>
			<!-- 标签 -->
			<template #label>
				<!-- 图标SQ -->
				<i class="icon-sq" v-if="item.song.sqMusic"></i>
				<!-- 标签内容 -->
				{{ item.song.artists | filterArtists }}&nbsp;-&nbsp;{{ item.name }}
			</template>
			<!-- 播放按钮 -->
			<template #right-icon>
				<div class="play">
					<!-- 播放图标 -->
					<span class="icon-play"></span>
				</div>
			</template>
		</van-cell>
	</van-list>
</template>

<script>
	/** 数据结构定义
	 * @typedef {object} Data
	 * @property {number} id id
	 * @property {string} name 名称
	 * @property {string} picUrl 图片路径
	 * @property {SongInfo} song 歌曲详情
	 *
	 * @typedef {object} SongInfo 音乐信息 (数据结构)
	 * @property {string[]} alias 别名
	 * @property {Artist[]} artists 艺术家
	 * @property {object} sqMusic SQ音乐信息(如果这个对象不为空则说明有SQ)
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
		created() {
			// this.getList();
		},
		methods: {
			// 异步获取列表
			async getList() {
				// 调用 $api.latestMusic() 方法获取数据
				let res = await this.$api.latestMusic();
				console.log("最新音乐", res.data);
				// 判断获取的数据是否成功
				if (res.data?.code === 200) {
					// 成功则将数据赋值给 list
					this.list = res.data.result;
					// 完成加载数据
					this.finished = true;
				}
			},
		},
		data() {
			return {
				/** @type {Data[]} */
				list: [],
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

		// 图标
		.icon-sq {
			display: inline-block;
			width: 12px;
			height: 8px;
			// margin-right: 4px;

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

			// 使用了雪碧图来作为图标
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
</style>
