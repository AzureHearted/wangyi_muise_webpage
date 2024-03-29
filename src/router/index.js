import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/views/layout";

// 异步导入组件
const Recommend = () => import("@/views/recommend");
const Hots = () => import("@/views/hots");
const Search = () => import("@/views/search");

Vue.use(VueRouter);

const routes = [
	// layout框架路由
	{
		path: "/",
		name: "layout",
		component: Layout,
		redirect: "/recommend",
		children: [
			// 推荐音乐
			{
				path: "/recommend",
				name: "recommend",
				component: Recommend,
			},
			// 热歌榜
			{
				path: "/hot",
				name: "hot",
				component: Hots,
			},
			// 搜索
			{
				path: "/search",
				name: "search",
				component: Search,
			},
		],
	},
];

const router = new VueRouter({
	// mode: "history",
	mode: process.env.VUE_APP_ENV === "product" ? "hash" : "history",
	base: process.env.BASE_URL,
	routes,
});

export default router;
