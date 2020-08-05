<template>
    <div class="scope">
        <div class="h">
            <span>cl-upload</span>
            图片上传
        </div>
        <div class="c">
            <el-row>
                <el-col :span="12">
                    <span class="label">默认</span>
                    <cl-upload
                        v-model="avatar"
                        :props="{
							'on-success': onSuccess,
						}"
                    >
                    </cl-upload>
                </el-col>

                <el-col :span="12">
                    <span class="label">自定义</span>
                    <cl-upload-space
                        v-model="avatar"
                        accept="image/*"
                    ></cl-upload-space>
                </el-col>
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
		onSuccess() {
			this.$message.success("上传成功");
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
