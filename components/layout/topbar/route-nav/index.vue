<template>
	<div class="app-route-nav" v-if="conf.showRouteNav">
		<el-breadcrumb>
			<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item v-for="(item, index) in list" :key="index">{{
				item.name
			}}</el-breadcrumb-item>
		</el-breadcrumb>
	</div>
</template>

<script>
	import {
		mapGetters
	} from "vuex";
	import _ from "lodash";

	export default {
		data() {
			return {
				list: []
			};
		},

		watch: {
			$route: {
				immediate: true,
				handler(route) {
					const deep = (item) => {
						if (route.path === "/") {
							return false;
						}

						if (item.path == route.path) {
							return item;
						} else {
							if (item.children) {
								const ret = item.children.map(deep).find(Boolean);

								if (ret) {
									return [item, ret];
								} else {
									return false;
								}
							} else {
								return false;
							}
						}
					};

					this.list = _(this.menuGroup).map(deep).filter(Boolean).flattenDeep().value();

					if (this.list.length === 0) {
						this.list.push(route);
					}
				}
			}
		},

		computed: {
			...mapGetters(["conf", "menuGroup"])
		},
	};
</script>

<style lang="scss" scoped>
	.app-route-nav {
		/deep/.el-breadcrumb {
			margin: 0 10px;

			&__inner {
				font-size: 12px;
				padding: 0 10px;
				font-weight: normal;
				letter-spacing: 1px;
			}
		}
	}
</style>
