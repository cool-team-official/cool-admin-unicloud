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
				const rToken = await ctx.services.sys.data.get(`admin:token:${ currentUser.userId }`);
				if (!rToken) {
					reject(tips);
				}
				if (rToken !== token && config.SSO) {
					reject(tips);
				} else {
					let perms = await ctx.services.sys.data.get(`admin:perms:${ ctx.decoded.userId }`);
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
		} catch (err) {
			reject(tips);
		}
	})
}
