'use strict';
// 数据库
const db = uniCloud.database();
const dbCmd = db.command;
const moment = require('moment');
module.exports = {
	/**
	 * 数据库
	 */
	baseDB: db,
	/**
	 * 指令
	 */
	command: db.command,
	/**
	 * 数据表
	 */
	collection(table) {
		return db.collection(table);
	},
	/**
	 * 新增
	 * @param {Object} table 表
	 * @param {Object} data 数据
	 */
	async add(table, data) {
		const collection = db.collection(table);
		const now = moment().format('YYYY-MM-DD HH:mm:ss');
		data.createTime = now;
		data.updateTime = now;
		return await collection.add(data);
	},

	/**
	 * 删除
	 * @param {Object} table 表明
	 * @param {Object} ids
	 */
	async delete(table, ids) {
		const collection = db.collection(table);
		if (ids instanceof String) {
			ids = ids.split(',');
		}
		const dbCmd = db.command
		await collection.where({ _id: dbCmd.in(ids) }).remove()
	},

	/**
	 * 更新
	 * @param {Object} table
	 * @param {Object} data
	 */
	async update(table, data) {
		const collection = db.collection(table);
		const id = data.id;
		delete data.id;
		const now = moment().format('YYYY-MM-DD HH:mm:ss');
		data.updateTime = now;
		await collection.doc(id).update(data);
	},

	// 查询信息
	async info(table, id) {
		const collection = db.collection(table);
		return await collection.doc(id).get();
	},

	// 查询一个
	async one(table, condition) {
		let collection = db.collection(table);
		for (const key in condition) {
			collection = collection[key](condition[key]);
		}
		const result = await collection.limit(1).get();
		return result.data.length > 0 ? result.data[0] : null;
	},

	// 查询所有
	async list(table) {
		const collection = db.collection(table);
		return await collection.get();
	},

	// 分页查询
	async page(table, page = 1, size = 15, order = 'createTime', sort = 'desc', condition) {
		const collection = db.collection(table);
		for (const key in condition) {
			collection[key](condition[key]);
		}
		collection.skip((page - 1) * size).limit(size).orderBy(order, sort);
		const list = await collection.get();
		const total = await collection.count();
		return { list, pagination: { page, size, total } };
	}
}
