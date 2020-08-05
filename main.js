import Vue from "vue";
import Crud2 from "cl-crud2";
import ElementUI from "element-ui";
import store from "@/store";
import { LoadService } from "@/cool";
import App from "./App";
import Layout from "@/components/layout";

import "@/filter";
import "@/icons";
import "@/static/css/element-variables.scss";

LoadService({ store });

Vue.component("cl-layout", Layout);
Vue.use(ElementUI);
Vue.use(Crud2, {
	crud: {
		dict: {
			sort: {
				prop: "order",
				order: "sort"
			}
		},
		fn: {
			permission(that) {
				const { permission } = that.$store.state.menu;
				const { add, delete: del, update } = that.service.permission || {};

				return {
					add: permission.includes(add),
					delete: permission.includes(del),
					update: permission.includes(update)
				};
			}
		}
	}
});

store.dispatch("appLoad");

App.mpType = "app";
Vue.config.productionTip = false;

const app = new Vue({
	store,
	...App
});
app.$mount();
