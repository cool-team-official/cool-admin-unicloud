import { mapGetters, mapMutations } from "vuex";
import "./index.scss";

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
		...mapGetters(["processList", "routes"])
	},

	watch: {
		processList() {
			let maxWidth = this.$el.clientWidth;

			this.$nextTick(() => {
				let list = this.$el.querySelectorAll(".app-process__item") || [];

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

		const pages = getCurrentPages();

		pages.forEach((e) => {
			let item = this.routes.find((r) => e.__page__.path == r.path);

			if (item) {
				this.ADD_PROCESS({
					label: item.name,
					value: item.path
				});
			}
		});
	},

	methods: {
		...mapMutations(["ADD_PROCESS", "DEL_PROCESS", "SET_PROCESS"]),

		onTap(e, item) {
			this.isHit = item.active;

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

		onDel(index, e) {
			this.DEL_PROCESS(index);

			if (e) {
				e.stopPropagation();
			}

			this.toPath();
		},

		onClose(cmd) {
			const { current } = this.menu;

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
	},

	render() {
		return (
			<div class="app-process">
				<cl-scroll>
					{this.processList.map((item, index) => {
						return (
							<div
								class={[
									"app-process__item",
									{
										"is-active": item.active
									}
								]}
								data-index={index}
								on-mousedown={(e) => {
									this.onTap(e, item);
								}}>
								<span>{item.label}</span>

								{index > 0 && (
									<i
										class={["el-icon-close", { active: index > 0 }]}
										on-mousedown={(e) => {
											this.onDel(index, e);
										}}></i>
								)}
							</div>
						);
					})}
				</cl-scroll>

				{this.menu.visible && (
					<ul class="context-menu" style={this.menu.style}>
						{this.isHit && (
							<li
								on-click={() => {
									this.onClose("current");
								}}>
								关闭当前
							</li>
						)}
						<li
							on-click={() => {
								this.onClose("other");
							}}>
							关闭其他
						</li>
						<li
							on-click={() => {
								this.onClose("all");
							}}>
							关闭所有
						</li>
					</ul>
				)}
			</div>
		);
	}
};
