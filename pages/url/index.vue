<template>
    <cl-layout>
        <div class="page-url">
            <iframe
                :src="url"
                frameborder="0"
            ></iframe>
        </div>
    </cl-layout>
</template>

<script>
export default {
	data() {
		return {
			url: ""
		};
	},

	watch: {
		$route: {
			immediate: true,
			handler({ query }) {
				this.url = query.url;
			}
		}
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
