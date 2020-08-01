'use strict';
module.exports = {
	/**
	 * 登录
	 */
	async login() {
		const { db, utils, config } = this.ctx;
		const { captchaId, password, username, verifyCode } = this.ctx.params;
		const checkV = await this.ctx.services.comm.verify.check(captchaId, verifyCode);
		if (checkV) {
			const user = await db.one('sys_user', { where: { username } });
			console.log('获得用户信息', user);
			if (user) {
				if (user.status === 0 || user.password !== utils.md5(password)) {
					throw new Error('账户或密码不正确~');
				}
			} else {
				throw new Error('账户或密码不正确~');
			}
			if (utils.lodash.isEmpty(user.roleIds)) {
				throw new Error('该用户未设置任何角色，无法登录~');
			}
			const result = {
				expire: config.tokenExpires,
				token: this.generateToken(user),
			};
			// const perms = await this.ctx.service.sys.menu.getPerms(roleIds);
			// const departments = await this.ctx.service.sys.department.getByRoleIds(roleIds);
			// await this.app.redisSet(`admin:department:${ user.id }`, JSON.stringify(departments), this.app.config.token.expires);
			// await this.app.redisSet(`admin:perms:${ user.id }`, JSON.stringify(perms), this.app.config.token.expires);
			// await this.app.redisSet(`admin:token:${ user.id }`, result.token, this.app.config.token.expires);
			return result;
		} else {
			throw new Error('验证码不正确~');
		}
	},
	/**
	 * 生成token
	 * @param user 用户对象
	 * @param expires
	 */
	generateToken(user, expires) {
		const { utils, config } = this.ctx;
		const tokenInfo = {
			roleIds: user.roleIds,
			userId: user.id,
			passwordVersion: user.passwordV,
		};
		return utils.jwt.sign(tokenInfo,
			config.jwtSecret, {
				expiresIn: config.tokenExpires,
			},
		);
	}
}
