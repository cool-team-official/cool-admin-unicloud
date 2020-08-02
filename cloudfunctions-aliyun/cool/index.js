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
const config = myRequire('/config');
// 中间件
const middlewares = requireDir('/middleware');
exports.main = async (event, context) => {
	try {
		// url 调用函数地址 param 参数 token 令牌
		const { url, params, token } = event; 
		//  const {
		// 	url = "/admin/sys/user/page",
		// 		params = {
		// 			username: "admin",
		// 			// password: "123456",
		// 			// captchaId: "099a47b1-c579-4633-93a8-15b24f9735c6",
		// 			// verifyCode: "8624",
		// 			// keyWord: "admin"
		// 		},
		// 		token =
		// 		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlSWRzIjpbIjYxZDE0ZDc0ZjE3ZDQyMjg4MzAxZTllZDc5ODk0OWU5IiwiOTc0YjRkNzFmODkyNDY1MzkyMjcxMDNmY2RiZjIxMDAiXSwidXNlcklkIjoiZGM0ODU0OWI4MDc4NGU2NmIyZWRlOTM0MjcxMzI5Y2EiLCJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmRWZXJzaW9uIjoxLCJpYXQiOjE1OTYzNjA4MjgsImV4cCI6MTU5Njk2NTYyOH0.dANYIadoCmTx1AWLbF3DhtVpdmD8H0WmjCPtlR6Fcug",
		// } = event;

		const {
			cPath,
			method
		} = utils.parseUrl(url);
		const controller = myRequire(cPath);

		// 上下文对象
		let ctx = {
			currentUser: {},
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

		// 中间件
		// for (const middleware in middlewares) {
		// 	await middlewares[middleware](url, token, ctx).catch(err => {
		// 		throw new Error(err);
		// 	});
		// }

		return {
			code: 1000,
			message: 'success',
			data: await controller[method].call(controller)
		};
	} catch (err) {
		uniCloud.logger.error(err);
		return {
			code: err.message == '登录失效或无权访问'? 1002: 1001,
			message: err.message,
		};
	}
}
