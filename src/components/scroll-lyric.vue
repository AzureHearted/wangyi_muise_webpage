<template>
	<div class="lyric-wrapper" :data-now-index="nowIndex">
		<div
			class="lyric-inner"
			:style="{
				'--height': lineHeight + 'px',
				transform: `translateY(-${(nowIndex || 0) * lineHeight}px)`,
			}">
			<div
				v-for="(line, timeTag, index) in lyric"
				:key="timeTag"
				class="lyric-line"
				:class="{ 'lyric-active': index === nowIndex }">
				{{ line }}
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			// 歌词数组or对象
			lyric: {
				type: [Array, Object],
				default: () => [...Array(5).keys()].map((i) => `歌词内容${i}`),
			},
			current: {
				type: Number,
				default: 0, // 默认当前时间，用于高亮显示当前播放的歌词
			},
			// 行高
			lineHeight: {
				type: Number, // 默认行高，单位为px，用于计算歌词滚动距离和歌词行高
				default: 24.5, // 默认行高为24.5px
			},
		},
		data() {
			return {
				currentTag: "",
				nowIndex: 0,
			};
		},
		computed: {},
		watch: {
			current(newVal, oldVal) {
				if (newVal === oldVal) return;
				this.currentTag = this.getTimeTag(newVal); // 更新当前播放位置的标签值，用于高亮显示当前播放的歌词
				// 计算当前下标值，用于歌词滚动
				this.nowIndex = this.findClosestIndex(
					this.lyric,
					this.currentTag,
					-500
				);
			},
		},
		methods: {
			// 处理时间为时间标签
			getTimeTag(time) {
				// 将形如“123.22”的时间(s)数字转为“02:03.32”字符串
				const m = Math.floor(time / 60)
					.toString()
					.padStart(2, "0"); // 分
				const s = Math.floor(time % 60)
					.toString()
					.padStart(2, "0"); // 秒
				const ms = Math.floor((time * 100) % 100)
					.toString()
					.padStart(2, "0"); // 毫秒
				return `${m}:${s}.${ms}`; // 格式化时间标签，如“02:03.32”
			},
			/** 将时间字符串转为毫秒数
			 * @param {string} timeTag 格式为“02:03.32”时间字符串
			 */
			timeTagToMs(timeTag) {
				let [min, s, ms] = timeTag.split(/[.:]/).map(Number);
				return min * 60 * 1000 + s * 1000 + ms * 10;
			},
			/** 找到最接近当前时间的歌词下标
			 * @param {object} obj key名格式为“02:03.32”的对象，值为歌词文本
			 * @param {string} target 格式为“02:03.32”时间文本
			 * @param {number=0} timeOffset 偏移ms(默认0ms)
			 */
			findClosestIndex(obj, target, timeOffset = 0) {
				let minDiff = Infinity,
					index = 0; // 初始化最小差值为无穷大，初始下标为0
				let keys = Object.keys(obj);
				for (let i = 0; i < keys.length; i++) {
					const key = keys[i];
					// 遍历对象中的每个属性
					const diff = Math.abs(
						this.timeTagToMs(target) + timeOffset - this.timeTagToMs(key)
					); // 计算当前元素与目标值的时间差值
					if (diff < minDiff) {
						minDiff = diff; // 更新最小差值
						index = i; // 更新下标
					}
				}

				return index;
			},
		},
	};
</script>

<style lang="less" scoped>
	// 歌词容器
	.lyric-wrapper {
		overflow: hidden;
		// overflow: scroll;
		height: 100%;
		// border: solid 1px #fff; // 用于调试，实际应用中可以去掉
		box-sizing: border-box;

		// 渐变遮罩，用于实现歌词滚动效果
		-webkit-mask: -webkit-linear-gradient(
			top,
			#000,
			#000 49%,
			hsla(0, 0%, 84.7%, 0) 84%
		);
	}
	.button-group {
		position: absolute;
		// top: 50%;
		width: fit-content;
		z-index: 1;
	}
	// 歌词滚动容器
	.lyric-inner {
		text-align: center;
		padding: 22.5px 0;
		// border: solid 1px #1aff00; // 用于调试，实际应用中可以去掉
		color: hsla(0, 0%, 100%, 0.4);
		font-family: PingFangSC-Regular;

		// 过渡
		transition: transform 0.3s ease-out; // 添加过渡效果，使歌词滚动更平滑
	}
	// 歌词行
	.lyric-line {
		font-size: 15px;
		height: var(--height);
		line-height: var(--height); // 设置行高，使文字垂直居中
		box-sizing: border-box;
		// box-sizing: content-box; // 改为content-box，否则歌词行会超出容器
	}
	// 当前播放的歌词
	.lyric-active {
		color: rgba(255, 255, 255, 0.8);
		// color: red !important;
	}
</style>
