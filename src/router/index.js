import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/views/Layout";

// 异步导入组件
const Recommend = () => import("@/views/Recommend");
const Hot = () => import("@/views/Hot");
const Search = () => import("@/views/Search");

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
				path: "recommend",
				name: "recommend",
				component: Recommend,
			},
			// 热歌榜
			{
				path: "hot",
				name: "hot",
				component: Hot,
			},
			// 搜索
			{
				path: "search",
				name: "search",
				component: Search,
			},
		],
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default router;
