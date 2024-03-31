<template>
	<div class="hotop">
		<div class="hotopct">
			<div class="hoticon"></div>
			<div class="hottime">更新日期：{{ updateTime | timeToDay }}</div>
		</div>
	</div>
</template>

<script>
	import dayjs from "dayjs";
	export default {
		props: {
			updateTime: {
				type: Number,
				default: () => {
					//返回当前时间戳
					return Date.now();
				},
			},
		},
		filters: {
			/** 将时间戳转换为日期
			 * @param {Number} value 需要转换的时间戳
			 */
			timeToDay(value) {
				return dayjs(value).format("MM月DD日");
			},
		},
	};
</script>

<style lang="less" scoped>
	.hotop {
		position: relative;
		padding-top: 38.9%;
		overflow: hidden;
		background: url(@/assets/images/hot_music_bg_2x.jpg) no-repeat;
		background-size: contain;
		.hotopct {
			display: -webkit-box;
			display: -webkit-flex;
			display: -ms-flexbox;
			display: flex;
			-webkit-box-orient: vertical;
			-webkit-box-direction: normal;
			-webkit-flex-direction: column;
			-ms-flex-direction: column;
			flex-direction: column;
			-webkit-box-pack: center;
			-webkit-justify-content: center;
			-ms-flex-pack: center;
			justify-content: center;
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			z-index: 2;
			padding-left: 20px;
			box-sizing: border-box;

			.hoticon {
				width: 142px;
				height: 67px;

				background: url(@/assets/images/index_icon_2x.png) no-repeat;
				background-size: 166px 97px;
				background-position: -24px -30px;
			}
			.hottime {
				margin-top: 10px;
				color: hsla(0, 0%, 100%, 0.8);
				font-size: 12px;
				-webkit-transform: scale(0.91);
				-ms-transform: scale(0.91);
				transform: scale(0.91);
				-webkit-transform-origin: left top;
				-ms-transform-origin: left top;
				transform-origin: left top;
			}
		}
		// 遮罩
		&::after {
			content: " ";
			position: absolute;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			z-index: 1;
			background-color: rgba(0, 0, 0, 0.2);
		}
	}
</style>
