'use strict';
/**
 * 日志
 */
const crud = require("crud");
module.exports = {
	...crud,
	/**
	 * 初始化
	 */
	init() {
		return { table: 'sys_log' };
	},
	/**
	 * 清空日志
	 */
	async clear() {
		await this.OpService.clear(true);
		this.res();
	}
}
