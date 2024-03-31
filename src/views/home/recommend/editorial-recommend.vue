<template>
	<div class="remd-list">
		<div
			class="remd-card"
			v-for="(item, index) in list"
			:key="index"
			@click="toPlaylist(item.id)">
			<!-- 音乐封面 -->
			<div class="remd-info">
				<!-- 封面图片 -->
				<img class="remd-img" :src="item.picUrl" />
				<!-- 播放量 & 耳机图标 -->
				<span class="icon-earphone remd-play-num"
					>{{ item.playCount | countFormat }}
				</span>
			</div>
			<!-- 描述 -->
			<p class="remd-text">{{ item.name }}</p>
		</div>
	</div>
</template>

<script>
	import { formatNumber } from "@/utils/common";
	/** 数据结构定义
	 * @typedef {object} Data
	 * @property {number} id id
	 * @property {string} name 名称
	 * @property {string} picUrl 图片路径
	 * @property {number} playCount 播放量
	 */
	export default {
		data() {
			return {
				/** @type {Data[]} */
				list: [],
			};
		},
		filters: {
			/**  格式化数量
			 * @param {number} value
			 */
			countFormat(value) {
				return formatNumber(value, 1);
			},
		},
		created() {
			this.getList();
		},
		methods: {
			async getList() {
				let res = await this.$api.recommendedMusic({ limit: 6 });
				console.log("编辑推荐", res.data);
				if (res.data?.code === 200) {
					this.list = res.data.result;
				}
			},
			// 转到歌单
			toPlaylist(id) {
				console.log("转到歌单", id);
				// this.$router.push({ name: "player", params: { id } });
			},
		},
	};
</script>

<style lang="less" scoped>
	// 推荐卡片容器
	.remd-list {
		position: relative;
		display: flex;
		flex-wrap: wrap;
		// 推荐卡片
		.remd-card {
			// flex: 0;
			width: 33.3%;
			// background: orange;
			box-sizing: border-box;
			text-align: center;
			margin-bottom: 16px;
			cursor: pointer;

			// 卡片间隙样式
			--gap: 2px;
			&:nth-child(3n + 1) {
				// background: red;
				padding-right: calc(var(--gap) / 2);
			}
			&:nth-child(3n + 2) {
				// background: blue;
				padding-right: calc(var(--gap) / 4);
				padding-left: calc(var(--gap) / 4);
			}
			&:nth-child(3n) {
				// background: yellow;
				padding-left: calc(var(--gap) / 2);
			}

			// 图片容器
			.remd-info {
				// 设置相对定位(给容器内的img作为参考)
				position: relative;
				padding-bottom: 100%;
				& > .remd-img {
					position: absolute;
					width: 100%;
					left: 0;
					top: 0;
					z-index: 1;
				}
				// 播放量
				.remd-play-num {
					position: absolute;
					right: 5px;
					top: 2px;
					z-index: 3;
					padding-left: 13px;
					color: #fff;
					font-size: 12px;
					background-position: 0;
					background-repeat: no-repeat;
					background-size: 11px 10px;
					text-shadow: 1px 0 0 rgba(0, 0, 0, 0.15);
					// 图标svg
					&.icon-earphone {
						background-image: url("@/assets/svg/headset.svg");
					}
				}
				// 容器遮罩
				&:after {
					content: " ";
					position: absolute;
					left: 0;
					top: 0;
					width: 100%;
					height: 20px;
					z-index: 2;
					background-image: -webkit-linear-gradient(
						top,
						rgba(0, 0, 0, 0.2),
						rgba(0, 0, 0, 0)
					);
					background-image: linear-gradient(
						180deg,
						rgba(0, 0, 0, 0.2),
						rgba(0, 0, 0, 0)
					);
				}
			}

			// 描述
			.remd-text {
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				overflow: hidden;
				padding: 6px 2px 0 6px;
				min-height: 30px;
				line-height: 1.2;
				font-size: 13px;
			}
		}
	}
</style>
