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
	// async move() {
	// 	await this.OpService.move(this.getBody());
	// 	this.res();
	// },
	
	async move() {
		
	// 	const {db} = this.ctx;
		
	// 	const startTime = new Date().getTime();
	// 	console.log("开始", startTime)
	
	// 	const dbCmd = db.command;
	// 	await db.collection('sys_user').where({_id: dbCmd.exists(true)}).count();
	// 	await db.list('sys_user')
		
	// 	const endTime = new Date().getTime();
	// 	console.log("耗时", endTime-startTime)
	}
}
