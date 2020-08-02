import { Message } from "element-ui"
import { deepTree, revisePath, isArray } from "@/cool/utils"

export default {
	state: {
		// 视图路由，type=1
		routes: uni.getStorageSync("viewRoutes") || [],
		// 总菜单，已上下级合并
		group: uni.getStorageSync("menuGroup") || [],
		// showAMenu 模式下，顶级菜单的序号
		index: 0,
		// 左侧菜单
		menu: [],
		// 左侧菜单是否展开
		collapse: false,
		// 权限列表
		permission: [],
	},
	actions: {
		permMenu({ commit, state }) {
			return new Promise((resolve, reject) => {
				this.$service.common
					.permMenu()
					.then((res) => {
						if (!isArray(res.menus)) {
							console.error(
								"Invalid menus. Expected Array",
								res.menus
							)
							res.menus = []
						}

						if (!isArray(res.perms)) {
							console.error(
								"Invalid perms. Expected Array",
								res.perms
							)
							res.perms = []
						}

						const routes = res.menus
							.filter((e) => e.type != 2)
							.map((e) => {
								return {
									id: e._id,
									parentId: e.parentId,
									path: revisePath(e.router || e._id),
									viewPath: e.viewPath,
									type: e.type,
									name: e.name,
									icon: e.icon,
									orderNum: e.orderNum,
									isShow: e.isShow,
									meta: {
										keepAlive: e.keepAlive,
									},
									children: [],
								}
							})

						// 格式化菜单
						const menuGroup = deepTree(routes)

						// 设置权限
						commit("SET_PERMIESSION", res.perms)
						// 设置菜单组
						commit("SET_MENU_GROUP", menuGroup)
						// 设置视图路由
						commit(
							"SET_VIEW_ROUTES",
							routes.filter((e) => e.type == 1)
						)
						// 设置菜单
						commit("SET_MENU_LIST", state.index)

						resolve(menuGroup)
					})
					.catch((err) => {
						console.error("菜单加载异常", err)
						Message.error("菜单加载异常")
						reject(err)
					})
			})
		},
	},
	mutations: {
		SET_MENU_GROUP(state, list) {
			state.group = list
			uni.setStorageSync("menuGroup", list)
		},

		SET_VIEW_ROUTES(state, list) {
			state.routes = list
			uni.setStorageSync("viewRoutes", list)
		},

		SET_MENU_LIST(state, index) {
			const { showAMenu } = this.state.app.conf

			if (showAMenu) {
				const { children = [] } = state.group[index] || {}

				state.index = index
				state.menu = children
			} else {
				state.menu = state.group
			}
		},

		SET_PERMIESSION(state, list) {
			state.permission = list
			uni.setStorageSync("permission", list)
		},

		COLLAPSE_MENU(state, val = false) {
			state.collapse = val
		},
	},
}
