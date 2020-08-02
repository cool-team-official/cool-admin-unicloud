<template>
    <cl-layout>
        <cl-crud
            ref="crud"
            @load="onCrudLoad"
            :on-refresh="onRefresh"
        >
            <el-row type="flex">
                <cl-refresh-btn />
                <cl-add-btn />
            </el-row>

            <cl-table
                ref="table"
                :props="{
					'row-key': '_id'
				}"
                :on="{
					'row-click': this.onRowClick,
					'row-contextmenu': this.onRowContextMenu
				}"
                :columns="[
					{
						prop: 'name',
						label: '名称',
						width: 200
					},
					{
						prop: 'icon',
						label: '图标',
						align: 'center',
						width: 80
					},
					{
						prop: 'type',
						label: '类型',
						align: 'center',
						width: 100,
						dict: [
							{
								label: '目录',
								value: 0
							},
							{
								label: '菜单',
								value: 1
							},
							{
								label: '权限',
								value: 2
							}
						]
					},
					{
						prop: 'router',
						label: '节点路由',
						align: 'center',
						'min-width': 160
					},
					{
						prop: 'keepAlive',
						label: '路由缓存',
						align: 'center',
						width: 100
					},
					{
						prop: 'viewPath',
						label: '文件路径',
						align: 'center',
						'min-width': 200,
						'show-overflow-tooltip': true
					},
					{
						prop: 'perms',
						label: '权限',
						'header-align': 'center',
						'min-width': 300
					},
					{
						prop: 'orderNum',
						label: '排序号',
						align: 'center',
						width: 90
					},
					{
						prop: 'updateTime',
						label: '更新时间',
						align: 'center',
						sortable: true,
						width: 180
					},
					{
						label: '操作',
						align: 'center',
						type: 'op',
						layout: ['slot-add', 'edit', 'delete']
					}
				]"
            >
                <!-- 图标 -->
                <template #column-icon="{scope}">
                    <icon-svg
                        :name="scope.row.icon"
                        style="margin-top: 5px;"
                    ></icon-svg>
                </template>

                <!-- 权限 -->
                <template #column-perms="{scope}">
                    <el-tag
                        v-for="(item, index) in scope.row.permList"
                        :key="index"
                        size="mini"
                        effect="dark"
                        style="margin: 2px; letter-spacing: 0.5px;"
                    >{{ item }}</el-tag>
                </template>

                <!-- 路由 -->
                <template #column-router="{scope}">
                    <el-link
                        type="primary"
                        :href="scope.row.router"
                        v-if="scope.row.type == 1"
                    >{{
						scope.row.router
					}}</el-link>
                    <span v-else>{{ scope.row.router }}</span>
                </template>

                <!-- 路由缓存 -->
                <template #column-keepAlive="{scope}">
                    <template v-if="scope.row.type == 1">
                        <i
                            class="el-icon-check"
                            v-if="scope.row.keepAlive"
                        ></i>
                        <i
                            class="el-icon-close"
                            v-else
                        ></i>
                    </template>
                </template>

                <!-- 行新增 -->
                <template #slot-add="{scope}">
                    <el-button
                        type="text"
                        size="mini"
                        @click="upsertAppend(scope.row)"
                        v-if="scope.row.type != 2"
                    >新增</el-button>
                </template>
            </cl-table>

            <!-- 编辑 -->
            <cl-upsert
                ref="upsert"
                :props="{
					width: '800px'
				}"
                :items="[
					{
						prop: 'type',
						value: 0,
						label: '节点类型',
						span: 24,
						component: {
							name: 'el-radio-group',
							options: [
								{
									label: '目录',
									value: 0
								},
								{
									label: '菜单',
									value: 1
								},
								{
									label: '权限',
									value: 2
								}
							],
							on: {
								change: (index) => {
									this.changeType(index);
								}
							}
						}
					},
					{
						prop: 'name',
						label: '节点名称',
						span: 24,
						component: {
							name: 'el-input',
							attrs: {
								placeholder: '请输入节点名称'
							}
						},

						rules: {
							required: true,
							message: '名称不能为空'
						}
					},
					{
						prop: 'parentId',
						label: '上级节点',
						span: 24,
						component: {
							name: 'cl-menu-tree'
						}
					},
					{
						prop: 'router',
						label: '节点路由',
						span: 24,
						hidden: true,
						component: {
							name: 'el-input',
							attrs: {
								placeholder: '请输入节点路由'
							}
						}
					},
					{
						prop: 'keepAlive',
						value: true,
						label: '路由缓存',
						span: 24,
						component: {
							name: 'el-radio-group',
							options: [
								{
									label: '开启',
									value: true
								},
								{
									label: '关闭',
									value: false
								}
							]
						}
					},
					{
						prop: 'isShow',
						label: '是否显示',
						span: 24,
						value: true,
						hidden: false,
						component: {
							name: 'el-switch'
						}
					},
					{
						prop: 'viewPath',
						label: '文件路径',
						span: 24,
						hidden: true,
						component: {
							name: 'cl-menu-file-path'
						}
					},
					{
						prop: 'icon',
						label: '节点图标',
						span: 24,
						component: {
							name: 'cl-menu-icons'
						}
					},

					{
						prop: 'orderNum',
						label: '排序号',
						span: 24,
						component: {
							name: 'el-input-number',
							props: {
								placeholder: '请填写排序号',
								min: 0,
								max: 99,
								'controls-position': 'right'
							}
						}
					},
					{
						prop: 'perms',
						label: '权限',
						span: 24,
						hidden: true,
						component: {
							name: 'cl-menu-perms'
						}
					}
				]"
                @open="onUpsertOpen"
            ></cl-upsert>
        </cl-crud>

        <!-- 右键菜单 -->
        <cl-context-menu ref="context-menu"></cl-context-menu>
    </cl-layout>
</template>

<script>
import { deepTree } from "@/cool/utils";

export default {
	methods: {
		onCrudLoad({ ctx, app }) {
			ctx.service(this.$service.system.menu)
				.set("dict", {
					api: {
						page: "list"
					}
				})
				.done();

			app.refresh();
		},

		onRefresh(params, { next, render }) {
			this.$service.system.menu.list().then((list) => {
				list.map((e) => {
					e.permList = e.perms ? e.perms.split(",") : [];
					e.id = e._id;
				});

				render(deepTree(list));
			});
		},

		onRowClick(row, column) {
			if (column.property && row.children) {
				this.$refs["table"].toggleRowExpansion(row);
			}
		},

		onRowContextMenu(row, column, event) {
			const { rowEdit, rowDelete } = this.$refs["crud"];

			let list = [
				{
					label: "编辑",
					callback: (e, close) => {
						rowEdit(row);
						close();
					}
				},
				{
					label: "删除",
					callback: (e, close) => {
						rowDelete(row);
						close();
					}
				}
			];

			if (row.type != 2) {
				list.unshift({
					label: "新增",
					callback: (e, close) => {
						this.upsertAppend(row);
						close();
					}
				});
			}

			if (row.type == 1) {
				list.push({
					label: "权限",
					callback: (e, close) => {
						this.setPermission(row);
						close();
					}
				});
			}

			this.$refs["context-menu"].open(event, {
				list
			});

			event.preventDefault();
		},

		onUpsertOpen(isEdit, data) {
			this.changeType(data ? data.type : 0);
		},

		upsertAppend({ type, id }) {
			this.$refs["crud"].rowAppend({
				parentId: id,
				type: type + 1
			});
		},

		changeType(index) {
			const { toggleItem } = this.$refs["upsert"];
			toggleItem("router", index != 1);
			toggleItem("viewPath", index != 1);
			toggleItem("keepAlive", index != 1);
			toggleItem("icon", index == 2);
			toggleItem("perms", index != 2);
			toggleItem("isShow", index == 2);
		},

		setPermission({ id }) {
			this.$refs["crud"].rowAppend({
				parentId: id,
				type: 2
			});
		},

		toUrl(url) {
			this.$router.push(url);
		}
	}
};
</script>
