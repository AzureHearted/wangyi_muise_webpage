import axios from "@/utils/request";

let host =
	process.env.VUE_APP_ENV === "product" ? "http://iwenwiki.com:3000" : "/api";
let host_wangYi =
	process.env.VUE_APP_ENV === "product"
		? "https://interface.music.163.com"
		: "/wangYiApi";
const base = {
	// 接口:推荐音乐
	recommendedMusic: host + "/personalized",
	// 接口:最新音乐 (由于跨域,因此需要配置反向代理) wangYiApi
	latestMusic: host_wangYi + "/weapi/personalized/newsong",
	// 接口:热歌榜 (由于跨域,因此需要配置反向代理) wangYiApi
	hotSinglesChart: host_wangYi + "/weapi/v6/playlist/detail",
	// 接口:热搜
	hotSearches: host + "/search/hot",
	// 接口:搜索建议
	searchSuggest: host + "/search/suggest",
	// 接口:搜索音乐
	searchMusic: host + "/cloudsearch",
};

const api = {
	/** 接口:推荐音乐
	 * @param {object} params
	 * @param {number} params.limit 数量限制,默认30个
	 */
	recommendedMusic(params) {
		return axios.get(base.recommendedMusic, { params });
	},
	/** 接口:最新音乐
	 * @param {object} params
	 * @param {string} params.params
	 * @param {string} params.encSecKey 加密密钥
	 */
	latestMusic(
		params = {
			params:
				"pk/o/Lv94Bm74ELSrf6sFOoIUNcMQQ3YRif4NKIFN9o7fsMcGOJ3AaDOBNw4siEWIC9AvviVrLcReXufhRNPa/DfYKAFPJXfO61m0rw7QU+B8JJDpzmPBf7YV8U/P6cTYu1X+DNb+z2mHmG7Zc60FA",
			encSecKey:
				"0c81cf6ff078c220966a596e4918059da67b2493fa22bb40448679c2bfedbafa1d8bcc89ed7f27a72bae713ec3ba97077353a67655a1084ed6f2ae3dc45a4ad02456488c06d744c5a2fd1d0dd3a1641461abf6780abc182ed58b43de2f42c845142c6cd3dc67f886b35aad368ce081593cea8bf8b5fc6e488b2008183ed09a4a",
		}
	) {
		return axios.post(base.latestMusic, params);
	},
	/** 接口:热歌榜
	 * @param {object} params
	 * @param {string} params.params
	 * @param {string} params.encSecKey 加密密钥
	 */
	hotSinglesChart(
		params = {
			params:
				"/m3VsBjIlfZnkugq5AhxwHkkUQhMJfY8bmYPNupgCzGqIYxeak7WqlsfLhyWAyAMadkoQlXviJeniqYwVIOugVXCXqTUI0Vgu8Hg3KDDXfUlubc+vCQaBT1uUsArSjG0VXUwr7WPQW50l9m4WDxCYA",
			encSecKey:
				"dfbd787e5297c8a4cce2a67e517e239e8860ebafb2c2a70b7cdcff8f15bee70ed6210f063d85b31bce79d825d1426e03cc3b031db87d6b2448bd7c0e4b0d1139fdbeafdcc6278436a55d1d71206e61209f054604dbfe32fa85a267eb19f5112a2e90633c269d39b9fa448533b1321aaf9d9ddab35844572f78041aa62b34478f",
		}
	) {
		return axios.post(base.hotSinglesChart, params);
	},
	/** 接口:热门搜索 */
	hotSearches() {
		return axios.get(base.hotSearches);
	},
	/** 接口:搜索建议
	 * @param {object} params
	 * @param {string} params.keywords 关键词
	 * @param {'mobile'} [params.type] 类型
	 */
	searchSuggest(params) {
		return axios.get(base.searchSuggest, { params });
	},

	/** 接口:搜索建议
	 * @param {object} params
	 * @param {string} params.keywords 关键词
	 * @param {number} params.limit 请求结果数量(默认30)
	 * @param {number} params.offset 偏移(用作分页)
	 */
	searchMusic(params) {
		return axios.get(base.searchMusic, { params });
	},
};

export default api;
