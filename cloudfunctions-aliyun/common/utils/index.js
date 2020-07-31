'use strict';
// 唯一字符串
const {
	v4: uuid
} = require('uuid');
// md5 加密
const md5 = require('md5');
// 时间处理工具类
const moment = require('moment');
// js工具类
const lodash = require('lodash');
module.exports = {
	uuid,
	md5,
	moment,
	lodash,
	// 将URL解析成需要调用的controller和方法
	parseUrl(url) {
		const urls = url.split('/');
		const method = urls[urls.length - 1];
		return {
			cPath: '/controller/' + url.replace('/' + method, ''),
			method
		}
	},
	// 将ctx注入到各个service
	serviceCtx(serivces, ctx) {
		for (const key in serivces) {
			if (typeof serivces[key] == 'function') {
				continue;
			}
			if (typeof serivces[key] == 'object') {
				this.serviceCtx(serivces[key], ctx);
			}
			const keys = Object.keys(serivces[key]);
			if (!lodash.isEmpty(keys)) {
				if (typeof serivces[key][keys[0]] == 'function') {
					serivces[key]['ctx'] = ctx;
				}
			}
		}
	}
}
