'use strict';
module.exports = {
	// 获取验证码
	async captcha() {
		const reuslt = await this.ctx.services.comm.verify.captcha();
		return reuslt;
	}
}
