'use strict';
/**
 * 角色
 */
const crud = require("crud");
module.exports = {
	...crud,
	/**
	 * 初始化
	 */
	async init() {
		return {
			table: 'sys_role',
			pageOption: {
				keyWordLikeFields: [ 'name', 'label']
			}
		};
	}
}
