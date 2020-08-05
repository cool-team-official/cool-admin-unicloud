<template>
    <div
        class="cl-upload"
        :class="{
			'is-multiple': props.multiple
		}"
    >
        <el-input
            class="cl-upload__hidden"
            type="hidden"
            v-model="value"
        ></el-input>

        <el-upload
            v-for="(item, index) in list"
            :key="index"
            :show-file-list="false"
            action=""
            v-bind="props"
        >
            <slot>
                <div
                    class="cl-upload__wrap"
                    :style="style"
                    v-loading="item.loading"
                    @click="chooseImage(item)"
                >
                    <img
                        class="cl-upload__image"
                        :src="item.url"
                        alt=""
                        v-if="item.url"
                    />
                    <i
                        class="el-icon-picture avatar-uploader-icon"
                        v-else
                    ></i>

                    <i
                        class="el-icon-close"
                        v-if="item.url"
                        @click.stop="removeFile(index)"
                    ></i>
                </div>
            </slot>

            <div slot="trigger"></div>
        </el-upload>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import _ from "lodash";

export default {
	props: {
		size: {
			type: [Number, Array],
			default: 120
		},
		props: {
			type: Object,
			default: () => {
				return {};
			}
		},
		value: [Array, String],
		// 是否同时保存到图片空间
		saveToSpace: Boolean
	},

	data() {
		return {
			list: []
		};
	},

	computed: {
		...mapGetters(["token"]),

		style() {
			const [height, width] = (_.isArray(this.size) ? this.size : [this.size, this.size]).map(
				(e) => {
					return _.isNumber(e) ? `${e}px` : e;
				}
			);

			return {
				height,
				width
			};
		}
	},

	watch: {
		value: {
			immediate: true,
			handler() {
				this.render();
			}
		}
	},

	methods: {
		render() {
			const { multiple } = this.props;

			let val = this.value;

			if (multiple) {
				let list = [];

				if (val instanceof Array) {
					list = val;
				} else {
					list = (val || "").split(",");
				}

				this.list = list.filter(Boolean).map((e) => {
					return {
						url: e,
						loading: false
					};
				});

				this.ajSize();
			} else {
				this.list = [
					{
						url: val || "",
						loading: false
					}
				];
			}
		},

		callback() {
			this.ajSize();

			const value = this.list
				.filter((e) => e.url)
				.map((e) => e.url)
				.join(",");

			this.$emit("input", value);
			this.$emit("change", value);
		},

		ajSize() {
			const { "multiple-limit": multipleLimit = 1 } = this.props;

			if (this.list.length < multipleLimit) {
				this.list.unshift({});
			}
		},

		// 上传成功
		onUploadSuccess(url, file, item) {
			const { multiple } = this.props;

			item.loading = false;

			if (multiple) {
				if (item.url) {
					item.url = url;
				} else {
					this.list.push({
						url
					});
				}
			} else {
				this.list = [
					{
						url
					}
				];
			}

			this.callback();

			if (this.props && this.props["on-success"]) {
				this.props["on-success"](url, file);
			}
		},

		// 上传错误
		onUploadError(err, file) {
			console.error("upload error", err);
			this.$message.error(err.toString());
			this.loading = false;

			if (this.props && this.props["on-error"]) {
				this.props["on-error"](err, file);
			}
		},

		// 移除文件
		removeFile(i) {
			this.list.splice(i, 1);
			this.callback();
		},

		// 选择图片
		chooseImage(item) {
			uni.chooseImage({
				success: (res) => {
					res.tempFiles.forEach((e, i) => {
						uniCloud.uploadFile({
							filePath: res.tempFilePaths[i],
							cloudPath: e.name,
							success: (res) => {
								this.onUploadSuccess(res.fileID, e, item);
							},
							fail: (err) => {
								this.onUploadError(err, e);
							}
						});
					});
				}
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.cl-upload {
	display: flex;
	flex-wrap: wrap;

	&__hidden {
		height: 0;
		width: 0;
	}

	&__wrap {
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		position: relative;

		.el-icon-picture {
			font-size: 24px;
			color: #8c939d;
		}

		.el-icon-close {
			position: absolute;
			right: 5px;
			top: 5px;
			background-color: #f56c6c;
			color: #fff;
			border-radius: 100%;
			padding: 2px;

			&:hover {
				background-color: red;
			}
		}

		&:hover {
			border: 1px dashed #409eff;
		}
	}

	&__image {
		height: 100%;
		width: 100%;
		border-radius: 6px;
	}

	&.is-multiple {
		.cl-upload__wrap {
			margin-right: 10px;
		}
	}
}
</style>
