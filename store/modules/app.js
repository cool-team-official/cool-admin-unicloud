import { app } from "@/config/env";
import { deepMerge, getBrowser } from "@/cool/utils";

export default {
	state: {
		info: {
			...app
		},
		browser: {
			isMobile: false
		}
	},
	mutations: {
		// 设置浏览器信息
		SET_BROWSER(state) {
			state.browser = getBrowser();
		},

		// 更新应用配置
		UPDATE_APP(state, val) {
			deepMerge(state.info, val);
		}
	}
};
