<script>
export default {
	onLaunch: function () {
		console.log("App Launch");
	},
	onShow: function () {
		console.log("App Show");
		if (!uni.getStorageSync("token")) {
			if (this.$route.path != "/pages/login/index") {
				uni.navigateTo({
					url: "/pages/login/index"
				});
			}
		}
	},
	onHide: function () {
		console.log("App Hide");
	}
};
</script>

<style lang="scss">
@import "@/static/css/index.scss";
</style>
