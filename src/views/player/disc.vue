<template>
	<!-- 唱片 -->
	<div class="song-disc">
		<!-- 盘片 -->
		<div class="song-turn" :class="{ rotate: playing }">
			<!-- 盘片图片，这里使用一个占位符图片，实际应用中需要替换为歌曲封面图片。 -->
			<div class="song-rollwrap">
				<!-- 图片 -->
				<img class="song-img" alt="song-img" :src="cover" />
			</div>
			<!-- 唱片高光 -->
			<div class="disc-highlight"></div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			// 封面图片
			cover: {
				type: String, // 封面图片的URL，可以是相对路径或绝对路径。
				default:
					"http://p1.music.126.net/CBx2K_jEN3SNWwYztagPPw==/109951164485969446.jpg?imageView&amp;thumbnail=360y360&amp;quality=75&amp;tostatic=0",
			},
			playing: {
				type: Boolean, // 是否正在播放，用于控制旋转动画的开启和关闭。
				default: false, // 默认情况下，唱片不旋转。
			},
		},
		watch: {},
	};
</script>

<style lang="less" scoped>
	// 唱片样式
	.song-disc {
		position: relative;
		width: 70%;
		aspect-ratio: 1; // 设置宽高比为1:1，确保宽高一致
		margin: 0 auto;

		// 唱片机盘片容器
		.song-turn {
			width: 100%;
			height: 100%;
			animation: rotate 20s linear infinite; // 添加旋转动画，持续20秒，线性速度，无限循环。
			animation-play-state: paused; // 设置动画状态为暂停，初始状态不旋转。
		}
		// 旋转样式
		.rotate {
			animation-play-state: running;
		}

		// 唱片机盘片
		.song-turn::before {
			content: " ";
			position: absolute;
			// 设置唱片机盘片的位置
			inset: 0;
			// 设置唱片机盘片的背景图片
			background: url("@/assets/images/唱片机盘片.png") no-repeat;
			background-size: contain;
		}
		// 唱片机盘片高光
		.disc-highlight {
			position: absolute; // 设置为绝对定位，以便在唱片机盘片上居中
			content: " ";
			inset: 0;
			background: url("@/assets/images/唱片机盘片高光.png") no-repeat;
			background-size: contain;
		}

		// 唱片机盘片上的歌曲封面
		.song-rollwrap {
			position: absolute; // 设置为绝对定位，以便在唱片机盘片上居中

			inset: calc(18.5%);

			overflow: hidden;
			border-radius: 50%;

			// 垂直水平居中
			// top: 50%;
			// left: 50%;
			// transform: translate(-50%, -50%); // 居中
			z-index: -1; // 让封面位于盘片下方
		}
		// 歌曲封面
		.song-rollwrap > .song-img {
			width: 100%;
			aspect-ratio: 1;
			object-fit: cover;
			z-index: -1;
		}
	}

	// 唱片机旋转动画
	@keyframes rotate {
		0% {
			transform: rotate(0deg);
		} // 初始状态
		100% {
			transform: rotate(360deg);
		} // 最终状态，旋转一周
	}
	// 唱片机唱针(水平居中)
	.song-disc::after {
		content: "";
		position: absolute;
		top: -20%;
		width: 45%;
		aspect-ratio: 0.9; // 设置宽高比为1:1，确保宽高一致

		// 水平居中
		left: 50%;
		transform: translate(-50%, 0);

		background: url("@/assets/images/唱片机唱针.png") no-repeat;
		background-size: contain;
	}
</style>
