<template>
    <div class="cl-upload-space__wrap">
        <slot>
            <el-button
                size="mini"
                @click="open"
            >点击上传</el-button>
        </slot>

        <!-- 弹框 -->
        <cl-dialog
            :visible.sync="visible"
            v-bind="props"
        >
            <div class="cl-upload-space">
                <!-- 类目 -->
                <div class="cl-upload-space__category">
                    <div class="cl-upload-space__category-search">
                        <el-button
                            type="primary"
                            size="mini"
                            @click="editCategory()"
                        >添加分类</el-button>
                        <el-input
                            v-model="category.keyword"
                            placeholder="输入关键字过滤"
                            size="mini"
                        ></el-input>
                    </div>

                    <div class="cl-upload-space__category-list">
                        <category-list
                            :list="categoryList"
                            :current="category.current.id"
                        ></category-list>
                    </div>
                </div>

                <!-- 内容 -->
                <div class="cl-upload-space__content">
                    <!-- 操作栏 -->
                    <div class="cl-upload-space__opbar">
                        <el-button
                            type="success"
                            size="mini"
                            :disabled="selection.length === 0"
                            @click="confirmFile()"
                        >使用选中文件</el-button>

                        <el-button
                            type="danger"
                            size="mini"
                            :disabled="selection.length === 0"
                            @click="deleteFile()"
                        >删除选中文件</el-button>

                        <el-button
                            type="primary"
                            size="mini"
                            @click="chooseImage"
                        >上传文件</el-button>
                    </div>

                    <!-- 文件列表 -->
                    <div
                        class="cl-upload-space__file"
                        v-loading="file.loading"
                        element-loading-text="拼命加载中"
                    >
                        <el-row v-if="file.list.length > 0">
                            <el-col
                                :span="6"
                                v-for="(item, index) in file.list"
                                :key="index"
                            >
                                <div
                                    class="cl-upload-space__file-item"
                                    @click.stop.prevent="selectFile(item)"
                                    @contextmenu.stop.prevent="openFileContextMenu($event, item)"
                                >
                                    <!-- 图片 -->
                                    <template v-if="item.type == 0">
                                        <el-image
                                            class="cl-upload-space__file-image"
                                            fit="cover"
                                            :src="item.url"
                                            lazy
                                        ></el-image>
                                    </template>

                                    <!-- 视频 -->
                                    <template v-else-if="item.type == 1">
                                        <video
                                            class="cl-upload-space__file-video"
                                            controls
                                            :src="item.url"
                                        ></video>
                                    </template>

                                    <!-- 尺寸 -->
                                    <div class="cl-upload-space__file-size"></div>

                                    <!-- 遮罩层 -->
                                    <div
                                        class="cl-upload-space__file-mask"
                                        v-show="item.selected"
                                    >
                                        <i class="el-icon-success"></i>
                                    </div>
                                </div>
                            </el-col>
                        </el-row>

                        <div
                            class="cl-upload-space__file-empty"
                            v-else
                        >
                            <div
                                class="cl-upload-space__file-drag"
                                @click="chooseImage"
                            >
                                <i class="el-icon-upload"></i>
                                <p>点击上传</p>
                            </div>
                        </div>
                    </div>

                    <!-- 分页 -->
                    <el-pagination
                        background
                        :page-size="file.pagination.size"
                        :current-page="file.pagination.page"
                        :total="file.pagination.total"
                        @current-change="onCurrentChange"
                    ></el-pagination>
                </div>
            </div>
        </cl-dialog>

        <!-- 右键菜单 -->
        <cl-context-menu ref="context-menu"></cl-context-menu>

        <!-- 添加分类 -->
        <cl-form ref="form-category"></cl-form>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import _ from "lodash";

export default {
	componentName: "UploadSpace",

	props: {
		// 是否多选
		multiple: Boolean,
		// 多选限制
		limit: {
			type: Number,
			default: 9
		},
		// 选择类型 image,video
		accept: {
			type: String,
			default: "image/*, video/*"
		}
	},

	components: {
		categoryList: {
			props: {
				list: Array,
				current: String
			},

			computed: {
				parent() {
					let parent = this;

					while (parent.$options.componentName != "UploadSpace") {
						parent = parent.$parent;
					}

					return parent;
				}
			},

			methods: {
				onSelect(item) {
					this.parent.selectCategory(item);
				},

				onContextMenu(e, item) {
					this.parent.openCategoryContextMenu(e, item);
					e.stopPropagation();
					e.preventDefault();
				}
			},

			render() {
				return (
					<ul>
						{this.list.map((item) => {
							return (
								<li
									class={{
										"is-active": item.id == this.current
									}}
									on-click={() => {
										this.onSelect(item);
									}}
									on-contextmenu={(e) => {
										this.onContextMenu(e, item);
									}}>
									{item.name}
								</li>
							);
						})}
					</ul>
				);
			}
		}
	},

	data() {
		return {
			visible: false,
			props: {
				title: "文件空间",
				props: {
					"close-on-click-modal": false,
					width: "1000px"
				}
			},
			upload: {
				props: {
					action: "",
					accept: this.accept,
					multiple: true,
					headers: {
						Authorization: this.token
					},
					"show-file-list": false,
					"http-request": this.httpRequest
				}
			},
			category: {
				list: [],
				current: {},
				keyword: ""
			},
			file: {
				list: [],
				pagination: {
					page: 1,
					size: 12,
					total: 0
				},
				loading: false
			}
		};
	},

	computed: {
		...mapGetters(["token"]),

		categoryList() {
			return this.category.list.filter((e) => e.name.includes(this.category.keyword));
		},

		selection() {
			return this.file.list.filter((e) => e.selected);
		},

		type() {
			const i = ["image/*", "video/*"].indexOf(this.accept);
			return i < 0 ? null : i;
		}
	},

	created() {
		this.refreshCategory().then(() => {
			this.category.current = this.category.list[0];
			this.refreshFile();
		});
	},

	methods: {
		open() {
			this.visible = true;
		},

		close() {
			this.visible = false;
		},

		// 选择图片
		chooseImage() {
			uni.chooseImage({
				success: (res) => {
					res.tempFiles.forEach((e, i) => {
						uniCloud.uploadFile({
							filePath: res.tempFilePaths[i],
							cloudPath: e.name,
							success: (res) => {
								this.$service.space.info
									.add({
										url: res.fileID,
										type: 0,
										classifyId: this.category.current.id
									})
									.then(() => {
										this.refreshFile();
									});
							},
							fail: (err) => {
								this.$message.error(err);
							}
						});
					});
				}
			});
		},

		// 刷新资源文件
		refreshFile(params) {
			this.file.loading = true;

			this.$service.space.info
				.page({
					...this.file.pagination,
					...params,
					classifyId: this.category.current.id,
					type: this.type
				})
				.then((res) => {
					this.file.list = res.list;
					this.file.pagination = res.pagination;
				})
				.done(() => {
					this.file.loading = false;
				});
		},

		// 刷新分类
		refreshCategory() {
			return this.$service.space.type.list().then((res) => {
				res.unshift({
					name: "全部文件",
					id: null
				});
				this.category.list = res;
			});
		},

		// 编辑分类
		editCategory(item = {}) {
			this.$refs["form-category"].open({
				props: {
					title: "添加分类",
					width: "400px"
				},

				items: [
					{
						label: "分类名称",
						prop: "name",
						value: item.name,
						component: {
							name: "el-input",
							attrs: {
								placeholder: "请填写分类名称"
							}
						},
						rules: {
							required: true,
							message: "分类名称不能为空"
						}
					}
				],

				on: {
					submit: (data, { done, close }) => {
						let next = null;

						if (!item.id) {
							next = this.$service.space.type.add(data);
						} else {
							next = this.$service.space.type.update({
								...data,
								id: item.id
							});
						}

						next.then(() => {
							this.refreshCategory();
							close();
						}).catch((err) => {
							this.$message.error(err);
							done();
						});
					}
				}
			});
		},

		// 选择类目
		selectCategory(item) {
			this.category.current = item;
			this.file.pagination = {
				page: 1,
				size: 12,
				total: 0
			};
			this.refreshFile({
				classifyId: item.id
			});
		},

		// 打开类目列表右键菜单
		openCategoryContextMenu(e, { id, name }) {
			if (!id) {
				return false;
			}

			this.$refs["context-menu"].open(e, {
				list: [
					{
						label: "编辑",
						"suffix-icon": "el-icon-edit",
						callback: (item, done) => {
							done();
							this.editCategory({ id, name });
						}
					},
					{
						label: "删除",
						"suffix-icon": "el-icon-delete",
						callback: (item, done) => {
							done();

							this.$confirm(`此操作将删除【${name}】下的文件, 是否继续?`, "提示", {
								type: "warning"
							})
								.then(() => {
									this.$service.space.type
										.delete({
											ids: id
										})
										.then(() => {
											this.$message.success("删除成功");
											this.refreshCategory();
										})
										.catch((err) => {
											console.error(err);
											this.$message.error(err);
										});
								})
								.catch(() => {});
						}
					}
				]
			});
		},

		// 打开文件列表右键菜单
		openFileContextMenu(e, data) {
			this.$refs["context-menu"].open(e, {
				list: [
					{
						label: data.selected ? "取消选中" : "选中",
						"suffix-icon": data.selected ? "el-icon-close" : "el-icon-check",
						callback: (item, done) => {
							this.selectFile(data);
							done();
						}
					},
					{
						label: "删除",
						"suffix-icon": "el-icon-delete",
						callback: (item, done) => {
							this.deleteFile(data);
							done();
						}
					}
				]
			});
		},

		// 确认选中文件
		confirmFile() {
			const urls = this.selection.map((e) => e.url);
			this.$emit("input", this.multiple ? urls : urls[0]);
			this.close();
		},

		// 选择文件
		selectFile(item) {
			if (this.multiple) {
				this.$set(item, "selected", !item.selected);
			} else {
				if (!item.selected) {
					this.file.list.map((e) => {
						this.$set(e, "selected", false);
					});
				}
				item.selected = !item.selected;
			}
		},

		// 删除选中文件
		deleteFile(...selection) {
			if (_.isEmpty(selection)) {
				selection = this.selection;
			}

			this.$confirm("此操作将删除文件, 是否继续?", "提示", {
				type: "warning"
			})
				.then(() => {
					const ids = selection.map((e) => e.id);

					this.$service.space.info
						.delete({
							ids: ids.join(",")
						})
						.then(() => {
							this.$message.success("删除成功");
							this.refreshFile();
						})
						.catch((err) => {
							this.$message.error(err);
						});
				})
				.catch(() => {});
		},

		// 选择页
		onCurrentChange(i) {
			this.refreshFile({
				page: i
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.cl-upload-space {
	display: flex;
	height: 520px;

	&__category {
		width: 250px;
		margin-right: 20px;

		&-search {
			display: flex;
			align-items: center;
			margin-bottom: 5px;

			.el-button {
				margin-right: 10px;
			}
		}

		&-list {
			overflow: hidden auto;

			/deep/ul {
				li {
					list-style: none;
					font-size: 14px;
					height: 40px;
					line-height: 40px;
					border-bottom: 1px dashed #eee;
					padding: 0 5px;
					cursor: pointer;

					&.is-active {
						color: #409eff;
					}
				}
			}
		}
	}

	&__content {
		flex: 1;
	}

	&__opbar {
		display: flex;
		align-items: center;
		margin-bottom: 10px;
	}

	&__file {
		height: calc(100% - 70px);
		overflow: hidden auto;

		&-item {
			height: 160px;
			width: 160px;
			margin-bottom: 10px;
			cursor: pointer;
			position: relative;
			border-radius: 3px;
			box-sizing: border-box;
			background-color: #f7f7f7;
		}

		&-video {
			max-height: 100%;
			width: 100%;
		}

		&-image {
			height: 100%;
			width: 100%;
		}

		&-size {
			position: absolute;
			bottom: 0;
			left: 0;
			background-color: rgba(0, 0, 0, 0.5);
		}

		&-mask {
			position: absolute;
			left: 0;
			top: 0;
			height: 100%;
			width: 100%;
			background-color: rgba(0, 0, 0, 0.5);
			display: flex;
			justify-content: center;
			align-items: center;

			i {
				font-size: 30px;
				color: #67c23a;
			}
		}

		&-empty {
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 100px;
		}

		&-drag {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			border: 1px dashed #ccc;
			border-radius: 6px;
			cursor: pointer;
			height: 180px;
			width: 360px;

			i {
				font-size: 67px;
				color: #c0c4cc;
			}

			&:hover {
				border-color: #409eff;
			}
		}
	}
}
</style>
