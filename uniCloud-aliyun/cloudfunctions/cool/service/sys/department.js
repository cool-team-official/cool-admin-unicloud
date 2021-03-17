'use strict';
/**
 * 部门
 */
module.exports = {
	/**
	 * 根据角色获得权限信息
	 * @param {[]} roles 角色
	 * @param {Boolean} isAdmin 是否是超管
	 */
	async getByRoleIds(roles, isAdmin) {
		const { db, utils } = this.ctx;
		const _ = utils.lodash;
		let departmentIds = [];
		if (!isAdmin) {
			roles.forEach(e => {
				departmentIds.push(...e.departmentIds);
			})
			return _.uniq(departmentIds);
		} else {
			const departmentResult = await db.collection('sys_department').get();
			return departmentResult.data.map(e => {
				return e._id;
			})
		}
	},

	/**
	 * 部门列表
	 */
	async list() {
		const { db, currentUser, utils } = this.ctx;
		const dbCmd = db.command;
		const permsDepartmentArr = await this.ctx.services.sys.perms.departmentIds(currentUser.userId); // 部门权限
		const where = {
			_id: dbCmd.exists(true)
		}
		if(currentUser.username != 'admin'){
			where._id = dbCmd.in(permsDepartmentArr);
		}
		const dResult = await db.collection('sys_department').where(where).get();
		const departments = dResult.data;
		if (!utils.lodash.isEmpty(departments)) {
			departments.forEach(e => {
				const parentMenu = departments.filter(m => {
					if (e.parentId === m.id) {
						return m.name;
					}
				});
				if (!utils.lodash.isEmpty(parentMenu)) {
					e.parentName = parentMenu[0].name;
				}
			});
		}
		return departments;
	},

	/**
	 * 排序
	 * @param {Object} params 重新排序后的
	 */
	async order(params) {
		for (const e of params) {
			await this.ctx.db.update('sys_department', e);
		}
	}
}
