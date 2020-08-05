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
		value: {
			immediate: true,
			handler(val) {
				if (!(val instanceof Array)) {
					this.newValue = [val];
				} else {
					this.newValue = val;
				}

				console.log(this.newValue);
			}
		},

		newValue(val) {
			this.$emit("input", val);
		}
	},

	async created() {
		console.log(1111111);
		this.list = await this.$service.system.role.list();
	}
};
</script>

<style lang="scss" scoped></style>
