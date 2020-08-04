'use strict';
/**
 * 系统日志
 */
module.exports = {
	/**
	 * 保存日志
	 * @param {Object} url
	 * @param {Object} params
	 * @param {Object} ip
	 */
	async save(url, params, ip) {
		const { db, currentUser, utils } = this.ctx;
		await db.add('sys_log', {
			userId: currentUser.userId,
			action: url,
			ip,
			name: currentUser.username,
			ipAddr: utils.getIpAddr(ip),
			params: JSON.stringify(params)
		})
	},
	/**
	 * 清空日志
	 */
	async log() {
		const { db } = this.ctx;
		const dbCmd = db.command;
		await this.ctx.db.collection('sys_log').where({
			_id: dbCmd.exists(true)
		}).remove()
	}

}
