<template>
	<div class="scope">
		<div class="h">
			<span>cl-upload</span>
			图片上传
		</div>
		<div class="c">
			<el-row>
				<span class="label">默认</span>
				<cl-upload
					v-model="avatar"
					multiple
					:limit="3"
					:on-upload="onUpload"
					:on-remove="onRemove"
					@success="onSuccess"
					@error="onError"
				>
				</cl-upload>
			</el-row>
		</div>
		<div class="f">
			<span class="date">2019/09/25</span>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			avatar: "",
			avatar2: ""
		};
	},

	methods: {
		onSuccess(url) {
			this.$message.success("上传成功");
			console.log("上传成功", url);
			console.log(url);
		},

		onError(err) {
			console.error("上传失败", err);
		},

		onUpload(file, { next, done }) {
			console.log("上传钩子", file);
			next();
		},

		onRemove(index, { next }) {
			console.log("删除钩子", index);
			next(index);
		}
	}
};
</script>

<style lang="scss" scoped>
.scope {
	.label {
		display: inline-block;
		font-size: 12px;
		padding-bottom: 10px;
	}
}
</style>
