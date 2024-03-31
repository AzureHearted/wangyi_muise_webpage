// 配置子vuex
export default {
	namespaced: true,
	state: {
		loading: false, //加载状态
	},
	mutations: {
		// 设置loading状态
		changeLoading(state, payload) {
			// console.log("loading变化", payload);
			state.loading = payload;
		},
	},
};
