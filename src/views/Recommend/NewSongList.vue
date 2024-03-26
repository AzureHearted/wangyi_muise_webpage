<template>
	<van-list
		v-model="loading"
		:finished="finished"
		finished-text="没有更多了"
		@load="onLoad">
		<van-cell
			v-for="item in list"
			:key="item"
			title-class="title overflow"
			label-class="label overflow">
			<template #title>
				{{ item }}
				<span>({{ item }})</span>
			</template>
			<template #label> 描述111111111111111111111 </template>
			<template #right-icon>
				<div class="play">
					<span class="icon"></span>
				</div>
			</template>
		</van-cell>
	</van-list>
</template>

<script>
	export default {
		methods: {
			onLoad() {
				// 异步更新数据
				// setTimeout 仅做示例，真实场景中一般为 ajax 请求
				setTimeout(() => {
					for (let i = 0; i < 10; i++) {
						this.list.push(this.list.length + 1);
					}

					// 加载状态结束
					this.loading = false;

					// 数据全部加载完成
					if (this.list.length >= 40) {
						this.finished = true;
					}
				}, 100);
			},
		},
		data() {
			return {
				list: [],
				loading: false,
				finished: false,
			};
		},
	};
</script>

<style lang="less" scoped>
	.van-cell {
		padding: 6px 0 6px 10px;
	}
	.title {
		font-size: 17px;
		span {
			color: #888;
			margin-left: 4px;
		}
	}
	.label {
		font-size: 12px;
		color: #888;
	}
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
		.icon {
			display: inline-block;
			width: 22px;
			height: 22px;
			background: url(//s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880=)
				no-repeat;
			background-size: 166px 97px;
			background-position: -24px 0px;
			&:hover {
				cursor: pointer;
			}
		}
	}
	.overflow {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		word-break: normal;
	}
</style>
