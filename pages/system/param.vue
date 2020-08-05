<template>
	<cl-layout>
		<cl-crud @load="onCrudLoad">
			<el-row type="flex">
				<cl-refresh-btn></cl-refresh-btn>
				<cl-add-btn></cl-add-btn>
				<cl-multi-delete-btn></cl-multi-delete-btn>
				<cl-flex1></cl-flex1>
				<cl-search-key></cl-search-key>
			</el-row>

			<el-row>
				<cl-table
					:columns="[
						{
							type: 'selection',
							align: 'center',
							width: 60
						},
						{
							label: '名称',
							prop: 'name',
							align: 'center'
						},
						{
							label: 'Key',
							prop: 'key',
							align: 'center'
						},
						{
							label: '数据',
							prop: 'data',
							align: 'center',
							'show-overflow-tooltip': true
						},
						{
							label: '备注',
							prop: 'remark',
							align: 'center'
						},
						{
							label: '操作',
							align: 'center',
							type: 'op'
						}
					]"
				></cl-table>
			</el-row>

			<el-row type="flex">
				<cl-flex1></cl-flex1>
				<cl-pagination></cl-pagination>
			</el-row>

			<cl-upsert
				ref="upsert"
				:items="[
					{
						prop: 'name',
						label: '名称',
						span: 12,
						component: {
							name: 'el-input',
							attrs: {
								placeholder: '请输入名称'
							}
						},
						rules: {
							required: true,
							message: '名称不能为空'
						}
					},
					{
						prop: 'key',
						label: 'Key',
						span: 12,
						component: {
							name: 'el-input',
							attrs: {
								placeholder: '请输入Key'
							}
						},
						rules: {
							required: true,
							message: 'Key不能为空'
						}
					},
					{
						prop: 'data',
						label: '数据',
						component: {
							name: 'el-input',
							props: {
								type: 'textarea'
							},
							attrs: {
								rows: 4,
								placeholder: '请输入数据值'
							}
						}
					},
					{
						prop: 'remark',
						label: '备注',
						component: {
							name: 'el-input',
							props: {
								type: 'textarea'
							},
							attrs: {
								placeholder: '请输入备注',
								rows: 3
							}
						}
					}
				]"
				@open="onUpsertOpen"
			>
				<template #slot-content="{ scope }">
					<div class="editor" v-for="(item, index) in tab.list" :key="index">
						<template v-if="tab.index === index">
							<el-button class="change-btn" size="mini" @click="changeTab(item.to)">{{
								item.label
							}}</el-button>
							<component
								:is="item.component"
								v-model="scope.data"
								v-bind="item.props"
							></component>
						</template>
					</div>
				</template>
			</cl-upsert>
		</cl-crud>
	</cl-layout>
</template>

<script>
export default {
	data() {
		return {
			tab: {
				index: null,

				list: [
					{
						label: "切换富文本编辑器",
						to: 1,
						component: "el-input",
						props: {
							type: "textarea",
							rows: 4
						}
					},
					{
						label: "切换代码编辑器",
						to: 0,
						component: "cl-editor-tinymce"
					}
				]
			}
		};
	},

	methods: {
		onCrudLoad({ ctx, app }) {
			ctx.service(this.$service.system.param).done();
			app.refresh({
				prop: "createTime",
				order: "desc"
			});
		},

		changeTab(i) {
			this.$confirm("切换编辑器会清空输入内容，是否继续？", "提示", {
				type: "warning"
			})
				.then(() => {
					this.tab.index = i;
					this.$refs["upsert"].setForm("data", "");
				})
				.catch(() => {});
		},

		onUpsertOpen(isEdit, data) {
			if (isEdit) {
				this.tab.index = /<*>/g.test(data.data) ? 1 : 0;
			} else {
				this.tab.index = 1;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.change-btn {
	display: flex;
	position: absolute;
	right: 10px;
	bottom: 10px;
	z-index: 9;
}

.editor {
	transition: all 0.3s;
}
</style>
