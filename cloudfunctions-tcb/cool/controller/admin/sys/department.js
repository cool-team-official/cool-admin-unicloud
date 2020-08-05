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
	async init() {
		return { table: 'sys_department' };
	},
	/**
	 * 列表
	 */
	async list(){
		return this.ctx.services.sys.department.list();
	},
	/**
	 * 部门排序
	 */
	async order() {
		const { services, params } = this.ctx;
		await this.ctx.services.sys.department.order(params);
	}
}
