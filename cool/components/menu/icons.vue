<template>
	<div class="cl-menu-icons">
		<el-popover
			ref="iconPopover"
			placement="bottom-start"
			trigger="click"
			popper-class="popper-menu-icon"
		>
			<div class="list">
				<el-button
					v-for="(item, index) in list"
					:key="index"
					size="mini"
					:class="{ 'is-active': item === value }"
					@click="onSelect(item)"
				>
					<icon-svg :name="item" :size="20"></icon-svg>
				</el-button>
			</div>
		</el-popover>

		<el-input
			v-model="icon"
			@change="onSelect"
			v-popover:iconPopover
			placeholder="请选择"
		></el-input>
	</div>
</template>

<script>
export default {
	name: "cl-menu-icons",

	props: {
		value: String
	},

	data() {
		return {
			list: [],
			icon: ""
		};
	},

	watch: {
		value: {
			immediate: true,
			handler(val) {
				this.icon = val;
			}
		}
	},

	mounted() {
		this.list = [
			"comment",
			"community",
			"order",
			"2bei",
			"vip",
			"trend",
			"cycle",
			"role",
			"schedule",
			"cpu",
			"network",
			"storage",
			"system",
			"menu",
			"user",
			"log",
			"workbench",
			"common",
			"friend",
			"clock",
			"app",
			"safe",
			"hotel",
			"feedback"
		];
	},

	methods: {
		onSelect(icon) {
			this.$emit("input", icon);
		}
	}
};
</script>

<style lang="scss">
.popper-menu-icon {
	box-sizing: border-box;

	.list {
		display: flex;
		flex-wrap: wrap;
		max-height: 250px;
		width: 490px;
		overflow-y: auto;
	}

	.el-button {
		margin-bottom: 10px;
		height: 40px;
		width: 40px;
		padding: 0;

		&:nth-child(10n + 1) {
			margin-left: 0;
		}

		.icon-svg {
			color: #000;
		}
	}
}
</style>
