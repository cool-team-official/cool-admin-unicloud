'use strict';

// 工具类
const utils = require('utils');
const fs = require('fs');
const db = require('db');
// 兼容阿里云require
const {
	myRequire,
	requireDir
} = require(__dirname + '/require');
// 配置
const config = require(__dirname + '/config');
exports.main = async (event, context) => {
	// url 调用函数地址 param 参数 token 令牌
	const { url, params, token } = event;
	// const {
	// 	url = "/admin/comm/login",
	// 		params = {
	// 			username: "admin",
	// 			password: "123456",
	// 			captchaId: "44588c49-c30d-4c28-a25e-945cbec1678f",
	// 			verifyCode: "4966"
	// 		},
	// 		token =
	// 		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlSWRzIjpbIjEiXSwidXNlcklkIjoiMSIsInBhc3N3b3JkVmVyc2lvbiI6MSwiaWF0IjoxNTk1NzcyMTg3LCJleHAiOjE1OTYzNzY5ODd9.O0pUalttg5NctMP8xQCdhYr9o2EgQPEA-rt6ERzuDbk",
	// } = event;

	const {
		cPath,
		method
	} = utils.parseUrl(url);
	const controller = myRequire(cPath);

	// 上下文对象
	const ctx = {
		config,
		db,
		request: context,
		params,
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
		uniCloud.logger.error(err);
		return {
			code: 1001,
			message: err.message,
		};
	}
}
