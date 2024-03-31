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
	// 接口:最新音乐
	latestMusic: host + "/playlist/detail?id=3779629",
	// 接口:热歌榜 (由于跨域,因此需要配置反向代理) wangYiApi
	hotSinglesChart: host + "/playlist/detail?id=3778678",
	// 接口:热搜
	hotSearches: host + "/search/hot",
	// 接口:搜索建议
	searchSuggest: host + "/search/suggest",
	// 接口:搜索音乐
	searchMusic: host + "/cloudsearch",
	// 接口:音乐url
	getMusicUrl: host + "/song/url",
	// 接口:音乐信息
	getMusicInfo: host + "/song/detail",
	// 接口:歌词接口
	getLyric: host + "/lyric",
};

const api = {
	/** 接口:推荐音乐
	 * @param {object} params
	 * @param {number} params.limit 数量限制,默认30个
	 */
	recommendedMusic(params) {
		return axios.get(base.recommendedMusic, { params });
	},
	/** 接口:最新音乐 */
	latestMusic() {
		return axios.get(base.latestMusic);
	},
	/** 接口:热歌榜 */
	hotSinglesChart() {
		return axios.get(base.hotSinglesChart);
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
	/** 接口:获取音乐url
	 * @param {object} params
	 * @param {number} params.id 歌曲id
	 * @param {number?} params.br 码率 默认设置了 999000 即最大码率,如果要 320k 则可设置为 320000,其他类推
	 */
	getMusicUrl(params) {
		return axios.get(base.getMusicUrl, { params });
	},
	/** 接口:获取音乐信息
	 * @param {object} params
	 * @param {string} params.ids 歌曲id列表拼接的字符串,格式为 123,345
	 */
	getMusicInfo(params) {
		return axios.get(base.getMusicInfo, { params });
	},
	/** 接口:获取歌词
	 * @param {object} params
	 * @param {number} params.id 歌曲id
	 */
	getLyric(params) {
		return axios.get(base.getLyric, { params });
	},
};

export default api;
