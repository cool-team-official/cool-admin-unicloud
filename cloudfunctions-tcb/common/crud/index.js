'use strict';
/**
 * 通用增删改查
 */
module.exports = {
	/**
	 * 新增
	 */
	async add() {
		const { params } = this.ctx; 
		const { table } = await this.init();
		return await this.ctx.services.comm.crud.add( table, params);
	},
	/**
	 * 删除
	 */
	async delete() {
		const { params } = this.ctx; 
		const { table } = await this.init();
		return await this.ctx.services.comm.crud.delete( table, params.ids);
	},
	/**
	 * 修改
	 */
	async update() {
		const { params } = this.ctx; 
		const { table } = await this.init();
		return await this.ctx.services.comm.crud.update( table, params);
	},
	/**
	 * 信息
	 */
	async info() {
		const { params } = this.ctx; 
		const { table } = await this.init();
		return await this.ctx.services.comm.crud.info( table, params._id);
	},
	/**
	 * 所有
	 */
	async list() {
		const { table } = await this.init();
		return await this.ctx.services.comm.crud.list( table );
	},
	/**
	 * 分页查询
	 */
	async page() {
		const { table, pageOption } = await this.init();
		return await this.ctx.services.comm.crud.page(table, pageOption);
	}
}
