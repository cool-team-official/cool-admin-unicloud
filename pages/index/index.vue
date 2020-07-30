<template>
	<div>
		12312
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	data() {
		return {
			// 新增、编辑配置
			upsert: {
				props: {},
				items: []
			},
			// 表格配置
			table: {
				props: {},
				column: []
			}
		}
	},
	methods: {
		onLoad2({ ctx, app }) {
			ctx.service({
				page() {
					return Promise.resolve({
						list: [],
						pagination: {}
					})
				}
			}).done();
			app.refresh();
		}
	}
};
</script>
