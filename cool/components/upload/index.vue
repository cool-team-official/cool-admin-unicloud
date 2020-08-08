<template>
    <div class="cl-upload__wrap">
        <!-- 文件空间 -->
        <cl-upload-space
            ref="space"
            :limit="limit"
            @confirm="onSpaceConfirm"
            v-if="isSpace"
        >
            <slot></slot>
        </cl-upload-space>

        <!-- 默认上传 -->
        <div
            v-else
            class="cl-upload"
            :class="{
			'is-multiple': multiple
		}"
        >
            <div
                v-for="(item, index) in list"
                class="cl-upload__item"
                :key="index"
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
                    class="el-icon-picture"
                    v-else
                ></i>

                <i
                    class="el-icon-close"
                    v-if="item.url"
                    @click.stop="removeFile(index)"
                ></i>
            </div>

            <template v-if="isAppend">
                <div
                    class="cl-upload__item"
                    :style="style"
                    @click="chooseImage()"
                >
                    <i class="el-icon-picture"></i>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import _ from "lodash";
import { uploadFile } from "../../utils/cloud";

export default {
	props: {
		value: [Array, String],
		size: {
			type: [Number, Array],
			default: 120
		},
		// 是否支持多选文件
		multiple: Boolean,
		// 最大允许上传个数
		limit: {
			type: Number,
			default: 9
		},
		// 上传时的钩子
		onUpload: Function,
		// 删除文件时的钩子
		onRemove: Function,
		// 是否显示文件空间
		isSpace: Boolean
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
		},

		isAppend() {
			return this.multiple ? this.list.length < this.limit : this.list.length == 0;
		}
	},

	watch: {
		value: {
			immediate: true,
			handler: "parseValue"
		}
	},

	methods: {
		parseValue(value) {
			if (this.multiple) {
				let list = [];

				if (value instanceof Array) {
					list = value;
				} else {
					list = (value || "").split(",");
				}

				this.list = list.filter(Boolean).map((url) => {
					return {
						url,
						loading: false
					};
				});
			} else {
				this.list = [
					{
						url: value,
						loading: false
					}
				];
			}
		},

		// 回调
		emit() {
			const value = this.list
				.filter((e) => e.url)
				.map((e) => e.url)
				.join(",");

			this.$emit("input", value);
			this.$emit("change", value);
		},

		// 上传成功
		onUploadSuccess(url, file, item) {
			if (this.multiple) {
				if (item) {
					item.url = url;
				} else {
					this.list.push({
						url
					});
				}
			} else {
				this.list = [{ url }];
			}

			if (item) {
				item.loading = false;
			}

			this.$emit("success", url);
			this.emit();
		},

		// 上传错误
		onUploadError(err, file) {
			console.error("upload error", err);
			this.$message.error(err);
			this.loading = false;
			this.$emit("error", err);
		},

		// 移除文件
		removeFile(i) {
			const next = (index) => {
				this.list.splice(index, 1);
				this.emit();
			};

			if (this.onRemove) {
				this.onRemove(i, { next });
			} else {
				next(i);
			}
		},

		// 选择图片
		chooseImage(item) {
			const count = this.multiple && !item ? 2 : 1;

			uni.chooseImage({
				count,
				success: (res) => {
					let data = null;

					if (item) {
						item.loading = true;
						data = item;
					}

					res.tempFiles
						.filter((e, i) => {
							return this.multiple ? i < this.limit - this.list.length : i < 1;
						})
						.forEach((e, i) => {
							const next = (name) => {
								return new Promise((resolve, reject) => {
									uploadFile({
										filePath: res.tempFilePaths[i],
										cloudPath: name || e.name
									})
										.then((url) => {
											this.onUploadSuccess(url, e, data);
											resolve(url);
										})
										.catch((err) => {
											reject(err);
										});
								});
							};

							const done = () => {
								if (item) {
									item.loading = false;
								}
							};

							if (this.onUpload) {
								this.onUpload(e, { next, done });
							} else {
								next();
							}
						});
				}
			});
		},

		// 打开文件空间
		openSpace() {
			this.$refs["space"].open();
		},

		// 确认图片
		onSpaceConfirm(urls) {
			this.$emit("input", urls);
			this.$emit("change", urls);
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

	&__item {
		display: flex;
		justify-content: center;
		align-items: center;
		cursor: pointer;
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		position: relative;
		margin-right: 10px;
		margin-bottom: 10px;

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
