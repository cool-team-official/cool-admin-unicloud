<template>
	<div class="cl-menu-icons">
		<el-popover
			ref="iconPopover"
			placement="bottom-start"
			trigger="click"
			popper-class="popper-menu-icon"
		>
			<el-row :gutter="10" class="list">
				<el-col :span="3" v-for="(item, index) in list" :key="index">
					<el-button
						size="mini"
						:class="{ 'is-active': item === value }"
						@click="onSelect(item)"
					>
						<icon-svg :name="item"></icon-svg>
					</el-button>
				</el-col>
			</el-row>
		</el-popover>

		<el-input v-model="value" v-popover:iconPopover readonly placeholder="请选择"></el-input>
	</div>
</template>

<script>
import { iconList } from "@/icons/index";

export default {
	name: "cl-menu-icons",

	props: {
		value: String
	},

	data() {
		return {
			list: []
		};
	},

	mounted() {
		this.list = iconList();
	},

	methods: {
		onSelect(icon) {
			this.$emit("input", icon);
		}
	}
};
</script>

.<style lang="scss">
.popper-menu-icon {
	width: 480px;
	box-sizing: border-box;

	.list {
		height: 250px;
		overflow-y: auto;
		display: flex;
		flex-wrap: wrap;
	}

	.el-button {
		margin-bottom: 10px;
		height: 40px;
		width: 100%;
		padding: 0;

		.icon-svg {
			font-size: 18px;
			color: #444;
		}
	}
}
</style>
