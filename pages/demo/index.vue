<template>
    <cl-layout>
        <div class="page-demo">
            <div class="page-demo__list">
                <component
                    v-for="(item, index) in list"
                    :is="item"
                    :key="index"
                ></component>
            </div>
        </div>
    </cl-layout>
</template>

<script>
import BClUpload from "./components/b-cl-upload";
import BVCopy from "./components/b-v-copy";
import BClCrud from "./components/b-cl-crud";
import BClForm from "./components/b-cl-form";
import BClContextMenu from "./components/b-cl-context-menu.js";
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
			]
		};
	}
};
</script>

<style lang="scss" scoped>
.page-demo {
	height: 100%;
	width: 100%;
	overflow: auto;

	&__list {
		column-count: 4;
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

@media screen and (max-width: 992px) {
	.page-demo__list {
		column-count: 2;
	}
}
</style>
