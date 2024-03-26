<template>
	<div class="container">
		<TitleH2 content="编辑推荐" />
		<EditorialRecommendation style="padding-bottom: 24px" />
		<TitleH2 content="最新音乐" />
		<NewSongList />
	</div>
</template>

<script>
	import TitleH2 from "./TitleH2.vue";
	import EditorialRecommendation from "./EditorialRecommendation.vue";
	import NewSongList from "./NewSongList.vue";

	export default {
		components: { TitleH2, EditorialRecommendation, NewSongList },
		data() {
			return {};
		},
	};
</script>

<style lang="less" scoped>
	.container {
		padding-top: 20px;
		height: 2000px;
		// background: wheat;
	}
</style>
