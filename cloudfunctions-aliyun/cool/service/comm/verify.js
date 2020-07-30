'use strict';
const verify = require('verify');
/**
 * 验证码工具类
 */
module.exports = {
	// 验证码
	captcha: async (event, context) => {
		const { result, text } = verify.captcha();
		console.log(result, text);
		//await this.app.redisSet(`verify:img:${result.captchaId}`, svg.text.toLowerCase(), 1800);
		return result;
	}
}
