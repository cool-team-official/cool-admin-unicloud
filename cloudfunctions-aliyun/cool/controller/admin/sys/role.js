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
		const {
			db,
			params
		} = this.ctx;
		return {
			table: 'sys_role',
			pageOption: {
				keyWordLikeFields: ['name', 'label'],
				where: {
					label: db.command.neq('admin')
				}
			}
		};
	},
	/**
	 * 列表
	 */
	async list() {
		const { db } = this.ctx;
		const result = await db.collection('sys_role').where({
			label: db.command.neq('admin')
		}).get();
		return result.data;
	},
	/**
	 * 更新
	 */
	async update() {
		const { services, params } = this.ctx;
		await services.sys.role.update(params);
	},
	/**
	 * 新增
	 */
	async add() {
		const { services, params } = this.ctx;
		await services.sys.role.add(params);
	},
	/**
	 * 详情
	 */
	async info() {
		const { services, params } = this.ctx;
		return await services.sys.role.info(params._id);
	}
}
