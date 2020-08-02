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
	}
}
