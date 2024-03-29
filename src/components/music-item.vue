<template>
	<div class="container">
		<!-- 图标 -->
		<div class="left" v-if="$slots.left">
			<slot name="left"></slot>
		</div>
		<!-- 音乐项 -->
		<van-cell
			title-class="title text-overflow"
			label-class="label text-overflow">
			<!-- 标题 -->
			<template #title>
				<!-- 名称 -->
				<span class="name">{{ name }}</span>
				<!-- 别民 -->
				<span class="alias">{{ alias | filterAlias }}</span>
			</template>
			<!-- 标签 -->
			<template slot="label">
				<!-- 图标SQ -->
				<i class="icon-sq" v-if="isSqMusic"></i>
				<!-- 标签内容 -->
				{{ artists | filterArtists }}&nbsp;-&nbsp;{{ name }}
			</template>
			<!-- 播放按钮 -->
			<template #right-icon>
				<div class="play">
					<!-- 播放图标 -->
					<span class="icon-play"></span>
				</div>
			</template>
		</van-cell>
	</div>
</template>

<script>
	export default {
		props: {
			// 音乐项数据，包含歌曲信息、艺术家信息等。
			id: Number, // 音乐项的id
			name: String, // 音乐项的名称
			alias: Array, // 音乐项的别名，可能是一个数组。
			artists: Array, // 音乐项的艺术家信息，可能是一个数组。
			isSqMusic: Boolean, // 音乐项的SQ音乐信息
			picUrl: {
				type: String,
				default: "", // 默认值为空字符串。
			}, // 音乐项的图片路径。
		},

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
		created() {},
		data() {
			return {};
		},
	};
</script>

<style lang="less" scoped>
	.container {
		position: relative;
		width: 100%;
		display: flex;
		align-items: center;
		padding-left: 10px;
		box-sizing: border-box;
		overflow: unset;
	}
	.left {
		// box-sizing: border-box;
		width: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-left: -10px;
	}
	// 最新音乐项
	.van-cell {
		flex: 1;
		// position: relative;
		cursor: pointer;
		line-height: unset;
		padding: unset;
		padding: 6px 0;
	}

	.van-cell::after {
		display: unset;
		content: "";
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 10;
		border: 0 solid rgba(0, 0, 0, 0.1);
		border-bottom-width: 1px;
	}

	// 标题
	.title {
		font-size: 17px;
		// 别名
		.alias {
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
	/deep/.text-overflow {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		word-break: normal;
	}
</style>
