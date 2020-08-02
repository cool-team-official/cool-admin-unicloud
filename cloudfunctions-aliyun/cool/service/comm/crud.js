'use strict';
/**
 * 通用增删改查
 */
module.exports = {
	/**
	 * 新增
	 */
	async add(table, params) {
		const { db } = this.ctx;
		await db.add(table, params);
	},
	/**
	 * 删除
	 */
	async delete(table, ids) {
		const { db } = this.ctx;
		await db.delete(table, ids);
	},
	/**
	 * 修改
	 */
	async update(table, params) {
		const { db } = this.ctx;
		await db.update(table, params);
	},
	/**
	 * 信息
	 */
	async info(table, id) {
		const { db } = this.ctx;
		await db.info(table, id);
	},
	/**
	 * 所有
	 */
	async list(table) {
		const { db } = this.ctx;
		await db.list(table);
	},
	/**
	 * 分页查询
	 */
	async page(table, pageOption = {}) {
		pageOption = {
			keyWordLikeFields: ['username'],
			fieldEq: ['username']
		}
		const { db, params } = this.ctx;
		const dbCmd = db.command;
		const dbCmds = [];
		// 字段全匹配
		if (pageOption.fieldEq) {
			for (const key of pageOption.fieldEq) {
				const condition = {};
				condition[key] = dbCmd.eq(params[key])
				dbCmds.push(dbCmd.and(condition))
			}
		}
		// 模糊查询 new RegExp(`/${params.keyWord}/`) 
		if (params.keyWord && pageOption.keyWordLikeFields) {
			const likeDbCmds = [];
			for (const key of pageOption.keyWordLikeFields) {
				const condition = {};
				condition[key] = new RegExp(`.*${params.keyWord}.*`);
				likeDbCmds.push(dbCmd.or(condition));
			}
			dbCmds.push(dbCmd.and(likeDbCmds));
		}
		// 其他where 条件
		if (pageOption.where) {
			dbCmds.push(where);
		}
		const condition = {};
		if (dbCmds.length > 0) {
			console.log('>>>>>>>', JSON.stringify(dbCmds))
			condition.where = dbCmd.and(dbCmds);
		}
		return await db.page(table, condition);
	}
}
