'use strict';
/**
 * 用户
 */
module.exports = {
	/**
	 * 新增
	 * @param {Object} params
	 */
	async add(params) {
		const { db, utils } = this.ctx;
		params.passwordV = 1;
		params.roleIds = params.roleIdList;
		delete params.roleIdList;
		const exists = await db.one('sys_user', {
			where: { username: params.username }
		})
		if (!utils.lodash.isEmpty(exists)) {
			throw new Error('用户名已经存在~');
		}
		params.password = utils.md5('123456'); // 默认密码  建议未改密码不能登陆
		await db.add('sys_user', params);
	},
	/**
	 * 个人信息
	 */
	async person() {
		const { db, currentUser } = this.ctx;
		const info = await db.info('sys_user', currentUser.userId);
		delete info.password;
		return info;
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
			await this.ctx.services.sys.data.set(`admin:passwordVersion:${param._id}`, param.passwordV);
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
		param.roleIds = param.roleIdList;
		delete param.roleIdList;
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
		// 刷新权限
		this.service.sys.perms.refreshPerms(param);
	},

}
