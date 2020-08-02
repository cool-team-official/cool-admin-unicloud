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
		// 得到角色列表
		if (!isAdmin) {
			roles.data.forEach(e => {
				departmentIds.push(...e.departmentIds);
			})
			return _.uniq(menuIds);
		} else {
			const departmentResult = await db.collection('sys_department').get();
			return departmentResult.data.map(e => {
				return e._id;
			})
		}
	}
}
