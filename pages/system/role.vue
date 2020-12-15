<template>
	<cl-layout>
		<cl-crud @load="onCrudLoad">
			<el-row type="flex">
				<cl-refresh-btn />
				<cl-add-btn />
				<cl-multi-delete-btn />
				<cl-flex1 />
				<cl-search-key />
			</el-row>

			<el-row>
				<cl-table
					:props="{
						'default-sort': {
							prop: 'createTime',
							order: 'descending'
						}
					}"
					:columns="[
						{
							type: 'selection',
							align: 'center',
							width: '60'
						},
						{
							prop: 'name',
							label: '名称',
							align: 'center'
						},
						{
							prop: 'label',
							label: '标识',
							align: 'center'
						},
						{
							prop: 'remark',
							label: '备注',
							align: 'center'
						},
						{
							prop: 'createTime',
							label: '创建时间',
							align: 'center',
							sortable: 'custom',
							'min-width': 150
						},
						{
							prop: 'updateTime',
							label: '更新时间',
							align: 'center',
							sortable: 'custom',
							'min-width': 150
						},
						{
							label: '操作',
							align: 'center',
							type: 'op'
						}
					]"
				>
				</cl-table>
			</el-row>

			<el-row type="flex">
				<cl-flex1 />
				<cl-pagination />
			</el-row>

			<cl-upsert
				:props="{
					width: '800px'
				}"
				:items="[
					{
						prop: 'name',
						label: '名称',
						span: 12,
						component: {
							name: 'el-input'
						},
						rules: {
							required: true,
							message: '名称不能为空'
						}
					},
					{
						prop: 'label',
						label: '标识',
						span: 12,
						component: {
							name: 'el-input',
							props: {
								placeholder: '请填写标识'
							}
						},
						rules: {
							required: true,
							message: '标识不能为空'
						}
					},
					{
						prop: 'remark',
						label: '备注',
						span: 24,
						component: {
							name: 'el-input',
							props: {
								type: 'textarea',
								rows: 4
							}
						}
					},
					{
						prop: 'menuIdList',
						span: 12,
						value: [],
						component: {
							name: 'cl-role-tree',
							props: {
								title: '功能权限'
							}
						}
					},
					{
						prop: 'departmentIdList',
						value: [],
						span: 11,
						offset: 1,
						props: {
							'label-width': '0px'
						},
						component: {
							name: 'cl-dept-check',
							props: {
								title: '数据权限'
							}
						}
					}
				]"
			></cl-upsert>
		</cl-crud>
	</cl-layout>
</template>

<script>
export default {
	data() {
		return {};
	},

	methods: {
		onCrudLoad({ ctx, app }) {
			ctx.service(this.$service.system.role).done();

			app.refresh();
		}
	}
};
</script>
