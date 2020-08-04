import { baseUrl } from "@/config/env";
import { BaseService } from "@/cool";
import store from "@/store";

export default class extends BaseService {
	/**
	 * 文件上传
	 *
	 * @returns
	 * @memberof CommonService
	 */
	upload() {
		return {
			url: baseUrl + "/comm/upload",
			token: store.state.user.token
		};
	}

	/**
	 * oss文件上传
	 * @param {*} url
	 * @param {*} params
	 */
	ossUpload(file) {
		return new Promise((resolve, reject) => {
			uni.chooseImage({
				count: 1,
				async success(res) {
					console.log(res);
					if (res.tempFilePaths.length > 0) {
						let filePath = res.tempFilePaths[0];

						// promise
						const result = await uniCloud.uploadFile({
							filePath: filePath,
							cloudPath: file.name,
							onUploadProgress: function (progressEvent) {
								console.log(progressEvent);
								var percentCompleted = Math.round(
									(progressEvent.loaded * 100) / progressEvent.total
								);
							}
						});
					}
				}
			});
		});
	}

	/**
	 * 获取oss签名
	 */
	ossSign() {
		return this.request({
			url: "/comm/ossSign"
		});
	}

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
			url: "/comm/person-update",
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
