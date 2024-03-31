<template>
	<div class="audio-container">
		<!-- audio标签 -->
		<audio
			ref="audio"
			:controls="controls"
			:src="url"
			@timeupdate="timeUpdate"></audio>
		<!-- 按钮 -->
		<div class="control-button" @click="togglePlay(audio)">
			<img
				v-if="!isPlaying"
				id="icon"
				class="icon"
				src="@/assets/images/player-play.png" />
			<img
				v-else
				id="icon"
				class="icon"
				src="@/assets/images/player-pause.png" />
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			url: {
				type: String,
				default: "",
			},
			controls: {
				type: Boolean,
				default: false,
			},
		},
		data() {
			return {
				/** @type {HTMLAudioElement} */
				audio: null, // 音频对象
				isPlaying: false, // 是否正在播放
				currentTime: new Date().toLocaleTimeString(), // 初始化当前时间
			};
		},
		created() {
			this.$nextTick(async () => {
				/** @type {HTMLAudioElement} */
				let audio = this.$refs.audio;
				this.audio = audio; // 保存音频对象，以便在其他方法中使用。
			});
		},
		mounted() {
			// 初始化音频元数据监听器
			this.$refs.audio.addEventListener("loadedmetadata", () => {
				// 在元数据加载完成后设置初始时间，防止在音频未加载完成时显示0
				this.currentTime = this.$refs.audio.currentTime;
			});
			// 监听audio元素的播放完成事件
			this.$refs.audio.addEventListener(
				"ended",
				() => (this.isPlaying = false)
			); // 播放完成后，将isPlaying设置为false。
		},
		watch: {
			// 监听isPlaying的变化
			isPlaying(newVal, oldVale) {
				if (newVal === oldVale) return;
				if (newVal) {
					this.$emit("play"); // 播放时触发play事件
					this.$emit("toggle", newVal);
				} else {
					this.$emit("pause"); // 暂停时触发pause事件
					this.$emit("toggle", newVal);
				}
			},
		},
		methods: {
			/** 控制音频播放
			 * @param {HTMLAudioElement} audio
			 */
			// 播放切换
			togglePlay(audio) {
				if (!audio) return;
				if (audio.paused) {
					audio.play();
					// console.log("开始播放");
				} else {
					audio.pause();
					// console.log("暂停播放");
				}
				this.isPlaying = !audio.paused; // 更新播放状态
			},
			// 更新当前时间
			timeUpdate() {
				// 更新当前时间到组件的数据中
				this.currentTime = this.$refs.audio.currentTime;
				// 向父组件返回当前时间
				this.$emit("update-current", this.currentTime);
			},
		},
	};
</script>

<style lang="less" scoped>
	.audio-container {
		display: flex;
		flex-flow: row wrap;
	}
	.control-button > .icon {
		width: 60px;
		height: 60px;
	}
</style>
