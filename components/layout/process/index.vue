<template>
	<div class="app-process">
		<cl-scroll>
			<div class="block" v-for="(item, index) in processList" :key="index" :class="{ active: item.active }" :data-index="index"
			 @mousedown="
					(e) => {
						onTap(e, item);
					}
				">
				<span>{{ item.label }}</span>

				<i class="el-icon-close" v-if="index > 0" :class="{ active: index > 0 }" @mousedown.stop="onDel(index)"></i>
			</div>
		</cl-scroll>

		<ul class="context-menu" v-show="menu.visible" :style="menu.style">
			<li @click="onClose('current')" v-if="isHit">关闭当前</li>
			<li @click="onClose('other')">关闭其他</li>
			<li @click="onClose('all')">关闭所有</li>
		</ul>
	</div>
</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from "vuex";

	export default {
		data() {
			return {
				menu: {
					visible: false,
					current: {},
					style: {
						left: 0,
						top: 0
					}
				},

				isHit: false,

				page: 1
			};
		},

		computed: {
			...mapGetters(["processList"])
		},

		watch: {
			processList() {
				let maxWidth = this.$el.clientWidth;

				this.$nextTick(() => {
					let list = this.$el.querySelectorAll(".block") || [];

					let sumWidth = 0;

					for (let i = 0; i < list.length; i++) {
						sumWidth += list[i].clientWidth;
					}

					if (maxWidth - sumWidth > 1000) {
						this.page += 1;
					}
				});
			}
		},

		mounted() {
			this.$el.oncontextmenu = () => {
				event.returnValue = false;
			};

			document.body.addEventListener("click", () => {
				if (this.menu.visible) {
					this.menu.visible = false;
				}
			});

			console.log(getCurrentPages())

			const pages = getCurrentPages()

			pages.forEach(e => {
				this.ADD_PROCESS({
					label: e.__page__.meta.name,
					value: e.__page__.path
				})
			})
		},

		methods: {
			...mapMutations(["ADD_PROCESS", "DEL_PROCESS", "SET_PROCESS"]),

			onTap(e, item) {
				this.isHit = item.active;

				console.log(item)

				if (e.button == 0) {
					this.$router.push(item.value);
				} else {
					this.menu = {
						current: item,
						visible: true,
						style: {
							left: e.layerX + "px",
							top: e.layerY + "px"
						}
					};
				}
			},

			onDel(index) {
				this.DEL_PROCESS(index);

				this.toPath();
			},

			onClose(cmd) {
				const {
					current
				} = this.menu;

				switch (cmd) {
					case "current":
						this.onDel(this.processList.findIndex((e) => e.value == current.value));
						break;

					case "other":
						this.SET_PROCESS(
							this.processList.filter((e) => e.value == current.value || e.value == "/")
						);
						break;

					case "all":
						this.SET_PROCESS(this.processList.filter((e) => e.value == "/"));
						break;
				}

				this.toPath();
			},

			toPath() {
				const active = this.processList.find((e) => e.active);

				if (!active) {
					const next = this.processList[this.processList.length - 1];
					this.$router.push(next ? next.value : "/");
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	.app-process {
		display: flex;
		height: 30px;
		position: relative;

		.cl-scroll {
			flex: 1;

			/deep/.scroll-wrapper {
				display: flex;
			}
		}

		.block {
			border-radius: 3px;
			height: 30px;
			line-height: 30px;
			padding: 0 10px;
			background-color: #fff;
			font-size: 12px;
			margin-right: 10px;
			color: #909399;
			cursor: pointer;

			&:last-child {
				margin-right: 0;
			}

			i {
				font-size: 14px;
				position: relative;
				top: 3px;
				width: 0;
				overflow: hidden;
				transition: all 0.3s;

				&:hover {
					color: #fff;
					background-color: $uni-color-main;
				}
			}

			&:hover {
				.el-icon-close {
					width: auto;
					margin-left: 5px;
				}
			}

			&.active {
				span {
					color: $uni-color-main;
				}

				i {
					width: auto;
					margin-left: 5px;
				}

				&:before {
					background-color: $uni-color-main;
				}
			}
		}

		.context-menu {
			margin: 0;
			background: #fff;
			z-index: 100;
			position: absolute;
			list-style-type: none;
			padding: 5px 0;
			border-radius: 4px;
			font-size: 12px;
			font-weight: 400;
			color: #333;
			box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);

			li {
				margin: 0;
				padding: 7px 16px;
				cursor: pointer;

				&:hover {
					background: #eee;
				}
			}
		}
	}
</style>
