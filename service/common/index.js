import { BaseService } from "@/cool";

export default class extends BaseService {
	/**
	 * 用户登录
	 *
	 * @param {*} { username, password, captchaId, verifyCode }
	 * @returns
	 * @memberof CommonService
	 */
	userLogin({ username, password, captchaId, verifyCode }) {
		return this.request({
			url: "/comm/login",
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
	 * 用户退出
	 */
	userLogout() {
		return this.request({
			url: "/comm/logout",
			method: "POST"
		});
	}

	/**
	 * 用户信息
	 *
	 * @returns
	 * @memberof CommonService
	 */
	userInfo() {
		return this.request({
			url: "/comm/person"
		});
	}

	/**
	 * 用户信息修改
	 *
	 * @param {*} params
	 * @returns
	 * @memberof CommonService
	 */
	userUpdate(params) {
		return this.request({
			url: "/comm/personUpdate",
			method: "POST",
			data: {
				...params
			}
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

	/**
	 * 图片验证码 svg
	 *
	 * @param {*} { height, width }
	 * @returns
	 * @memberof CommonService
	 */
	captcha({ height, width }) {
		return this.request({
			url: "/comm/captcha",
			params: {
				height,
				width
			}
		});
	}
}
