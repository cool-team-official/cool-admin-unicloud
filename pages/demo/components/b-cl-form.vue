<template>
	<div class="scope">
		<div class="h">
			<span>cl-form</span>
			自定义表单
		</div>

		<div class="c">
			<el-button size="small" @click="openForm">填写邀请码</el-button>
		</div>

		<div class="f">
			<span class="date">2019/10/11</span>
		</div>

		<cl-form ref="form"></cl-form>
	</div>
</template>

<script>
import "./index.scss";

export default {
	methods: {
		openForm() {
			this.$refs["form"].open({
				props: {
					title: "填写邀请码",
					width: "450px"
				},

				items: [
					{
						props: {
							"label-width": "0px"
						},

						component: (
							<div>
								<i></i>
								<span>如无邀请码，请联系客服：icssoa</span>
							</div>
						)
					},
					{
						props: {
							"label-width": "0px"
						},
						prop: "code",
						component: {
							name: "demo__invite-code",

							data() {
								return {
									list: ["", "", "", ""]
								};
							},

							methods: {
								onInput(i) {
									if (this.list[i] && i <= 4 - i) {
										this.$refs[`input-${i + 1}`].focus();
									}

									this.$emit("input", this.list.join(""));
								},

								nativeOnInput(e, i) {
									if (e.code == "Backspace") {
										if (!this.list[i]) {
											if (i - 1 >= 0) {
												this.$refs[`input-${i - 1}`].focus();
											}
										}
									}

									this.$emit("input", this.list.join(""));
								}
							},

							mounted() {
								this.$refs[`input-0`].focus();
							},

							render() {
								return (
									<div class="invite-code">
										{this.list.map((e, i) => {
											return (
												<el-input
													maxlength="1"
													ref={`input-${i}`}
													{...{
														on: {
															input: () => {
																this.onInput(i);
															},
															"keydown:enter"() {
																console.log(1);
															}
														},
														nativeOn: {
															keydown: (e) => {
																this.nativeOnInput(e, i);
															}
														}
													}}
													v-model={this.list[i]}></el-input>
											);
										})}
									</div>
								);
							}
						}
					}
				],

				on: {
					submit: (data, { done }) => {
						this.$message.success(data.code || "邀请码为空");
						done();
					}
				}
			});
		}
	}
};
</script>
