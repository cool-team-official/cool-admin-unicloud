'use strict';
module.exports = {
	/**
	 * 个人信息
	 */
	async person() {
		const { db, currentUser } = this.ctx;
		return db.info('sys_user', currentUser.userId);
	}
}
