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
		if (!(ids instanceof Array)) {
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
		const now = moment().format('YYYY-MM-DD HH:mm:ss');
		data.updateTime = now;
		const _id = data._id;
		delete data._id;
		await collection.doc(_id).update(data);
	},

	// 查询信息
	async info(table, id) {
		const collection = db.collection(table);
		const result = await collection.doc(id).get();
		return result.data.length > 0 ? result.data[0] : null;
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
		const reslut = await collection.get();
		return reslut.data;
	},

	// 分页查询
	async page(table, condition = {}, page = 1, size = 15, order = 'createTime', sort = 'desc') {
		let collection = db.collection(table);
		for (const key in condition) {
			collection = collection[key](condition[key]);
		}
		const totalResult = collection.count();
		collection = collection.orderBy(order, sort).skip((page - 1) * size).limit(size);
		const listResult = collection.get();
		const result = await Promise.all([totalResult, listResult]);
		return { list: result[1].data, pagination: { page, size, total: result[0].total } };
	}
}
