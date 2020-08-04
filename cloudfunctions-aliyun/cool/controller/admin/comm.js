'use strict';
/**
 * 通用
 */
module.exports = {
	/**
	 * 验证码
	 */
	async captcha() {
		return await this.ctx.services.comm.verify.captcha();
	},

	/**
	 * 登录
	 */
	async login() {
		return await this.ctx.services.sys.login.login();
	},

	/**
	 * 退出登录
	 */
	async logout() {
		const { currentUser } = this.ctx;
		return await this.ctx.services.sys.logout(currentUser.userId);
	},

	/**
	 * 获得个人信息
	 */
	async person() {
		return await this.ctx.services.sys.user.person();
	},

	/**
	 * 修改个人信息
	 */
	async personUpdate() {
		const { params, currentUser } = this.ctx;
		params._id = currentUser.userId;
		await this.ctx.services.sys.user.personUpdate(params);
	},

	/**
	 * 权限菜单
	 */
	async permmenu() {
		return await this.ctx.services.sys.perms.permmenu();
	}
}
