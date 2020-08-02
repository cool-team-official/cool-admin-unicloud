'use strict';
/**
 * 通用增删改查
 */
module.exports = {
	/**
	 * 新增
	 */
	async add() {
		const { table, params } = this.init();
		return await this.ctx.services.comm.crud.add( table, params);
	},
	/**
	 * 删除
	 */
	async delete() {
		const { table, params } = this.init();
		return await this.ctx.services.comm.crud.delete( table, params.ids);
	},
	/**
	 * 修改
	 */
	async update() {
		const { table, params } = this.init();
		return await this.ctx.services.comm.crud.update( table, params);
	},
	/**
	 * 信息
	 */
	async info() {
		const { table, params } = this.init();
		return await this.ctx.services.comm.crud.update( table, params._id);
	},
	/**
	 * 所有
	 */
	async list() {
		const { table } = this.init();
		return await this.ctx.services.comm.crud.list( table );
	},
	/**
	 * 分页查询
	 */
	async page() {
		const { table, pageOption } = this.init();
		return await this.ctx.services.comm.crud.page(table, pageOption);
	}
}
