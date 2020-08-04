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
		return await db.info(table, id);
	},
	/**
	 * 所有
	 */
	async list(table) {
		const { db } = this.ctx;
		return await db.list(table);
	},
	/**
	 * 分页查询
	 */
	async page(table, pageOption = {}) {
		const { db, params, utils } = this.ctx;
		const dbCmd = db.command;
		const dbCmds = [];
		// 字段全匹配
		if (pageOption.fieldEq) {
			for (const key of pageOption.fieldEq) {
				if(params[key]){
					const condition = {};
					condition[key] = dbCmd.eq(params[key]);
					dbCmds.push(condition);
				}
			}
		}
		// 模糊查询
		if (params.keyWord && pageOption.keyWordLikeFields) {
			const likeDbCmds = [];
			for (const key of pageOption.keyWordLikeFields) {
				const conditionLike = {};
				conditionLike[key] = new RegExp(`.*${params.keyWord}.*`);
				likeDbCmds.push((conditionLike));
			}
			dbCmds.push(dbCmd.or(likeDbCmds));
		}
		// 其他where 条件
		if (pageOption.where) {
			for (const key in pageOption.where) {
				if(utils.lodash.isEmpty(pageOption.where[key])){
					delete pageOption.where[key];
				}
			}
			dbCmds.push(pageOption.where);
		}
		dbCmds.push({_id: dbCmd.exists(true)})
		const condition = {};
		if (dbCmds.length > 0) {
			condition.where = dbCmd.and(dbCmds);
		}
		return await db.page(table, condition);
	}
}
