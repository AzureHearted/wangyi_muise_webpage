import axios from "@/utils/request";

let host =
	process.env.VUE_APP_ENV === "product" ? "http://iwenwiki.com:3000" : "/api";

const base = {
	// 接口：推荐音乐
	recommendedMusic: host + "/personalized",
};

const api = {
	/** 接口：推荐音乐
	 * @param {object} params
	 * @param {number} params.limit 数量限制,默认30个
	 */
	recommendedMusic(params) {
		return axios.get(base.recommendedMusic, { params });
	},
};

export default api;
