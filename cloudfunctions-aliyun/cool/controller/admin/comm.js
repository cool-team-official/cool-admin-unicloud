'use strict';
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
		return await this.ctx.services.sys.logout();
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
		this.res({ data: await this.service.sys.user.personUpdate(this.getBody()) });
	},

	/**
	 * 权限菜单
	 */
	async permmenu() {
		this.res({ data: await this.service.sys.perms.permmenu(this.ctx.decoded.roleIds) });
	}
}
