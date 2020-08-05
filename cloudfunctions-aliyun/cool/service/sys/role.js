'use strict';
/**
 * 角色
 */
module.exports = {
	/**
	 * 更新
	 * @param role 角色
	 */
	async update(role) {
		const { db } = this.ctx;
		const dbCmd = db.command;
		role.menuIds = role.menuIdList;
		role.departmentIds = role.departmentIdList;
		delete role.menuIdList;
		await db.update('sys_role', role);
		// 获得需要刷新权限的用户并刷新权限
		const usersResult = await db.collection('sys_user').where({
			roleIds: dbCmd.all([role._id])
		}).get()
		for (const user of usersResult.data) {
			this.ctx.services.sys.perms.refreshPerms(user);
		}
	},
	/**
	 * 新增
	 * @param {Object} params
	 */
	async add(params) {
		const { db, currentUser } = this.ctx;
		params.menuIds = params.menuIdList;
		params.userId = currentUser.userId;
		params.departmentIds = params.departmentIdList;
		delete params.menuIdList;
		delete params.departmentIdList;
		await db.add('sys_role', params);
	},
	/**
	 * 详情
	 * @param {Object} _id ID
	 */
	async info(id) {
		const { db } = this.ctx;
		const info = await db.info('sys_role', id);
		if (info) {
			const menuIdList = info.menuIds;
			const departmentIdList = info.departmentIds;
			delete info.menuIds;
			delete info.departmentIds;
			return {
				...info,
				menuIdList,
				departmentIdList,
			};
		}
		return {};
	}
}
