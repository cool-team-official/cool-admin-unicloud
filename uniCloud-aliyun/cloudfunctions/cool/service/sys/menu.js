'use strict';
/**
 * 菜单
 */
module.exports = {
	/**
	 * 根据角色获得权限信息
	 * @param {[]} roleIds 数组
	 * @param {Boolean} isAdmin 是否是超管
	 */
	async getPerms(roleIds, isAdmin) {
		const { db, utils } = this.ctx;
		const _ = utils.lodash;
		let perms = [];
		let menuIds = [];
		let roles = [];
		const where = {};
		// 得到角色列表
		if (!isAdmin) {
			const rolesResult = await db.collection('sys_role').where({ _id: db.command.in(roleIds) }).get();
			roles = rolesResult.data;
			rolesResult.data.forEach(e => {
				menuIds.push(...e.menuIds);
			})
			menuIds = _.uniq(menuIds);
			where._id = db.command.in(menuIds);
		}
		// 得到所有菜单
		let collection = db.collection('sys_menu');
		const menusResult = await db.collection('sys_menu').where(where).get();
		menusResult.data.forEach(d => {
			if (d.perms) {
				perms = perms.concat(d.perms.split(','));
			}
		});
		perms = _.uniq(perms);
		perms = _.remove(perms, n => {
			return !_.isEmpty(n);
		});
		return { roles, perms, menus: menusResult.data };
	},
	/**
	 * 列表
	 * @param {Object} roleIds
	 * @param {Object} isAdmin
	 */
	async list(roleIds, isAdmin) {
		const { utils } = this.ctx;
		const { menus } = await this.getPerms(roleIds, isAdmin);
		if (!utils.lodash.isEmpty(menus)) {
			menus.forEach(e => {
				const parentMenu = menus.filter(m => {
					if (e.parentId === m.id) {
						return m.name;
					}
				});
				if (!utils.lodash.isEmpty(parentMenu)) {
					e.parentName = parentMenu[0].name;
				}
			});
		}
		return menus;
	}
}
