<template>
	<cl-layout>
		<div class="page-url" v-loading="loading" element-loading-text="拼命加载中">
			<iframe :src="url" frameborder="0"></iframe>
		</div>
	</cl-layout>
</template>

<script>
export default {
	data() {
		return {
			loading: false,
			url: ""
		};
	},

	watch: {
		$route: {
			immediate: true,
			handler({ meta }) {
				this.url = meta.iframeUrl;
			}
		}
	},

	mounted() {
		const iframe = this.$el.querySelector("iframe");
		this.loading = true;

		iframe.onload = () => {
			this.loading = false;
		};
	}
};
</script>

<style lang="scss" scoped>
.page-url {
	iframe {
		height: 100%;
		width: 100%;
	}
}
</style>
