export default {
	// 应用信息
	app: (state) => state.app.info,
	// 浏览器信息
	browser: state => state.browser,
	// 窗口列表
	processList: (state) => state.process.list,
	// 总菜单列表
	menuGroup: (state) => state.menu.group,
	// 左侧菜单
	menuList: (state) => state.menu.menu,
	// 视图路由
	routes: (state) => state.menu.routes,
	// 菜单是否展开
	menuCollapse: (state) => state.menu.collapse,
	// 授权标识
	token: (state) => state.user.token,
	// 用户信息
	userInfo: (state) => state.user.info,
	// 权限列表
	permission: (state) => state.menu.permission
};
