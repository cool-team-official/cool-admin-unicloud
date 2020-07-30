import { BaseService, Service } from "@/cool/index";

@Service("sys/login")
export default class extends BaseService {
	/**
	 * 用户登录
	 *
	 * @param {*} { username, password, captchaId, verifyCode }
	 * @returns
	 * @memberof CommonService
	 */
	login({ username, password, captchaId, verifyCode }) {
		return this.request({
			url: "/login",
			method: "POST",
			data: {
				username,
				password,
				captchaId,
				verifyCode
			}
		});
	}

	/**
	 * 退出登录
	 */
	logout() {
		return this.request({
			url: "/logout",
			method: "POST"
		});
	}

	/**
	 * 权限信息
	 *
	 * @returns
	 * @memberof CommonService
	 */
	permMenu() {
		return this.request({
			url: "/comm/permmenu"
		});
	}
}
