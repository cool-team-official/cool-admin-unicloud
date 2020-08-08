<template>
    <div class="scope">
        <div class="h">
            <span>cl-upload</span>
            图片上传
        </div>
        <div class="c">
            <el-row>
                <cl-upload
                    v-model="urls"
                    multiple
                    :limit="3"
                    :on-upload="onUpload"
                    :on-remove="onRemove"
                    @success="onSuccess"
                    @error="onError"
                >
                </cl-upload>

                <cl-upload
                    v-model="urls2"
                    is-space
                ></cl-upload>

                <ul
                    class="urls"
                    v-if="urls2"
                >
                    <li
                        v-for="(item, index) in list"
                        :key="index"
                    >
                        <img
                            :src="item"
                            alt=""
                        >
                    </li>
                </ul>
            </el-row>
        </div>
        <div class="f">
            <span class="date">2020/08/08</span>
        </div>
    </div>
</template>

<script>
export default {
	data() {
		return {
			urls: "",
			urls2: ""
		};
	},

	computed: {
		list() {
			return this.urls2.split(",");
		}
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

	.urls {
		display: flex;
		flex-wrap: wrap;
		margin-top: 10px;

		li {
			img {
				display: block;
				height: 100px;
				width: 100px;
				margin: 0 10px 10px 0;
			}
		}
	}
}
</style>
