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
                <cl-refresh-btn></cl-refresh-btn>
                <cl-add-btn></cl-add-btn>
                <cl-multi-delete-btn></cl-multi-delete-btn>
                <cl-query
                    :value="1"
                    :list="[
						{
							label: '上行',
							value: 0
						},
						{
							label: '下行',
							value: 1
						}
					]"
                ></cl-query>
                <el-button
                    size="mini"
                    @click="openForm"
                >自定义表单</el-button>
                <cl-flex1></cl-flex1>
                <cl-search-key
                    field="name"
                    :field-list="[
						{
							label: '姓名',
							value: 'name'
						},
						{
							label: '身份证',
							value: 'id'
						}
					]"
                ></cl-search-key>
                <cl-adv-btn></cl-adv-btn>
            </el-row>

            <el-row>
                <cl-table :columns="[
						{
							type: 'selection'
						},
						{
							label: '姓名',
							prop: 'name'
						},
						{
							label: '存款',
							prop: 'price',
							sortable: true
						},
						{
							label: '操作',
							type: 'op'
						}
					]">
                </cl-table>
            </el-row>

            <el-row type="flex">
                <cl-flex1></cl-flex1>
                <cl-pagination></cl-pagination>
            </el-row>

            <!-- 高级搜索 -->
            <cl-adv-search
                ref="adv-search"
                v-bind="advSearch.props"
                v-on="advSearch.on"
            >
            </cl-adv-search>

            <!-- 编辑、新增 -->
            <cl-upsert
                ref="upsert"
                v-bind="upsert.props"
                v-on="upsert.on"
            ></cl-upsert>

            <!-- 自定义表单 -->
            <cl-form ref="form"></cl-form>
        </cl-crud>
    </cl-layout>
</template>

<script>
const userList = [
	{
		id: 1,
		name: "刘一",
		process: 42.2,
		endTime: "2019年09月02日",
		price: 75.99,
		salesRate: 52.2,
		salesStatus: 1,
		images: ["https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/1.jpg"],
		children: [
			{
				id: 6,
				name: "刘一儿子",
				process: 35.2,
				endTime: "2019年09月05日",
				price: 242.1,
				salesRate: 72.1,
				salesStatus: 1,
				images: []
			}
		]
	},
	{
		id: 2,
		name: "陈二",
		process: 35.2,
		endTime: "2019年09月05日",
		price: 242.1,
		salesRate: 72.1,
		salesStatus: 1,
		images: ["https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/2.jpg"]
	},
	{
		id: 3,
		name: "张三",
		process: 10.2,
		endTime: "2019年09月12日",
		price: 74.11,
		salesRate: 23.9,
		salesStatus: 0,
		images: ["https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/3.jpg"]
	},
	{
		id: 4,
		name: "李四",
		process: 75.5,
		endTime: "2019年09月13日",
		price: 276.64,
		salesRate: 47.2,
		salesStatus: 0,
		images: ["https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/4.jpg"]
	},
	{
		id: 5,
		name: "王五",
		process: 25.4,
		endTime: "2019年09月18日",
		price: 160.23,
		salesRate: 28.3,
		salesStatus: 1,
		images: ["https://cool-comm.oss-cn-shenzhen.aliyuncs.com/show/imgs/chat/avatar/5.jpg"]
	}
];

export default {
	data() {
		return {
			upsert: {
				on: {
					open() {
						console.log("cl-upsert 打开");
					},

					close(action) {
						console.log("cl-upsert 关闭", action);
					}
				},
				props: {
					onOpen(data) {
						console.log("cl-upsert 打开钩子", data);
					},

					onClose(action, done) {
						console.log("cl-upsert 关闭钩子", action);
						done();
					},

					onInfo(data, { next, done, close }) {
						console.log("cl-upsert 详情钩子", data);
						next(data);
					},

					onSubmit(isEdit, data, { next, close, done }) {
						console.log("cl-upsert 提交钩子", `是否编辑 ${isEdit}`, data);
						next(data);
					},

					items: [
						{
							label: "姓名",
							prop: "name",
							component: {
								name: "el-input"
							}
						},
						{
							label: "金额",
							prop: "price",
							component: {
								name: "el-input-number",
								props: {
									min: 1,
									max: 1000000
								}
							},
							rules: {
								required: true,
								message: "金额不能为空"
							}
						},
						{
							label: "销售率",
							prop: "salesRate",
							component: {
								name: "el-input-number",
								props: {
									precision: 2,
									min: 0,
									max: 100
								}
							}
						},
						{
							label: "职业",
							prop: "of",
							value: 1,
							component: {
								name: "el-radio-group",
								options: [
									{
										label: "散仙",
										value: 1
									},
									{
										label: "游侠",
										value: 2
									},
									{
										label: "刀客",
										value: 3
									}
								],
								on: {
									change: (val) => {
										const {
											hiddenItem,
											toggleItem,
											showItem,
											setOptions
										} = this.$refs["upsert"];

										toggleItem("price");
									}
								}
							}
						}
					]
				}
			},
			advSearch: {
				on: {
					open(data) {
						console.log("adv-search 打开", data);
					},
					close() {
						console.log("adv-search 关闭");
					},
					reset() {
						console.log("adv-search 重置");
					},
					clear() {
						console.log("adv-search 清空");
					}
				},
				props: {
					onOpen(data, { next }) {
						console.log("adv-search 打开钩子", data);
						next();
					},
					onClose(done) {
						console.log("adv-search 关闭钩子");
						done();
					},
					onSearch(data, { next, close }) {
						console.log("adv-search 搜索钩子", data);
						next();
					},
					opList: ["search", "reset", "clear", "close"],
					items: [
						{
							label: "姓名",
							prop: "name",
							value: "",
							component: {
								name: "ref-test",
								ref: "name",
								render(h) {
									return h("p", "icssoa");
								}
							}
						},
						{
							label: "金额",
							prop: "price",
							component: {
								name: "el-input-number",
								props: {
									min: 1,
									max: 1000000
								},
								on: {
									change: () => {
										this.$refs["adv-search"].toggleItem("salesRate");
									}
								}
							}
						},
						{
							label: "销售率",
							prop: "salesRate",
							hidden: true,
							component: {
								name: "el-input-number",
								props: {
									precision: 2,
									min: 0,
									max: 100
								}
							}
						}
					]
				}
			}
		};
	},

	methods: {
		openForm() {
			this.$refs["form"].open({
				props: {
					title: "自定义表单"
				},
				items: [
					{
						label: "姓名",
						prop: "name",
						value: "神仙都没用",
						component: {
							name: "el-input"
						},
						rules: {
							required: true,
							message: "姓名不能为空"
						}
					}
				],
				on: {
					open(data, { close, submit, done }) {
						console.log("cl-form 打开钩子", data);
					},

					close(action, done) {
						console.log("cl-form 关闭钩子", action);
						done();
					},

					submit: (data, { close, done, next }) => {
						console.log("cl-form 提交钩子", data);

						setTimeout(() => {
							close();
							this.$message.success("提交成功");
						}, 1500);
					}
				}
			});
		},
		onCrudLoad({ ctx, app }) {
			ctx.service({
				page: (p) => {
					console.log("GET[page]", p);
					return Promise.resolve({
						list: userList,
						pagination: {
							page: p.page,
							size: p.size,
							total: 200
						}
					});
				},
				info: (d) => {
					console.log("GET[info]", d);
					return new Promise((resolve) => {
						resolve({
							name: "icssoa",
							price: 100
						});
					});
				},
				add: (d) => {
					console.log("POST[add]", d);
					return Promise.resolve();
				},
				delete: (d) => {
					console.log("POST[delete]", d);
					return Promise.resolve();
				},
				update: (d) => {
					console.log("POST[update]", d);
					return Promise.resolve();
				}
			}).done();

			app.refresh();
		}
	}
};
</script>
