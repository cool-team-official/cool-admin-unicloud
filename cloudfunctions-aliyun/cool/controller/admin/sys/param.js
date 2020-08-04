'use strict';
/**
 * 参数配置
 */
const crud = require("crud");
module.exports = {
	...crud,
    /**
	 * 初始化
	 */
	async init() {
		return { table: 'sys_param' };
	}
}
