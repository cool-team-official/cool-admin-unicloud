import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import app from "./modules/app";
import process from "./modules/process";
import menu from "./modules/menu";
import user from "./modules/user";

Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
		app,
		process,
		menu,
		user,
		main: {
			actions: {
				async appLoad() {
					if (store.state.user.token) {
						await store.dispatch("permMenu");
						store.dispatch("userInfo");
					}
				}
			}
		}
	},
	getters
});

export default store;
