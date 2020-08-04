<template>
	<el-select v-model="newValue" v-bind="props" v-on="on" multiple>
		<el-option
			v-for="(item, index) in list"
			:value="item._id"
			:label="item.name"
			:key="index"
		></el-option>
	</el-select>
</template>

<script>
export default {
	props: {
		value: [String, Number, Array],
		props: Object,
		on: Object
	},

	data() {
		return {
			list: [],
			newValue: this.value
		};
	},

	watch: {
		value(val) {
			if (!(val instanceof Array)) {
				this.newValue = [val];
			} else {
				this.newValue = val;
			}
		},

		newValue(val) {
			this.$emit("input", val);
		}
	},

	async created() {
		this.list = await this.$service.system.role.list();
	}
};
</script>

<style lang="scss" scoped></style>
