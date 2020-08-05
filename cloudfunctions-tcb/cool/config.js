'use strict';
/**
 * 配置
 */
module.exports = {
	// jwt秘钥
	jwtSecret: 'JKFBBBAIKHH',
	// token过期时间
	tokenExpires: 24 * 3600 * 7,
	// 单点登录
	SSO: false,
	// 忽略token验证的地址
	noTokenUrl: [
		'/admin/comm/captcha',
		'/admin/comm/login',
		'/admin/comm/logout'
	]
}
