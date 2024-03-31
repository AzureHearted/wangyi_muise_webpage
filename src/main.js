import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/css/base.css"; // 引入自定义全局样式
import "@/plugins/vant"; // 引入vant组件
import api from "@/api"; // 导入接口对象


Vue.prototype.$api = api; // 在Vue原型上挂在api对象

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount("#app");
