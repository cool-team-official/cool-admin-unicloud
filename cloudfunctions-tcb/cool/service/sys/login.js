'use strict';
/**
 * 登录
 */
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
				token: await this.generateToken(user),
			};
			const isAdmin = username == 'admin' ? true : false;
			const { roles, perms } = await this.ctx.services.sys.menu.getPerms(user.roleIds, isAdmin);
			const departments = await this.ctx.services.sys.department.getByRoleIds(roles, isAdmin);
			await this.ctx.services.sys.data.set(`admin:department:${ user._id }`, JSON.stringify(departments), config.tokenExpires);
			await this.ctx.services.sys.data.set(`admin:perms:${ user._id }`, JSON.stringify(perms), config.tokenExpires);
			await this.ctx.services.sys.data.set(`admin:token:${ user._id }`, result.token, config.tokenExpires);
			return result;
		} else {
			throw new Error('验证码不正确~');
		}
	},
	/**
	 * 退出登录
	 * @param userId
	 */
	async logout(userId) {
		await this.ctx.services.sys.data.del(`admin:perms:${ userId }`);
		await this.ctx.services.sys.data.del(`admin:token:${ userId }`);
		await this.ctx.services.sys.data.del(`admin:department:${ userId }`);
	},
	/**
	 * 生成token
	 * @param user 用户对象
	 * @param expires
	 */
	async generateToken(user, expires) {
		await this.ctx.services.sys.data.set(`admin:passwordVersion:${ user._id }`, user.passwordV);
		const { utils, config } = this.ctx;
		const tokenInfo = {
			roleIds: user.roleIds,
			userId: user._id,
			username: user.username,
			passwordVersion: user.passwordV,
		};
		return utils.jwt.sign(tokenInfo,
			config.jwtSecret, {
				expiresIn: config.tokenExpires,
			},
		);
	}
}
