<template>
	<div class="recommend-container">
		<TitleH2 content="编辑推荐" />
		<EditorialRecommend style="padding-bottom: 24px" />
		<TitleH2 content="最新音乐" />
		<LatestSongList />
		<Footer />
	</div>
</template>

<script>
	import TitleH2 from "./title-h2.vue";
	import EditorialRecommend from "./editorial-recommend.vue";
	import LatestSongList from "./latest-song-list.vue";
	import Footer from "./footer.vue";

	export default {
		components: {
			TitleH2,
			EditorialRecommend,
			LatestSongList,
			Footer,
		},
		data() {
			return {};
		},
	};
</script>

<style lang="less" scoped>
	.recommend-container {
		padding-top: 20px;
		// background: wheat;
	}
</style>
