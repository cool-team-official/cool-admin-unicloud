'use strict';

// 数据库
const db = uniCloud.database();
// 工具类
const utils = require('utils');
const fs = require('fs');
// 兼容阿里云require
const {
	myRequire,
	requireDir
} = require(__dirname + '/require');
exports.main = async (event, context) => {
	// url 调用函数地址 param 参数 token 令牌
	const {
		url,
		param,
		token
	} = event;

	const {
		cPath,
		method
	} = utils.parseUrl('/admin/comm/captcha');
	const controller = myRequire(cPath);

	// 上下文对象
	const ctx = {
		request: context,
		param,
		services: requireDir('/service'),
		utils
	}
	// service 注入ctx
	utils.serviceCtx(ctx.services, ctx);
	// controller 注入ctx
	controller['ctx'] = ctx;
	try {
		return {
			code: 1000,
			message: 'success',
			data: await controller[method].call(controller)
		};
	} catch (err) {
		return {
			code: 1001,
			message: err,
		};
	}
}
