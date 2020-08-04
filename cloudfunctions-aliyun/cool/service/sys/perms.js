'use strict';
/**
 * 权限相关
 */
module.exports = {
	/**
	 * 获得权限菜单
	 */
	async permmenu() {
		const { services, currentUser } = this.ctx;
		console.log('======', currentUser);
		const { perms, menus } = await services.sys.menu.getPerms(currentUser.roleIds, currentUser.username == 'admin' ?
			true : false);
		return { perms, menus };
	},
	/**
	 * 根据用户ID获得部门权限
	 * @param userId
	 * @return 部门ID数组
	 */
	async departmentIds(userId) {
		const department = await this.ctx.services.sys.data.get(`admin:department:${ userId }`);
		if (department) {
			return JSON.parse(department);
		} else {
			return [];
		}
	}
}
