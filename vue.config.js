const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
	publicPath: process.env.VUE_APP_ENV === "product" ? "./" : "/",
	transpileDependencies: true,
	// 开发时的设置
	devServer: {
		proxy: {
			"/api": {
				target: "http://iwenwiki.com:3000", //目标地址 请求的后台接口
				ws: true,
				changeOrigin: true,
				pathRewrite: {
					"^/api": "",
				},
			},
		},
	},
});
