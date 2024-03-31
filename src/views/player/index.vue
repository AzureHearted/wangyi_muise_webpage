<template>
	<!-- 页面容器 -->
	<div class="music-player-container">
		<!-- 背景 -->
		<div class="m-song-bg" :style="bgStyle"></div>
		<!-- 背景遮罩 -->
		<div class="m-song-bg-mask"></div>
		<!-- 音乐播放器 -->
		<div class="music-player">
			<!-- 唱片 -->
			<Disc :cover="info?.al?.picUrl" :playing="playing" />
			<!-- 控制栏 -->
			<div class="controls">
				<!-- 歌曲信息 -->
				<div class="song-info">
					<!-- 名称 -->
					<h2 class="song-name">
						{{ info?.name }}&nbsp;{{ info?.alia | filterAlias }}
					</h2>
					<!-- 作者 -->
					<h2 class="song-author">{{ info?.ar | filterArtists }}</h2>
				</div>
				<!-- 滚动歌词 -->
				<div class="song-lyric">
					<!-- 测试按钮 -->
					<div
						class="button-group"
						style="
							position: fixed;
							top: 10px;
							left: 10px;
							display: flex;
							gap: 4px;
						">
						<van-button size="small" @click="$router.go(-1)"> 返回 </van-button>
					</div>
					<!-- 滚动歌词组件 -->
					<ScrollLyric ref="scrollLyric" :lyric="lyric" :current="current" />
				</div>
				<!-- 控件 -->
				<div class="control-buttons">
					<!-- 音乐播放器 -->
					<div class="play-button">
						<BaseAudio
							:url="url"
							@toggle="playing = $event"
							@update-current="current = $event" />
					</div>
				</div>
			</div>
		</div>
		<!-- 相关信息 -->
		<div class="relate-info"></div>
	</div>
</template>

<script>
	import Disc from "./disc.vue";
	import BaseAudio from "@/components/base-audio.vue";
	import ScrollLyric from "@/components/scroll-lyric.vue";
	import ColorThief from "colorthief"; // 导入颜色小偷
	import { findExtremeColorsByBrightness } from "@/utils/common.js";

	export default {
		props: {},
		components: { Disc, ScrollLyric, BaseAudio },
		data() {
			return {
				id: -1,
				current: 0, // 当前播放的时间
				url: "",
				type: "",
				info: {},
				lyric: {},
				playing: false, // 是否正在播放
				colorPalette: [], // 颜色调色板
				bgStyle: {},
			};
		},
		computed: {},
		filters: {
			/** 处理艺术家信息
			 * @param {Artist[]} val
			 */
			filterArtists(val) {
				if (!val) return;
				return val.map((a) => a.name).join(" / ");
			},
			/** 处理别名 */
			filterAlias(val) {
				if (val) {
					return val.length > 0 ? `(${val.join()})` : "";
				} else {
					return "";
				}
			},
		},
		created() {
			this.id = this.$attrs.id; // 获取路由参数
			if (this.id) {
				this.getMusicInfo(this.id);
				this.getMusicUrl(this.id);
				this.getLyric(this.id);
			}
		},
		methods: {
			// 获取歌曲信息
			async getMusicInfo(id) {
				let res = await this.$api.getMusicInfo({ ids: [id].toString() });
				console.log("获取歌曲信息", res.data);
				if (res.data.code === 200) {
					this.info = res.data.songs[0];
					this.getThemeColor(this.info.al.picUrl);
				}
			},
			// 获取歌曲url
			async getMusicUrl(id) {
				let res = await this.$api.getMusicUrl({ id });
				console.log("获取歌曲url", res.data);
				if (res.data.code === 200) {
					this.url = res.data.data[0].url;
					this.type = res.data.data[0].type;
				}
			},
			// 获取歌词
			async getLyric(id) {
				let res = await this.$api.getLyric({ id });
				console.log("获取歌词", res.data);
				if (res.data.code === 200) {
					// 处理歌词
					this.lyric = this.lyricFormat(res.data?.lrc?.lyric);
					// console.log("this.lyric", this.lyric);
				}
			},
			// 歌词处理
			lyricFormat(lyricStr) {
				let lyricMap = {};
				lyricStr.split("\n").forEach((item) => {
					let match = item.match(/(?:\[)(.*)(?:\])(.*)/);
					if (match) {
						lyricMap[match[1]] = match[2];
					}
				});
				return lyricMap;
			},
			// 获取主题色
			getThemeColor(url) {
				let img = new Image();
				img.src = url;
				img.crossOrigin = "anonymous"; // 允许跨域图片
				img.onload = () => {
					// console.log("图片加载");
					let colorThief = new ColorThief();
					this.colorPalette = colorThief.getPalette(img);
					this.bgStyle = this.getGradientStyle(this.colorPalette);
					console.log(colorThief.getPalette(img), colorThief.getColor(img));
				};
			},
			// 获取背景渐变样式
			getGradientStyle(colorPalette) {
				// 假设colorPalette是数组，包含三个颜色值
				let middle =
					findExtremeColorsByBrightness(colorPalette).middle.toString();
				let low = findExtremeColorsByBrightness(colorPalette).low.toString();
				let high = findExtremeColorsByBrightness(colorPalette).high.toString();
				if (colorPalette.length > 2) {
					return {
						background: `linear-gradient(rgb(${middle}), rgb(${low}))`,
					};
				} else {
					return {};
				}
			},
		},
	};
</script>

<style lang="less" scoped>
	// 页面容器样式
	.music-player-container {
		// height: 2000px;
		box-sizing: border-box;
		// 背景和遮罩样式
		.m-song-bg,
		.m-song-bg-mask {
			position: fixed;
			inset: 0;
			z-index: -1;
		}
		// 背景样式
		.m-song-bg {
			overflow: hidden;
			background-color: #161824;
			transform: scale(1.5);
		}
		// 背景遮罩样式
		.m-song-bg-mask {
			background: #000000; // 设置背景颜色
			opacity: 60%;
		}
	}

	// 音乐播放器
	.music-player {
		padding-top: 116px;
		display: flex;
		flex-flow: column;
	}
	// 控制栏样式
	.controls {
		display: block;
		height: 200px;
		// background: #ffffff24; // 设置背景颜色
		margin-top: 1.85vh;
		padding: 0 16px;
	}
	// 歌曲信息样式
	.song-info {
		text-align: center;

		// 歌曲名称
		.song-name {
			font-family: PingFangSC-Medium;
			font-size: 18px;
			height: 25px;
			line-height: 25px;
			color: #fff;

			text-overflow: ellipsis; // 超出部分显示省略号
			white-space: nowrap; // 文本不换行
		}
		// 歌曲作者
		.song-author {
			margin-top: 0.625vh;
			font-size: 14px;
			height: 20px;
			line-height: 20px;
			color: hsla(0, 0%, 100%, 0.4);

			text-overflow: ellipsis; // 超出部分显示省略号
			white-space: nowrap; // 文本不换行
		}
	}
	// 歌词容器样式
	.song-lyric {
		// background: rgba(245, 222, 179, 0.297);
		height: 74px;
		padding-top: 16px;
		// height: 100px;
	}
	// 控制按钮样式
	.control-buttons {
		margin-top: 8px;
		display: flex; // 使用flex布局，使按钮水平排列。
		justify-content: space-around; // 平均分配按钮之间的间距。
		width: 100%; // 按钮宽度占满整个容器。
		height: 60px;
		// background: wheat;
	}
</style>
