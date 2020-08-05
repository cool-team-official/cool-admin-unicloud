<template>
    <cl-layout>
        <div class="page-demo">
            <el-row :gutter="10">
                <el-col
                    v-for="(item, index) in layout"
                    :key="index"
                    :xs="24"
                    :md="12"
                    :lg="6"
                >
                    <div
                        class="block"
                        :ref="`col-${index + 1}`"
                    >
                        <transition-group name="fade">
                            <component
                                :ref="item2"
                                :is="item2"
                                :key="item2 + index2"
                                v-for="(item2, index2) in item"
                            ></component>
                        </transition-group>
                    </div>
                </el-col>
            </el-row>
        </div>
    </cl-layout>
</template>

<script>
import BClUpload from "./components/b-cl-upload";
import BVCopy from "./components/b-v-copy";
import BClCrud from "./components/b-cl-crud";
import BClForm from "./components/b-cl-form";
import BClContextMenu from "./components/b-cl-context-menu";
import BErrorPage from "./components/b-error-page";

export default {
	components: {
		BClUpload,
		BVCopy,
		BClCrud,
		BClForm,
		BClContextMenu,
		BErrorPage
	},

	data() {
		return {
			list: [
				"b-cl-upload",
				"b-cl-crud",
				"b-v-copy",
				"b-cl-form",
				"b-cl-context-menu",
				"b-error-page"
			],
			layout: [[], [], [], []]
		};
	},

	mounted() {
		this.append();
	},

	methods: {
		getHeight(name) {
			return this.$refs[name][0].offsetHeight;
		},

		selectCol() {
			const h1 = this.getHeight("col-1");
			const h2 = this.getHeight("col-2");
			const h3 = this.getHeight("col-3");
			const h4 = this.getHeight("col-4");

			switch (Math.min(h1, h2, h3, h4)) {
				case h1:
					return 0;
				case h2:
					return 1;
				case h3:
					return 2;
				case h4:
					return 3;
				default:
					return 0;
			}
		},

		append(index = 0) {
			const i = this.selectCol();
			const item = this.list[index];

			if (!item) {
				return false;
			}

			this.layout[i].push(item);

			this.$nextTick(() => {
				setTimeout(() => {
					this.append(index + 1);
				}, 100);
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
	transition: all 0.5s ease;
}

.fade-enter,
.fade-leave-active {
	opacity: 0;
}

.page-demo {
	overflow: hidden auto;

	.block {
		width: 100%;
	}

	/deep/.scope {
		background-color: #fff;
		border-radius: 3px;
		margin-bottom: 10px;
		break-inside: avoid;

		.h {
			display: flex;
			align-items: center;
			height: 30px;
			padding: 10px;
			font-size: 12px;

			span {
				background-color: $uni-color-main;
				color: #fff;
				border-radius: 3px;
				padding: 2px 5px;
				margin-right: 10px;
				font-size: 14px;
				letter-spacing: 1px;
			}
		}

		.c {
			padding: 10px;
			font-size: 14px;

			&._svg {
				.icon-svg {
					margin-right: 15px;
				}
			}

			a {
				font-size: 13px;
				color: #666;
				position: relative;

				&:hover {
					color: $uni-color-main;

					&:after {
						content: "";
						width: 100%;
						height: 1px;
						position: absolute;
						bottom: -2px;
						left: 0;
						background-color: $uni-color-main;
					}
				}
			}
		}

		.f {
			height: 30px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 10px;
			font-size: 12px;

			.date {
				color: #999;
			}
		}
	}
}
</style>
