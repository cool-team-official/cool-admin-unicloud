'use strict';
/**
 * 角色
 */
const crud = require("crud");
module.exports = {
	...crud,
	/**
	 * 初始化
	 */
	async init() {
		return { table: 'sys_menu' };
	},
	/**
	 * 列表
	 */
	async list() {
		const { currentUser } = this.ctx;
		return await this.ctx.services.sys.menu.list(currentUser.roleIds, currentUser.username == 'admin' ? true : false);
	}
}
