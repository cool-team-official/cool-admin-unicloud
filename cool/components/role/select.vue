<template>
	<el-select v-model="newValue" v-bind="props" v-on="on" multiple @change="onChange">
		<el-option
			v-for="(item, index) in list"
			:value="item.id"
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
			newValue: undefined
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
			}
		}
	},

	async created() {
		this.list = await this.$service.system.role.list();
	},

	methods: {
		onChange(val) {
			this.$emit("input", val);
		}
	}
};
</script>
