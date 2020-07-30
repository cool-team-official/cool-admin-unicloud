'use strict';
/**
 * require 
 */
const requireDir = require('require-all');
module.exports = {
	// 为了兼容阿里云
	myRequire: (path) => {
		return require(__dirname + path);
	},
	// 文件夹
	requireDir: (path) => {
		return requireDir(__dirname + path);
	}
}
