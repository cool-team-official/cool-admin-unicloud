<template>
    <cl-layout>
        <cl-crud
            ref="crud"
            @load="onCrudLoad"
        >
            <el-row type="flex">
                <cl-refresh-btn></cl-refresh-btn>

                <el-button
                    v-permission="$service.system.log.permission.clear"
                    size="mini"
                    type="danger"
                    @click="clear"
                >
                    清空
                </el-button>

                <cl-flex1 />
                <cl-search-key placeholder="请输入请求地址, 参数，ip地址"></cl-search-key>
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
							type: 'index',
							label: '#',
							align: 'center',
							width: 60
						},
						{
							prop: 'name',
							label: '用户名',
							align: 'center',
							minWidth: '150'
						},
						{
							prop: 'action',
							label: '请求地址',
							align: 'center',
							minWidth: '200',
							'show-overflow-tooltip': true
						},
						{
							prop: 'params',
							label: '参数',
							align: 'center',
							minWidth: '200',
							'show-overflow-tooltip': true
						},
						{
							prop: 'ip',
							label: 'ip',
							minWidth: '180',
							align: 'center'
						},
						{
							prop: 'createTime',
							label: '创建时间',
							minWidth: '150',
							align: 'center',
							sortable: true
						}
					]"
                ></cl-table>
            </el-row>

            <el-row
                type="flex"
                justify="end"
            >
                <cl-pagination></cl-pagination>
            </el-row>
        </cl-crud>
    </cl-layout>
</template>

<script>
import { mapGetters } from "vuex";

export default {
	methods: {
		onCrudLoad({ ctx, app }) {
			ctx.service(this.$service.system.log).done();
			app.refresh();
		},

		clear() {
			this.$confirm("是否要清空日志", "提示", {
				type: "warning"
			})
				.then(() => {
					this.$service.system.log
						.clear()
						.then(() => {
							this.$message.success("清空成功");
							this.$refs["crud"].refresh({ page: 1 });
						})
						.catch((err) => {
							this.$message.error(err);
						});
				})
				.catch(() => {});
		}
	}
};
</script>
