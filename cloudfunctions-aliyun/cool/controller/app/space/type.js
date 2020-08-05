'use strict';
/**
 * 图片空间分类
 */
const crud = require("crud");
module.exports = {
	...crud,
	/**
	 * 初始化
	 */
	async init() {
		const {
			db,
			params
		} = this.ctx;
		return {
			table: 'app_space_type'
		};
	},
}