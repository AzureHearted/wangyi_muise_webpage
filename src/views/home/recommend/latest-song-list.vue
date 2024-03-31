<template>
	<BaseList v-model="loading" :finished="finished" :list="list" @load="getList">
		<template slot="custom" slot-scope="{ item }">
			<MusicItem
				:key="item.id"
				:id="item.id"
				:name="item.name"
				:alias="item.alia"
				:artists="item.ar"
				:is-sq-music="!!item.sq"
				@click="toPlay(item.id)" />
		</template>
		<template #loading>
			<Loading />
		</template>
	</BaseList>
</template>

<script>
	import BaseList from "@/components/base-list.vue";
	import MusicItem from "@/components/music-item.vue";
	import Loading from "@/components/loading.vue";

	export default {
		components: { BaseList, MusicItem, Loading },
		created() {
			// this.getList();
		},
		methods: {
			// 异步获取列表
			async getList() {
				this.loading = true; // 开始加载数据
				// 调用 $api.latestMusic() 方法获取数据
				let res = await this.$api.latestMusic();
				console.log("最新音乐", res.data);
				// 判断获取的数据是否成功
				if (res.data?.code === 200) {
					// 成功则将数据赋值给 list
					this.list = res.data.playlist.tracks.slice(0, 10);
					// 完成加载数据
					this.finished = true;
					this.loading = false; // 加载完成
				}
			},
			// 转到播放页面
			toPlay(id) {
				console.log("转到播放页面", id);
				this.$router.push({ name: "player", params: { id } });
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
