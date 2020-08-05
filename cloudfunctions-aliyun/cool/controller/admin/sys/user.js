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
					username: db.command.neq('admin'),
					departmentId: params.departmentIds ? db.command.in(params.departmentIds.split(',')) : []
				}
			}
		};
	},
	/**
	 * 新增
	 */
	async add(){
		const { services, params } = this.ctx;
		await services.sys.user.add(params);
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
	},
	/**
	 * 详情
	 */
	async info() {
		const { db, params } = this.ctx;
		const info = await db.info('sys_user', params._id);
		info.roleIdList = info.roleIds;
		delete info.password;
		delete info.roleIds;
		return info;
	}
}
