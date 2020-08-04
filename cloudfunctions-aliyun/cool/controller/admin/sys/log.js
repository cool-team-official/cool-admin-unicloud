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
	async init() {
		const { params } = this.ctx;
		return {
			table: 'sys_log',
			pageOption: {
				keyWordLikeFields: ['action', 'name', 'phone'],
				where: {
					departmentId: params.departmentIds ? db.command.in(params.departmentIds.split(',')) : []
				}
			}
		};
	},
	/**
	 * 清空日志
	 */
	async clear() {
		await this.ctx.services.sys.log.clear();
	}
}
