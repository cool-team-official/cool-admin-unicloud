'use strict';
/**
 * url 调用函数地址
 * param 参数
 * token 令牌
 */
// 数据库
const db = uniCloud.database();
// 工具类
const utils = require('utils');
const fs = require('fs');
// 兼容阿里云require
const { myRequire, requireDir } = require(__dirname + '/require');
exports.main = async (event, context) => {
	const { url, param, token } = event;
	
	const { cPath, method } = utils.parseUrl('/admin/comm/captcha');
	const controller = myRequire(cPath);
	
	const ctx = {
		context,
		services: requireDir('/service')
	}
	
	
	
	console.log(ctx.services)
	return utils.lodash.find([{name: 'a', age: 12}], {name: 'a'});
	
	//return await controller[method]();
}
