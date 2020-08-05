'use strict';
const verify = require('verify');
/**
 * 验证码工具类
 */
module.exports = {
	/**
	 * 获得验证码
	 */
	async captcha() {
		const { utils, params, services } = this.ctx;
		const captchaId = utils.uuid();
		const { result, text } = verify.captcha(params, captchaId);
		await services.sys.data.set(`verify:img:${captchaId}`, text);
		return result;
	},
	/**
	 * 检查验证码是否正确
	 * @param {Object} captchaId 验证码ID
	 * @param {Object} value 值
	 */
	async check(captchaId, value) {
		const { services } = this.ctx;
		const rv = await services.sys.data.get(`verify:img:${captchaId}`);
		if (!rv || !value || value.toLowerCase() !== rv) {
			return false;
		} else {
			await services.sys.data.del(`verify:img:${captchaId}`);
			return true;
		}
	}
}
