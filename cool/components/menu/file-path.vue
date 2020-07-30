<template>
	<el-autocomplete
		v-model="newValue"
		:fetch-suggestions="querySearch"
		:trigger-on-focus="true"
		:debounce="100"
		clearable
	></el-autocomplete>
</template>

<script>
const files = require
	.context("@/", true, /^.\/(views|pages).*(vue|js)/)
	.keys()
	.map((e) => {
		return {
			value: e.substr(2)
		};
	});

export default {
	props: {
		value: [String]
	},

	data() {
		return {
			newValue: ""
		};
	},

	watch: {
		value() {
			this.parse();
		},

		newValue(val) {
			this.$emit("input", val);
		}
	},

	mounted() {
		this.parse();
	},

	methods: {
		parse() {
			this.newValue = this.value || "";
		},

		querySearch(qs, cb) {
			const res = qs ? files.filter(this.createFilter(qs)) : files;
			cb(res);
		},

		createFilter(qs) {
			return (restaurant) => {
				return restaurant.value.toLowerCase().indexOf(qs.toLowerCase()) >= 0;
			};
		}
	}
};
</script>
