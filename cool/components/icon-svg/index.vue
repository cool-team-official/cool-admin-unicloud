<template>
	<div
		:class="svgClass"
		:style="{
			'font-size': size2
		}"
	>
		<i
			:class="iconName"
			:style="{
				color: color || 'currentColor'
			}"
		></i>
	</div>
</template>

<script>
export default {
	name: "icon-svg",

	props: {
		name: {
			type: String
		},
		className: {
			type: String
		},
		size: {
			type: [String, Number],
			default: 20
		},
		color: String
	},

	computed: {
		iconName() {
			return `cl-icon-${this.name}`;
		},
		svgClass() {
			return ["icon-svg", `icon-svg__${this.name}`, this.className];
		},
		size2() {
			return typeof this.size == "string" ? this.size : `${this.size}px`;
		}
	}
};
</script>

<style lang="scss" scoped>
.icon-svg {
	display: inline-block;
}
</style>
