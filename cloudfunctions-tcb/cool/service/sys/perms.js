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
	},
	/**
	 * 刷新权限
	 * @param user 用户
	 */
	async refreshPerms(user) {
		const { services, config } = this.ctx;
		const { perms } = await this.ctx.services.sys.menu.getPerms(user.roleIds, user.username == 'admin' ? true : false);
		await services.sys.data.set(`admin:perms:${ userId }`, JSON.stringify(perms), this.app.config.token.expires);
		// 更新部门权限
		const departments = await this.services.sys.department.getByRoleIds(roleIds, user.username == 'admin' ? true : fals);
		await services.sys.data.set(`admin:department:${ userId }`, JSON.stringify(departments), config.tokenExpires);
	}
}
