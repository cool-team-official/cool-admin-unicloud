'use strict';
/**
 * 部门
 */
const crud = require("crud");
module.exports = {
	...crud,
	/**
	 * 初始化
	 */
	init() {
		return { table: 'sys_department' };
	},
	/**
	 * 部门排序
	 */
	async order() {
		await this.OpService.order(this.getBody());
	}
}
