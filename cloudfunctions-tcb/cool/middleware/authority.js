'use strict';
/**
 * 权限过滤
 */
module.exports = (url, token, ctx) => {
	return new Promise(async (reslove, reject) => {
		const tips = "登录失效或无权访问";
		const { config, utils } = ctx;
		if (config.noTokenUrl.includes(url)) {
			reslove(true);
		}
		try {
			// 解析token中的用户信息
			const currentUser = await utils.jwt.verify(token, config.jwtSecret);
			if (currentUser) {
				ctx.currentUser = currentUser;
				// 如果是通用接口 直接通过
				if (utils.lodash.startsWith(url, '/admin/comm/')) {
					reslove(true);
				}
				const passwordVP = ctx.services.sys.data.get(`admin:passwordVersion:${currentUser.userId}`);
				const rTokenP = ctx.services.sys.data.get(`admin:token:${ currentUser.userId }`);
				const permsP = ctx.services.sys.data.get(`admin:perms:${ currentUser.userId }`);
				let [rToken, perms, passwordV] = await Promise.all([rTokenP, permsP, passwordVP]);
				if (!rToken) {
					reject(tips);
				}
				// 判断密码版本是否正确
				if (passwordV != currentUser.passwordVersion) {
					reject(tips);
				}
				if (rToken !== token && config.SSO) {
					reject(tips);
				} else {
					if (!utils.lodash.isEmpty(perms)) {
						perms = JSON.parse(perms).map(e => {
							return e.replace(/:/g, '/');
						});
						if (!perms.includes(url.split('?')[0].replace('/admin/', ''))) {
							reject(tips);
						}
					} else {
						reject(tips);
					}
				}
			}
			reslove(true);
		} catch (err) {
			reject(tips);
		}
	})
}
