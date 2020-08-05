'use strict';
/**
 * 系统数据
 */
module.exports = {
	/**
	 * 设置数据
	 * @param {Object} key 键
	 * @param {Object} data 值
	 * @param {Object} expiredTime 过期时间 单位秒
	 */
	async set(key, data, expiredTime) {
		const { db } = this.ctx;
		const nowTime = Date.parse(new Date()) / 1000;
		if (!expiredTime) {
			expiredTime = 10000000000;
		}
		const check = await db.one('sys_data', {
			where: { key }
		})
		if (check) {
			await db.update('sys_data', { _id: check._id, key, data, expiredTime: nowTime + expiredTime });
		} else {
			await db.add('sys_data', { key, data, expiredTime: nowTime + expiredTime });
		}
	},

	/**
	 * 获得数据
	 * @param {Object} key
	 */
	async get(key) {
		const { db, utils } = this.ctx;
		const result = await db.collection('sys_data').where({
			key,
			expiredTime: db.command.gte(Date.parse(new Date()) / 1000)
		}).limit(1).get();
		if (!utils.lodash.isEmpty(result.data)) {
			return result.data[0].data;
		}
		return null;
	},
	/**
	 * 删除
	 * @param {Object} key
	 */
	async del(key) {
		await this.ctx.db.collection('sys_data').where({ key }).remove();
	}
}
