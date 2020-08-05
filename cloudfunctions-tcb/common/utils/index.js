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
// jwt工具类
const jwt = require('jsonwebtoken');
// IP地址
const ipdb = require('ipip-ipdb');
module.exports = {
	uuid,
	md5,
	moment,
	lodash,
	jwt,
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
			if (key == 'ctx') {
				continue;
			}
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
	},
	// 获得IP地址
	getIpAddr(ip) {
		try {
			const bst = new ipdb.BaseStation(__dirname+'/ipipfree.ipdb');
			const result = bst.findInfo(ip, 'CN');
			const addArr = [];
			if (result) {
				addArr.push(result.countryName);
				addArr.push(result.regionName);
				addArr.push(result.cityName);
				return lodash.uniq(addArr).join('');
			}
		} catch (err) {
			uniCloud.logger.error(err)
			return '无法获取地址信息';
		}
	}
}
