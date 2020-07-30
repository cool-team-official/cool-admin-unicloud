<template>
    <cl-layout>
        <cl-crud
            ref="crud"
            @load="onCrudLoad"
        >
            <el-row
                type="flex"
                align="middle"
            >
                <!-- 刷新按钮 -->
                <cl-refresh-btn />
                <!-- 新增按钮 -->
                <cl-add-btn />
                <!-- 删除按钮 -->
                <cl-multi-delete-btn />
                <cl-flex1 />
                <!-- 关键字搜索 -->
                <cl-search-key />
            </el-row>

            <el-row>
                <!-- 数据表格 -->
                <cl-table v-bind="table"></cl-table>
            </el-row>

            <el-row
                type="flex"
                justify="end"
            >
                <!-- 分页控件 -->
                <cl-pagination />
            </el-row>

            <!-- 新增、编辑 -->
            <cl-upsert
                ref="upsert"
                v-bind="upsert"
            ></cl-upsert>
        </cl-crud>
    </cl-layout>
</template>

<script>
export default {
	data() {
		return {
			// 新增、编辑配置
			upsert: {
				items: [
					{
						prop: "headImg",
						label: "头像",
						span: 24,
						component: {
							name: "cl-upload"
						}
					},
					{
						prop: "name",
						label: "姓名",
						span: 24,
						component: {
							name: "el-input",
							attrs: {
								placeholder: "请填写姓名"
							}
						},
						rules: {
							required: true,
							message: "姓名不能为空"
						}
					},
					{
						prop: "nickName",
						label: "昵称",
						span: 12,
						component: {
							name: "el-input",
							attrs: {
								placeholder: "请填写昵称"
							}
						},
						rules: {
							required: true,
							message: "昵称不能为空"
						}
					},
					{
						prop: "username",
						label: "用户名",
						span: 12,
						component: {
							name: "el-input",
							attrs: {
								placeholder: "请填写用户名"
							}
						},
						rules: [
							{
								required: true,
								message: "用户名不能为空"
							}
						]
					},
					{
						prop: "password",
						label: "密码",
						span: 12,
						hidden: true,
						component: {
							name: "el-input",
							props: {
								type: "password"
							},
							attrs: {
								placeholder: "请填写密码"
							}
						},
						rules: [
							{
								min: 6,
								max: 16,
								message: "密码长度在 6 到 16 个字符"
							}
						]
					},
					{
						prop: "roleIdList",
						label: "角色",
						span: 24,
						value: [],
						component: {
							name: "cl-role-select",
							props: {
								props: {
									"multiple-limit": 3
								}
							}
						},
						rules: {
							required: true,
							message: "角色不能为空"
						}
					},
					{
						prop: "phone",
						label: "手机号码",
						span: 12,
						component: {
							name: "el-input",
							attrs: {
								placeholder: "请填写手机号码"
							}
						}
					},
					{
						prop: "email",
						label: "邮箱",
						span: 12,
						component: {
							name: "el-input",
							attrs: {
								placeholder: "请填写邮箱"
							}
						}
					},
					{
						prop: "remark",
						label: "备注",
						span: 24,
						component: {
							name: "el-input",
							props: {
								type: "textarea",
								rows: 4
							}
						}
					},
					{
						prop: "status",
						label: "状态",
						value: 1,
						component: {
							name: "el-radio-group",
							options: [
								{
									label: "开启",
									value: 1
								},
								{
									label: "关闭",
									value: 0
								}
							]
						}
					},
					{
						prop: "tips",
						hidden: true,
						component: (
							<div>
								<i class="el-icon-warning"></i>
								<span style="margin-left: 6px">新增用户默认密码为：123456</span>
							</div>
						)
					}
				]
			},
			// 表格配置
			table: {
				props: {},
				columns: [
					{
						type: "selection",
						align: "center",
						width: "60",
						fixed: "left"
					},
					{
						prop: "headImg",
						label: "头像",
						align: "center"
					},
					{
						prop: "name",
						label: "姓名",
						align: "center",
						"min-width": 150
					},
					{
						prop: "username",
						label: "用户名",
						align: "center",
						"min-width": 150
					},
					{
						prop: "nickName",
						label: "昵称",
						align: "center",
						"min-width": 150
					},
					{
						prop: "departmentName",
						label: "部门名称",
						align: "center",
						emptyText: "无",
						"min-width": 150
					},
					{
						prop: "roleName",
						label: "角色",
						"header-align": "center",
						emptyText: "无",
						"min-width": 200
					},
					{
						prop: "phone",
						label: "手机号码",
						align: "center",
						"min-width": 150,
						emptyText: "无"
					},
					{
						prop: "remark",
						label: "备注",
						align: "center",
						"min-width": 150,
						emptyText: "无"
					},
					{
						prop: "status",
						label: "状态",
						align: "center",
						"min-width": 150
					},
					{
						prop: "createTime",
						label: "创建时间",
						align: "center",
						sortable: true,
						width: 150
					},
					{
						align: "center",
						type: "op",
						layout: ["edit", "delete"]
					}
				]
			}
		};
	},
	methods: {
		onCrudLoad({ ctx, app }) {
			ctx.service(this.$service.system.user).done();
			app.refresh();
		}
	}
};
</script>
