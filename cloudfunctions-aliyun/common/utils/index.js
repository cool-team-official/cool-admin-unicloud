'use strict';
// 唯一字符串
const uuid = require('uuid');
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
	parseUrl: (url) => {
		const urls = url.split('/');
		const method = urls[urls.length - 1];
		return { cPath: '/controller/'+url.replace('/'+method, ''), method }
	}
}
