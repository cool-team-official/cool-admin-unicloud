'use strict';
const verify = require('verify');
/**
 * 验证码工具类
 */
module.exports = {
	// 验证码
	async captcha() {
		const { utils, param } = this.ctx;
		const { result, text } = verify.captcha(param, utils.uuid());
		return result;
	}
}
