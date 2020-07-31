<template>
	<div class="column-tag">
		<el-tag
			v-for="(item, index) in list"
			:key="index"
			:type="type"
			:effect="effect"
			size="mini"
			disable-transitions
			>{{ item }}</el-tag
		>
	</div>
</template>

<script>
export default {
	props: {
		list: Array,
		type: {
			type: String,
			default: "primary"
		},
		effect: String
	}
};
</script>

<style lang="scss" scoped>
.column-tag {
	.el-tag {
		margin: 2px 5px 2px 0;
	}
}
</style>
