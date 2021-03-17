<template>
	<div class="app-slider">
		<div class="logo">
			<a href="https://cool-admin.com/">
				<img class="c" src="@/static/icon/logo/silder.png" v-if="!menuCollapse" />
				<img class="z" src="@/static/icon/logo/silder-simple.png" v-else />
			</a>
		</div>

		<div class="menu">
			<deep-menu></deep-menu>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	computed: {
		...mapGetters(["menuCollapse"])
	},

	components: {
		DeepMenu: {
			computed: {
				...mapGetters(["menuList", "menuCollapse"]),

				openeds() {
					let ids = [];

					const fn = (list) => {
						let item = list.find((e) => {
							switch (e.type) {
								case 0:
									ids.push(e.id);
									return fn(e.children);
								case 1:
									return e.path == this.$route.path;
								default:
									return false;
							}
						});

						if (item) {
							return true;
						} else {
							ids.pop();
						}
					};

					for (let i = 0; i < this.menuList.length; i++) {
						let { id, children } = this.menuList[i];

						ids = [id];

						if (fn(children)) {
							break;
						}
					}

					return ids.map(String);
				},

				defaultActive() {
					return this.$route.fullPath.includes("?")
						? decodeURIComponent(this.$route.fullPath)
						: this.$route.path;
				}
			},

			methods: {
				toView(url) {
					if (url != this.$route.path) {
						this.$router.push(url);
					}
				}
			},

			render() {
				const fn = (list) => {
					return list
						.filter((e) => e.isShow)
						.map((e) => {
							let html = null;

							if (e.type == 0) {
								html = (
									<el-submenu index={String(e.id)} key={e.id} show-timeout={0}>
										<template slot="title">
											<icon-svg
												name={e.icon}
												size={18}
												color="#fff"></icon-svg>
											<span slot="title">{e.name}</span>
										</template>
										{fn(e.children)}
									</el-submenu>
								);
							} else {
								html = (
									<el-menu-item index={e.path} key={e.path}>
										<icon-svg name={e.icon} size={18} color="#fff"></icon-svg>
										<span slot="title">{e.name}</span>
									</el-menu-item>
								);
							}

							return html;
						});
				};

				let el = fn(this.menuList);

				return (
					<el-menu
						default-active={this.defaultActive}
						default-openeds={this.openeds}
						collapse-transition={false}
						collapse={this.menuCollapse}
						on-select={this.toView}>
						{el}
					</el-menu>
				);
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.app-slider {
	height: 100%;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);

	.logo {
		a {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 80px;
		}

		.c {
			height: 30px;
			width: 193px;
		}

		.z {
			height: 30px;
			width: 30px;
		}
	}

	.menu {
		overflow-y: auto;
		height: calc(100% - 120px);

		&::-webkit-scrollbar {
			width: 0;
			height: 0;
		}

		/deep/.el-menu {
			border-right: 0;
			background-color: $uni-color-main;

			&-item {
				&.is-active {
					background-color: $uni-color-primary;
				}
			}

			.el-submenu__title,
			.el-menu-item {
				&:hover {
					background-color: $uni-color-primary;
				}
			}

			.el-submenu__title,
			&-item,
			&__title {
				color: #eee;
				letter-spacing: 0.5px;
				height: 50px;
				line-height: 50px;

				.icon-svg {
					margin: 0 15px 0 5px;
					position: relative;
					top: -1px;
				}

				span {
					font-size: 12px;
					letter-spacing: 1px;
					display: inline-block;
				}
			}

			.el-submenu {
				&.is-opened {
					background-color: #2b3043;

					.el-menu {
						background-color: #2b3043;
					}
				}
			}

			&--collapse {
				.el-submenu__title {
					line-height: 34px;

					.icon-svg {
						margin-left: 2px;
						height: 19px;
						width: 19px;
					}
				}
			}
		}
	}
}
</style>
