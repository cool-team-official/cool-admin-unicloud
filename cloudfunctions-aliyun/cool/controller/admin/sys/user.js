'use strict';
/**
 * 用户
 */
const crud = require("crud");
module.exports = {
	...crud,
	/**
	 * 初始化
	 */
	init() {
		return { table: 'sys_user' };
	},
	/**
	 * 移动部门
	 */
	async move() {
		await this.OpService.move(this.getBody());
		this.res();
	}
}
