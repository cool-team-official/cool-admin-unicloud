export default {
	methods: {
		open(e) {
			this.$refs["context-menu"].open(e, {
				list: [
					{
						label: "新增",
						"suffix-icon": "el-icon-plus",
						callback: () => {
							this.$message.info("点击了新增");
						}
					},
					{
						label: "编辑",
						"suffix-icon": "el-icon-edit",
						callback: (item, done) => {
							this.$message.info("点击了编辑");
							done();
						}
					},
					{
						label: "删除",
						"suffix-icon": "el-icon-delete"
					},
					{
						label: "二级",
						"suffix-icon": "el-icon-right",
						children: [
							{
								label: "文本超出隐藏，有一天晚上",
								ellipsis: true
							},
							{
								label: "禁用",
								disabled: true
							},
							{
								label: "更多",
								callback: (item, done) => {
									this.$message.warning("开发中");
									done();
								}
							}
						]
					}
				]
			});

			e.stopPropagation();
			e.preventDefault();
		}
	},

	render() {
		return (
			<div class="scope">
				<div class="h">
					<span>cl-context-menu</span>
					右键菜单
				</div>
				<div class="c">
					<p
						class="btn"
						style={{
							border: "1px solid #dcdfe6",
							"font-size": "13px",
							display: "inline-block",
							padding: "5px 10px",
							cursor: "pointer",
							"border-radius": "3px"
						}}
						on-contextmenu={this.open}>
						右键点击
					</p>
				</div>
				<div class="f">
					<span class="date">2019/10/23</span>
				</div>

				<cl-context-menu ref="context-menu"> </cl-context-menu>
			</div>
		);
	}
};
