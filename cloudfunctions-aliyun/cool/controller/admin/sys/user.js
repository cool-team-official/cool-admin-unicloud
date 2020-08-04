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
	async init() {
		const {
			db,
			params
		} = this.ctx;
		return {
			table: 'sys_user',
			pageOption: {
				keyWordLikeFields: ['username', 'name', 'phone'],
				where: {
					departmentId: params.departmentIds ? db.command.in(params.departmentIds.split(',')) : []
				}
			}
		};
	},
	/**
	 * 移动部门
	 */
	async move() {
		const { services, params } = this.ctx;
		const { departmentId, userIds } = this.ctx.params;
		await services.sys.user.move(departmentId, userIds);
	},
	/**
	 * 更新
	 */
	async update() {
		const { services, params } = this.ctx;
		await services.sys.user.update(params);
	}
}
