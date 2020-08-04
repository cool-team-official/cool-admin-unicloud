'use strict';
/**
 * 用户
 */
module.exports = {
	/**
	 * 个人信息
	 */
	async person() {
		const { db, currentUser } = this.ctx;
		return db.info('sys_user', currentUser.userId);
	},
	/**
	 * 移动部门
	 * @param {Object} departmentId
	 * @param {Object} userIds
	 */
	async move(departmentId, userIds) {
		const { db } = this.ctx;
		const dbCmd = db.command;
		await db.collection('sys_user').where({
			_id: dbCmd.in(userIds)
		}).update({ departmentId })
	},
	/**
	 * 修改个人信息
	 * @param {Object} param
	 */
	async personUpdate(param) {
		const { db, utils } = this.ctx;
		if (!utils.lodash.isEmpty(param.password)) {
			param.password = utils.md5(param.password);
			const userInfo = await db.info('sys_user', param._id);
			if (!userInfo) {
				throw new Error('用户不存在');
			}
			param.passwordV = userInfo.passwordV + 1;
			await this.ctx.services.sys.data.set(`admin:passwordVersion:${param.id}`, param.passwordV);
		} else {
			delete param.password;
		}
		await db.update('sys_user', param);
	},
	/**
	 * 修改
	 * @param param 数据
	 */
	async update(param) {
		const { db, utils } = this.ctx;
		if (param.username && param.username == 'admin') {
			throw new Error('非法操作~');
		}
		if (!utils.lodash.isEmpty(param.password)) {
			param.password = utils.md5(param.password);
			const userInfo = await db.info('sys_user', param._id);
			if (!userInfo) {
				throw new Error('用户不存在');
			}
			param.passwordV = userInfo.passwordV + 1;
			await this.ctx.services.sys.data.set(`admin:passwordVersion:${param.id}`, param.passwordV);
		} else {
			delete param.password;
		}
		if (param.status === 0) {
			await this.ctx.services.sys.data.del(`admin:token:${userId}`);
		}
		await db.update('sys_user', param);
		//await this.updateUserRole(param);
	}
}
