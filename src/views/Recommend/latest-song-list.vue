<template>
	<BaseList v-model="loading" :finished="finished" :list="list" @load="getList">
		<template slot="custom" slot-scope="{ item }">
			<MusicItem
				:key="item.id"
				:id="item.id"
				:name="item.name"
				:alias="item.song.alias"
				:artists="item.song.artists"
				:is-sq-music="!!item.song.sqMusic"
				:pic-url="item.picUrl" />
		</template>
	</BaseList>
</template>

<script>
	import BaseList from "@/components/base-list.vue";
	import MusicItem from "@/components/music-item.vue";

	export default {
		components: { BaseList, MusicItem },
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

<style lang="less" scoped></style>
