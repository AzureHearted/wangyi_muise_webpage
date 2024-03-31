import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/views/layout";

// 异步导入组件
const Home = () => import("@/views/home");
const Recommend = () => import("@/views/home/recommend");
const Hots = () => import("@/views/home/hots");
const Search = () => import("@/views/home/search");
const Player = () => import("@/views/player");

Vue.use(VueRouter);

const routes = [
	// layout框架路由
	{
		path: "/",
		name: "layout",
		component: Layout,
		redirect: "/home/recommend",
		children: [
			{
				path: "/home",
				name: "home",
				redirect: "/home/recommend",
				component: Home,
				children: [
					// 推荐音乐
					{
						path: "/home/recommend",
						name: "recommend",
						component: Recommend,
					},
					// 热歌榜
					{
						path: "/home/hot",
						name: "hot",
						component: Hots,
					},
					// 搜索
					{
						path: "/home/search",
						name: "search",
						component: Search,
					},
				],
			},
			{
				path: "/player/:id", // 动态路由，用于播放列表页面。
				name: "player", // 路由名称。
				component: Player,
				props: true, // 启用路由参数作为组件的props传递。
			},
		],
	},
];

const router = new VueRouter({
	// mode: "history",
	// mode: "hash",
	mode: process.env.VUE_APP_ENV === "product" ? "hash" : "history",
	base: process.env.BASE_URL,
	routes,
	// 设置路由时将页面返回顶部
	scrollBehavior(to, from, savedPosition) {
		return { x: 0, y: 0 }; // 返回顶部
	},
});

export default router;
